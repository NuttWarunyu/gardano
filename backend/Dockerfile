# ใช้ Python base image ที่รองรับ pip
FROM python:3.10

# ตั้งค่า directory ทำงาน
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปที่ Container
COPY . /app/.

# ✅ ติดตั้ง pip ก่อนใช้
RUN python -m pip install --upgrade pip

# ✅ ติดตั้ง dependencies จาก `requirements.txt`
RUN pip install -r backend/requirements.txt

# เปิด port สำหรับ FastAPI
EXPOSE 8000

# คำสั่งรัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]