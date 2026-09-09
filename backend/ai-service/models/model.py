from pydantic import BaseModel
from typing import List, Optional

class ProblemRequest(BaseModel):
    text: str
    
class AnalyzeResponse(BaseModel):
    category: str
    subCategory: str
    severity: str
    priority: str
    keywords: List[str]
    requiredExpertise: List[str]
    solutionDomain: str

class DuplicateCheckRequest(BaseModel):
    new_problem_text: str
    existing_problems_texts: List[str]

class DuplicateCheckResponse(BaseModel):
    similarity_scores: List[float]
