import os
import openai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze, affiliate  # ✅ แยก Route ออกไป

# ✅ สร้าง FastAPI App ก่อน
app = FastAPI()

# ✅ เปิดให้ Frontend ใช้งาน API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # ✅ รองรับ Frontend บน Localhost
        "https://gardano-frontend.onrender.com",  # ✅ รองรับ Frontend ที่ Render
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ รวม API Routes
app.include_router(analyze.router, prefix="/api")
app.include_router(affiliate.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "🚀 Gardano API is running!"}