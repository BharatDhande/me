import requests
from dotenv import load_dotenv
load_dotenv()
import os

key = os.getenv("OPENROUTER_API_KEY")

print("KEY:", key[:10])

headers = {
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}

payload = {
    "model": "meta-llama/llama-3.1-8b-instruct",
    "messages": [
        {"role": "user", "content": "Say hello"}
    ]
}

r = requests.post(
    "https://openrouter.ai/api/v1/chat/completions",
    headers=headers,
    json=payload
)

print(r.json())
