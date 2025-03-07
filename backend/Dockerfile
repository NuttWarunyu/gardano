# ✅ ใช้ Python Base Image ที่มี pip มาให้แล้ว
FROM python:3.10-slim

# ตั้งค่าตำแหน่งทำงานใน Container
WORKDIR /app

# ✅ อัปเดต package list และติดตั้ง pip อย่างถูกต้อง
RUN apt-get update && apt-get install -y python3-pip

# ✅ อัปเกรด pip (ใช้ `python -m pip` เพื่อให้แน่ใจว่าทำงานได้)
RUN python -m ensurepip && python -m pip install --upgrade pip

# ✅ คัดลอกไฟล์ทั้งหมดไปที่ Container
COPY . /app/

# ✅ ติดตั้ง dependencies จาก `requirements.txt`
RUN pip install --no-cache-dir -r backend/requirements.txt

# เปิด port สำหรับ FastAPI
EXPOSE 8000

# ✅ ใช้ CMD เพื่อรัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]