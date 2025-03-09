import openai
import base64
import io
from fastapi import APIRouter, UploadFile, File
from PIL import Image
from app.config import OPENAI_API_KEY
from app.database import get_plant_shop_data  # ดึงข้อมูลร้านค้าที่ทำ Affiliate

router = APIRouter()

# ดึง API Key จาก Environment
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("❌ ERROR: OPENAI_API_KEY is not set! Please check your environment variables.")

# ตั้งค่า API Key ให้ OpenAI Client
openai.api_key = OPENAI_API_KEY

@router.post("/analyze/")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # อ่านไฟล์และแปลงเป็น Base64
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        base64_image = base64.b64encode(image_bytes).decode("utf-8")

        # ใช้ OpenAI เพื่อวิเคราะห์พืชจากภาพ
        response = openai.Completion.create(
            model="gpt-4",
            prompt=f"โปรดวิเคราะห์และระบุชื่อพืชในภาพนี้ พร้อมระดับการดูแล: data:image/jpeg;base64,{base64_image}",
            max_tokens=100
        )

        # ดึงข้อมูลชื่อพืชและระดับการดูแลจาก OpenAI
        plant_info = response['choices'][0]['text'].strip().split("\n")
        plant_name = plant_info[0]  # เอาชื่อพืชจากบรรทัดแรก
        care_level = plant_info[1] if len(plant_info) > 1 else "ไม่ระบุ"  # ระดับการดูแล (ถ้ามี)

        # สร้างฟังก์ชันคำนวณราคาโดยประมาณ (สมมติว่ามีข้อมูล)
        # แทนที่ด้วยราคาจริงหรือช่วงราคาจากฐานข้อมูล
        price_range = "200 - 500 บาท"  # ตัวอย่างช่วงราคา

        # ค้นหาข้อมูลร้านค้าที่แนะนำ
        shop_info = get_plant_shop_data(plant_name)  # ค้นหาข้อมูลร้านค้าในฐานข้อมูล

        # คืนค่าข้อมูล
        return {
            "plant_name": plant_name,  # ชื่อพืช
            "care": {"care_level": care_level},  # ระดับการดูแล
            "price_range": price_range,  # ราคาโดยประมาณ
            "shops": shop_info  # ร้านค้าที่แนะนำ
        }

    except Exception as e:
        return {"error": str(e)}  # คืนค่าข้อความผิดพลาดถ้ามี