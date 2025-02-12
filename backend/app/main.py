from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze, affiliate  # ✅ โหลด Routes

app = FastAPI()

# ✅ อนุญาตให้ Frontend ใช้งาน API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  
        "https://gardano-frontend.onrender.com"  # ✅ เพิ่ม URL ของ Render
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