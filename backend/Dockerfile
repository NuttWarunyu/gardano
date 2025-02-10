# ใช้ Python 3.11 เป็น Base Image
FROM python:3.11

# ตั้งค่าตำแหน่งการทำงานของ Container
WORKDIR /app

# คัดลอกไฟล์จาก backend ไปยัง Container
COPY backend/ /app/

# ติดตั้ง Python Dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# เปิดพอร์ตที่ต้องใช้ (เช่น 8000)
EXPOSE 8000

# คำสั่งสำหรับรัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]