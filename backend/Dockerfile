# ✅ ใช้ Python official image เป็น base
FROM python:3.10

# ✅ กำหนด working directory เป็น /app
WORKDIR /app

# ✅ คัดลอกไฟล์ requirements.txt และติดตั้ง dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ คัดลอกโค้ดทั้งหมดเข้าไปใน container
COPY . .

# ✅ เปิด port 8000 สำหรับ FastAPI
EXPOSE 8000

# ✅ รัน FastAPI ผ่าน Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]