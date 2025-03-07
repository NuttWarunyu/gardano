import os
from dotenv import load_dotenv

load_dotenv()  # โหลดค่าจาก .env (ใช้ตอนรันบนเครื่อง Local เท่านั้น)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Railway จะดึงค่าจาก Environment Variables
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./database.db")  # ค่า Default