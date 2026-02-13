from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from client import stream_openrouter
from fastapi.responses import StreamingResponse

import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Chat(BaseModel):
    message: str
    session_id: str   # <-- added


@app.post("/chat")
async def chat(req: Chat):

    def generator():
        for token in stream_openrouter(req.message, req.session_id):
            yield token

    return StreamingResponse(generator(), media_type="text/plain")
