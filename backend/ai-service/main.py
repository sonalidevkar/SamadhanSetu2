from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from models.model import ProblemRequest, AnalyzeResponse, DuplicateCheckRequest, DuplicateCheckResponse
from services.classification import classify_problem
from services.priority_detection import detect_priority
from services.expertise_matching import get_required_expertise
from services.duplicate_detection import calculate_similarities

app = FastAPI(title="SIH AI Microservice")

@app.get("/")
def read_root():
    return {"message": "AI Microservice is running"}

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze_problem(request: ProblemRequest):
    # 1. Classify Category, Subcategory, Solution Domain, Keywords
    classification = classify_problem(request.text)
    
    # 2. Detect Priority & Severity
    priority_info = detect_priority(request.text)
    
    # 3. Get Required Expertise
    expertise = get_required_expertise(classification['category'], request.text)
    
    return AnalyzeResponse(
        category=classification['category'],
        subCategory=classification['sub_category'],
        severity=priority_info['severity'],
        priority=priority_info['priority'],
        keywords=classification['keywords'],
        requiredExpertise=expertise,
        solutionDomain=classification['solution_domain']
    )

@app.post("/duplicate-check", response_model=DuplicateCheckResponse)
def duplicate_check(request: DuplicateCheckRequest):
    # Calculate semantic similarity
    scores = calculate_similarities(request.new_problem_text, request.existing_problems_texts)
    return DuplicateCheckResponse(similarity_scores=scores)
