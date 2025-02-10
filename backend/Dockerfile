# ใช้ Python เป็น Base Image
FROM python:3.9

# กำหนดโฟลเดอร์ทำงานใน Container
WORKDIR /app

# คัดลอก requirements.txt ไปที่ /app
COPY backend/requirements.txt /app/requirements.txt

# ใช้ cache ของ pip เพื่อลดเวลาติดตั้งแพ็กเกจ
RUN python3 -m pip install --upgrade pip && \
    python3 -m pip install --no-cache-dir -r /app/requirements.txt

# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY backend /app

# เปิดพอร์ต 8000
EXPOSE 8000

# ใช้ PORT จาก Railway ถ้ามีค่าเข้ามา
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]