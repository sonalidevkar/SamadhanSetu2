from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.model import (
    ProblemRequest,
    AnalyzeResponse,
    DuplicateCheckRequest,
    DuplicateCheckResponse,
)

from services.classification import classify_problem
from services.priority_detection import detect_priority
from services.expertise_matching import get_required_expertise
from services.duplicate_detection import calculate_similarities

from services.chatbot import get_chatbot_response


app = FastAPI(
    title="Samadhan Setu AI Service",
    description="AI analysis and chatbot service for Samadhan Setu",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# CHAT REQUEST
# =========================================================

class ChatRequest(BaseModel):
    message: str


# =========================================================
# HOME
# =========================================================

@app.get("/")
def read_root():
    return {
        "message": "Samadhan Setu AI Service is running successfully"
    }


# =========================================================
# PROBLEM ANALYSIS
# =========================================================

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_problem(request: ProblemRequest):

    # Classification
    category, sub_category = classify_problem(
        request.text
    )

    # Priority
    priority, severity = detect_priority(
        request.text
    )

    # Required expertise
    expertise = get_required_expertise(
        category,
        request.text
    )

    # Return complete AI analysis
    return {
        "category": category,
        "subCategory": sub_category,
        "severity": severity,
        "priority": priority,
        "keywords": [],
        "requiredExpertise": expertise,
        "solutionDomain": category,
    }


# =========================================================
# DUPLICATE DETECTION
# =========================================================

@app.post(
    "/duplicate-check",
    response_model=DuplicateCheckResponse
)
def duplicate_check(
    request: DuplicateCheckRequest,
):

    result = calculate_similarities(
        request.text
    )

    return result


# =========================================================
# CHATBOT
# =========================================================

@app.post("/chat")
def chat(request: ChatRequest):

    user_message = request.message.strip()

    if not user_message:
        return {
            "response": "Please enter a message."
        }

    result = get_chatbot_response(
        user_message
    )

    return result