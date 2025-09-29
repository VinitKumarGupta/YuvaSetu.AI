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
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "https://*.vercel.app",
        "*"  # Allow all origins for development - remove in production
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize recommendation engine
try:
    recommendation_engine = RecommendationEngine()
    print("✅ Recommendation engine initialized successfully")
except Exception as e:
    print(f"⚠️  Error initializing recommendation engine: {e}")
    recommendation_engine = None

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
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not available")
    
    try:
        import time
        start_time = time.time()
        
        print(f"📝 Processing recommendation request for profile: {request.profile.model_dump()}")
        
        # Get recommendations from the engine
        recommendations = recommendation_engine.get_recommendations(
            age=request.profile.age,
            education=request.profile.education,
            skills=request.profile.skills,
            sectors=request.profile.sectors,
            location=request.profile.location
        )
        
        processing_time = time.time() - start_time
        
        print(f"✅ Generated {len(recommendations)} recommendations in {processing_time:.3f}s")
        
        return RecommendationResponse(
            recommendations=recommendations,
            total_matches=len(recommendations),
            processing_time=round(processing_time, 3)
        )
        
    except Exception as e:
        print(f"❌ Error generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/internships")
async def get_all_internships():
    """
    Get all available internships (for debugging/admin purposes)
    """
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not available")
    
    try:
        internships = recommendation_engine.get_all_internships()
        print(f"✅ Retrieved {len(internships)} internships")
        return {"internships": internships, "total": len(internships)}
    except Exception as e:
        print(f"❌ Error fetching internships: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching internships: {str(e)}")

@app.get("/stats")
async def get_stats():
    """
    Get system statistics
    """
    if not recommendation_engine:
        raise HTTPException(status_code=500, detail="Recommendation engine not available")
    
    try:
        stats = recommendation_engine.get_stats()
        print("✅ Retrieved system stats")
        return stats
    except Exception as e:
        print(f"❌ Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)