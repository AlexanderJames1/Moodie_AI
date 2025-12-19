from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import httpx


# Initialize FastAPI app
app = FastAPI()

# Allow frontend to connect (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_methods=["*"],
    allow_headers=["*"]
)

# Data models
class Message(BaseModel):
    role: str     
    content: str   

class ChatRequest(BaseModel):
    model: str
    messages: list[Message]

# Stream response from Ollama
async def get_ollama_response(data):
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", "http://localhost:11434/api/chat", json=data) as r:
            async for line in r.aiter_lines():
                if line:
                    yield f"data: {line}\n\n"

# Health check
@app.get("/")
async def home():
    return {"status": "ok"}

# Get available models
@app.get("/api/models")
async def models():
    async with httpx.AsyncClient() as client:
        r = await client.get("http://localhost:11434/api/tags")
        return r.json()

# Chat endpoint
@app.post("/api/chat")
async def chat(req: ChatRequest):
    data = {
        "model": req.model, 
        "messages": [{"role": m.role, "content": m.content} for m in req.messages],
        "stream": True
    }
    return StreamingResponse(get_ollama_response(data), media_type="text/event-stream")
