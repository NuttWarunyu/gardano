# ✅ ใช้ Base Image ที่มี Python และ pip ติดตั้งมาแล้ว
FROM python:3.10-slim

# ตั้งค่า directory ทำงาน
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปที่ Container
COPY . /app/.

# ✅ ใช้ python -m pip เพื่อให้แน่ใจว่า pip ใช้งานได้
RUN python -m pip install --upgrade pip

# ✅ ติดตั้ง dependencies จาก `requirements.txt`
RUN pip install -r backend/requirements.txt

# เปิด port สำหรับ FastAPI
EXPOSE 8000

# คำสั่งรัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]