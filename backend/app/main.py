import os
import openai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze, affiliate  # ✅ แยก Route ออกไป

# ✅ ดึงค่า OPENAI_API_KEY จาก Environment Variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# ✅ ตรวจสอบว่าค่าถูกต้องหรือไม่
if not OPENAI_API_KEY:
    raise ValueError("❌ ERROR: OPENAI_API_KEY is not set! Please check your environment variables.")

# ✅ ตั้งค่า API Key ให้ OpenAI Client
openai.api_key = OPENAI_API_KEY

# ✅ สร้าง FastAPI App
app = FastAPI()

# ✅ เปิดให้ Frontend ใช้งาน API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ รวม API Routes
app.include_router(analyze.router, prefix="/api")
app.include_router(affiliate.router, prefix="/api")