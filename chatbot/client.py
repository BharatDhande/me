import requests
import os
import json
from dotenv import load_dotenv
from system_prompt import SYSTEM_PROMPT

from datetime import datetime

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Dictionary for all users
sessions = {}

MAX_HISTORY = 10


def stream_openrouter(user_msg, session_id):

    global sessions

    # Create new memory if session not exists
    if session_id not in sessions:
        current_time = datetime.now().strftime("%A, %d %B %Y, %I:%M %p")
        sessions[session_id] = [
            {"role": "system", "content": SYSTEM_PROMPT + f"\n\n Current Datetime:{current_time} (Asia/Kolkata)"}
        ]

    chat_memory = sessions[session_id]

    # Add user message
    chat_memory.append({"role": "user", "content": user_msg})

    # Trim history
    if len(chat_memory) > MAX_HISTORY * 2:
        chat_memory[:] = chat_memory[:1] + chat_memory[-MAX_HISTORY * 2:]

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "meta-llama/llama-3.1-8b-instruct",
        "stream": True,
        "messages": chat_memory
    }

    assistant_reply = ""

    with requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload,
        stream=True,
        timeout=60
    ) as r:

        for line in r.iter_lines(decode_unicode=True):

            if not line:
                continue

            if line.startswith("data: "):
                data = line[6:]

                if data == "[DONE]":
                    break

                try:
                    chunk = json.loads(data)
                    delta = chunk["choices"][0]["delta"]

                    if "content" in delta:
                        token = delta["content"]
                        assistant_reply += token
                        yield token

                except:
                    continue

    # Save assistant response
    chat_memory.append({"role": "assistant", "content": assistant_reply})
