import os
from dotenv import load_dotenv

# ✅ โหลดไฟล์ .env
dotenv_path = os.path.join(os.path.dirname(__file__), "../.env")  # ตรวจสอบตำแหน่งไฟล์ .env
load_dotenv(dotenv_path)

# ✅ อ่านค่า OPENAI_API_KEY จาก .env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")