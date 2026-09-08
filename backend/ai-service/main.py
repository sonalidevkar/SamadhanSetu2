from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.chatbot import get_chatbot_response


app = FastAPI(
    title="Samadhan Setu AI Service",
    description="AI Chatbot API for Samadhan Setu",
    version="1.0.0"
)


# Allow frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request format
class ChatRequest(BaseModel):
    message: str


# Home API
@app.get("/")
def home():
    return {
        "message": "Samadhan Setu AI Service is running successfully"
    }


# Chatbot API
@app.post("/chat")
def chat(request: ChatRequest):

    user_message = request.message.strip()

    if not user_message:
        return {
            "response": "Please enter a message."
        }

    result = get_chatbot_response(user_message)

    return result