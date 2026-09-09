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


# =========================================================
# APP
# =========================================================

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
# HOME API
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

    # 1. Classify category, subcategory,
    #    solution domain and keywords
    classification = classify_problem(request.text)

    # 2. Detect priority and severity
    priority_info = detect_priority(request.text)

    # 3. Find required expertise
    expertise = get_required_expertise(
        classification["category"],
        request.text
    )

    # 4. Return complete analysis
    return AnalyzeResponse(
        category=classification["category"],
        subCategory=classification["sub_category"],
        severity=priority_info["severity"],
        priority=priority_info["priority"],
        keywords=classification["keywords"],
        requiredExpertise=expertise,
        solutionDomain=classification["solution_domain"],
    )


# =========================================================
# DUPLICATE DETECTION
# =========================================================

@app.post(
    "/duplicate-check",
    response_model=DuplicateCheckResponse
)
def duplicate_check(request: DuplicateCheckRequest):

    scores = calculate_similarities(
        request.new_problem_text,
        request.existing_problems_texts
    )

    return DuplicateCheckResponse(
        similarity_scores=scores
    )


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

    result = get_chatbot_response(user_message)

    return result