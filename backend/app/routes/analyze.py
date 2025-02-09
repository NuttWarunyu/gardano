import openai
import base64
import io
from fastapi import APIRouter, UploadFile, File
from PIL import Image
from app.config import OPENAI_API_KEY
from app.database import get_plant_shop_data  # ✅ ดึงข้อมูลร้านค้า

shop_info = get_plant_shop_data()

router = APIRouter()
client = openai.OpenAI(api_key=OPENAI_API_KEY)

@router.post("/analyze/")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # ✅ แปลงภาพเป็น Base64
        base64_image = base64.b64encode(image_bytes).decode("utf-8")

        # ✅ ใช้ Vision API ตรวจจับพืช
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "คุณเป็นผู้เชี่ยวชาญด้านพฤกษศาสตร์ ระบุชื่อพืชจากภาพ"},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "โปรดวิเคราะห์และระบุชื่อพืชในภาพนี้"},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                    ]
                }
            ]
        )

        plant_name = response.choices[0].message.content.strip()

        # ✅ ค้นหาข้อมูลจากฐานข้อมูล
        shop_info = get_plant_shop_data(plant_name)

        # ✅ แนะนำพืชที่คล้ายกัน (ข้อมูลจำลอง)
        similar_plants = [
            {"name": "เดหลี", "image": "https://source.unsplash.com/200x150/?spathiphyllum"},
            {"name": "สาวน้อยประแป้ง", "image": "https://source.unsplash.com/200x150/?aglaonema"},
            {"name": "เฟิร์นขนนก", "image": "https://source.unsplash.com/200x150/?asparagus"}
        ]

        # ✅ ประเมินระดับการดูแล
        care_info = {"care_level": "ง่าย" if "เดหลี" in plant_name else "ปานกลาง"}

        return {
            "plant_name": plant_name,
            "care": care_info,
            "price_range": "150-400 บาท",
            "similar_plants": similar_plants,
            "shops": shop_info
        }

    except Exception as e:
        return {"error": str(e)}