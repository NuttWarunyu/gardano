# ✅ ใช้ Python Base Image ที่มี pip ติดตั้งแล้ว
FROM python:3.10-slim

# ตั้งค่าตำแหน่งทำงานใน Container
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปที่ Container
COPY . /app/

# ✅ ติดตั้ง pip (ใช้ `python -m pip` เพื่อให้แน่ใจว่ามี pip)
RUN apt-get update && apt-get install -y python3-pip

# ✅ อัปเกรด pip
RUN python -m pip install --upgrade pip

# ✅ ติดตั้ง dependencies จาก `requirements.txt`
RUN pip install -r backend/requirements.txt

# เปิด port สำหรับ FastAPI
EXPOSE 8000

# คำสั่งรัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]