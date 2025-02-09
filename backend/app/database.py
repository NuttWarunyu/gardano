from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime
import os
import json

# ✅ ใช้ SQLite เป็น Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./gardano.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# ✅ สร้าง SessionLocal และ Base
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ✅ กำหนดโครงสร้าง Database
class Affiliate(Base):
    __tablename__ = "affiliates"
    id = Column(Integer, primary_key=True, index=True)
    store_name = Column(String, index=True)
    affiliate_url = Column(String)
    commission_rate = Column(String)

class ClickTracking(Base):
    __tablename__ = "click_tracking"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # ถ้ามีระบบ Login ใช้ user_id จริง
    affiliate_id = Column(Integer, ForeignKey("affiliates.id"))
    click_time = Column(DateTime, default=datetime.datetime.utcnow)

# ✅ สร้างตารางถ้ายังไม่มี
Base.metadata.create_all(bind=engine)

# ✅ ฟังก์ชันโหลดข้อมูลร้านค้าจาก JSON (ใช้แทน get_plant_shop_data)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "plant_shop_data.json")

def get_plant_shop_data(plant_name=None):
    """โหลดข้อมูลร้านค้าต้นไม้จากไฟล์ JSON"""
    if not os.path.exists(DATA_PATH):
        return {}

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    if plant_name:
        return data.get(plant_name, [])
    return data