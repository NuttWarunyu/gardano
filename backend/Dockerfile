# ใช้ Python เป็น Base Image
FROM python:3.9

# กำหนดโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอก requirements.txt ไปที่ /app
COPY backend/requirements.txt /app/requirements.txt

# ติดตั้ง pip และ dependencies
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r /app/requirements.txt

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY backend /app

# รันแอปพลิเคชัน
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]