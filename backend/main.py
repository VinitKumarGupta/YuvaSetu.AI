from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from recommendation_engine import RecommendationEngine

app = FastAPI(
    title="YuvaSetu.AI Recommendation Engine",
    description="AI-powered internship recommendation system for PM Internship Scheme",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize recommendation engine
recommendation_engine = RecommendationEngine()

class CandidateProfile(BaseModel):
    age: str
    education: str
    skills: List[str]
    sectors: List[str]
    location: str

class RecommendationRequest(BaseModel):
    profile: CandidateProfile

class InternshipRecommendation(BaseModel):
    id: str
    title: str
    company: str
    sector: str
    skills: List[str]
    location: str
    duration: str
    stipend: str
    description: str
    requirements: List[str]
    match_score: float
    match_reason: dict

class RecommendationResponse(BaseModel):
    recommendations: List[InternshipRecommendation]
    total_matches: int
    processing_time: float

@app.get("/")
async def root():
    return {
        "message": "YuvaSetu.AI Recommendation Engine API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "recommendation-engine"}

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """
    Get personalized internship recommendations based on candidate profile
    """
    try:
        import time
        start_time = time.time()
        
        # Get recommendations from the engine
        recommendations = recommendation_engine.get_recommendations(
            age=request.profile.age,
            education=request.profile.education,
            skills=request.profile.skills,
            sectors=request.profile.sectors,
            location=request.profile.location
        )
        
        processing_time = time.time() - start_time
        
        return RecommendationResponse(
            recommendations=recommendations,
            total_matches=len(recommendations),
            processing_time=round(processing_time, 3)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/internships")
async def get_all_internships():
    """
    Get all available internships (for debugging/admin purposes)
    """
    try:
        return recommendation_engine.get_all_internships()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching internships: {str(e)}")

@app.get("/stats")
async def get_stats():
    """
    Get system statistics
    """
    try:
        stats = recommendation_engine.get_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)