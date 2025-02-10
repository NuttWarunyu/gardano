FROM python:3.9

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r /app/requirements.txt

COPY . /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]