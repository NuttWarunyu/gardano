# app/schemas.py
from pydantic import BaseModel

class AffiliateCreate(BaseModel):
    store_name: str
    affiliate_url: str
    commission_rate: str