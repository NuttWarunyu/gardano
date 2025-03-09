import openai
import base64
import io
from fastapi import APIRouter, UploadFile, File
from PIL import Image
from app.config import OPENAI_API_KEY
from app.database import get_plant_shop_data  # ✅ ดึงข้อมูลร้านค้า

router = APIRouter()

# ✅ ดึง API Key จาก Environment
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("❌ ERROR: OPENAI_API_KEY is not set! Please check your environment variables.")

# ✅ ตั้งค่า API Key ให้ OpenAI Client
openai.api_key = OPENAI_API_KEY

@router.post("/analyze/")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # ✅ แปลงภาพเป็น Base64
        base64_image = base64.b64encode(image_bytes).decode("utf-8")

        # ✅ ใช้ Vision API ตรวจจับพืช
        response = openai.ChatCompletion.create(
            model="gpt-4",  # ใช้ GPT-4 แทน "gpt-4o"
            messages=[
                {"role": "system", "content": "คุณเป็นผู้เชี่ยวชาญด้านพฤกษศาสตร์ ระบุชื่อพืชจากภาพ และให้ข้อมูลเกี่ยวกับการดูแล"},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "โปรดวิเคราะห์และระบุชื่อพืชในภาพนี้ พร้อมระดับการดูแล"},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                    ]
                }
            ]
        )

        # ✅ ดึงค่าจาก OpenAI
        plant_info = response['choices'][0]['message']['content'].strip().split("\n")

        plant_name = plant_info[0]  # สมมติ OpenAI ตอบชื่อพืชในบรรทัดแรก
        care_level = plant_info[1] if len(plant_info) > 1 else "ไม่ระบุ"  # ระดับการดูแล (ถ้ามี)

        # ✅ ค้นหาข้อมูลร้านค้า
        shop_info = get_plant_shop_data(plant_name)

        return {
            "plant_name": plant_name,
            "care": {"care_level": care_level},
            "price_range": "ไม่ระบุ",  # ✅ เปลี่ยนจาก mock data เป็นค่าที่จะเพิ่มในอนาคต
            "shops": shop_info
        }

    except Exception as e:
        return {"error": str(e)}