from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, Affiliate, ClickTracking
from app.schemas import AffiliateCreate  # ✅ Import Pydantic Model

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/affiliates")
def get_affiliates(db: Session = Depends(get_db)):
    return db.query(Affiliate).all()

# ✅ แก้ไข `POST` ให้รับ JSON
@router.post("/affiliates")
def add_affiliate(data: AffiliateCreate, db: Session = Depends(get_db)):
    new_affiliate = Affiliate(
        store_name=data.store_name,
        affiliate_url=data.affiliate_url,
        commission_rate=data.commission_rate
    )
    db.add(new_affiliate)
    db.commit()
    db.refresh(new_affiliate)
    return new_affiliate