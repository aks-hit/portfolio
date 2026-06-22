"""Minimal stub backend to satisfy supervisor.
Portfolio is fully Next.js based — chatbot uses /api/chat (Next.js route)."""
from fastapi import FastAPI

app = FastAPI()


@app.get("/api/health")
def health():
    return {"status": "ok"}
