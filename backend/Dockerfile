# ✅ ใช้ Python 3.11
FROM python:3.11

# ✅ ตั้งค่า Workdir
WORKDIR /app

# ✅ คัดลอกไฟล์ทั้งหมดเข้า Container
COPY . /app/

# ✅ ติดตั้ง Dependencies
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

# ✅ รัน FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]