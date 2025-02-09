import openai

# 🔑 ใส่ API Key ที่ config.py
from config import OPENAI_API_KEY

client = openai.OpenAI(api_key=OPENAI_API_KEY)

response = client.chat.completions.create(
    model="gpt-4o",  # หรือใช้ "gpt-4-turbo"
    messages=[{"role": "system", "content": "คุณคือ AI ที่ช่วยให้ข้อมูลต้นไม้"},
              {"role": "user", "content": "บอกวิธีดูแลต้นมะม่วงให้หน่อย"}]
)

print(response.choices[0].message.content)