import sys
import os

# เพิ่มเส้นทางสำหรับการค้นหาโมดูล app จากตำแหน่งปัจจุบัน
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'backend')))

import openai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze, affiliate  # ✅ แยก Route ออกไป

# สร้าง FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now (in case localhost or 192.168 issues)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# รวม API Routes
app.include_router(analyze.router, prefix="/api")
app.include_router(affiliate.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "🚀 Gardano API is running!"}