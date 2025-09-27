# YuvaSetu.AI Backend

AI-powered internship recommendation engine for the PM Internship Scheme.

## Features

- **Rule-based Recommendation Engine**: Uses scikit-learn and spaCy for intelligent matching
- **FastAPI Backend**: High-performance API with automatic documentation
- **Comprehensive Dataset**: 12+ diverse internship opportunities across multiple sectors
- **Smart Matching**: Considers skills, location, education, age, and sector preferences
- **Government Standards**: Optimized for accessibility and low-bandwidth usage

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Download spaCy English model:
```bash
python -m spacy download en_core_web_sm
```

## Running the Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### GET /
Health check and basic information

### POST /recommend
Get personalized internship recommendations

**Request Body:**
```json
{
  "profile": {
    "age": "22",
    "education": "Graduate",
    "skills": ["JavaScript", "React", "Python"],
    "sectors": ["Technology", "Finance"],
    "location": "Mumbai, Maharashtra"
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": "2",
      "title": "Software Development Intern",
      "company": "InnovateTech Solutions",
      "sector": "Technology",
      "skills": ["JavaScript", "React", "Node.js", "Python", "Database Management"],
      "location": "Bangalore, Karnataka",
      "duration": "6 months",
      "stipend": "₹20,000/month",
      "description": "Work with our engineering team...",
      "requirements": ["Knowledge of JavaScript", "Understanding of web development concepts"],
      "match_score": 87.5,
      "match_reason": {
        "skills": ["JavaScript", "React"],
        "sector": "Technology",
        "location": null
      }
    }
  ],
  "total_matches": 1,
  "processing_time": 0.045
}
```

### GET /internships
Get all available internships

### GET /stats
Get system statistics

## Recommendation Algorithm

The recommendation engine uses a weighted scoring system:

1. **Skills Match (35%)**: Exact and semantic skill matching using spaCy
2. **Sector Preference (25%)**: Direct and related sector matching
3. **Location Match (20%)**: Same city, state, or nearby major cities
4. **Education Match (15%)**: Education level compatibility
5. **Age Match (5%)**: Age range compatibility

## Integration with PM Portal

This backend can be easily integrated with the existing PM Internship Scheme portal:

1. **API Integration**: Simple REST API calls
2. **Widget Embedding**: Can be embedded as a widget
3. **Microservice**: Lightweight and scalable
4. **Response Time**: < 1 second for recommendations

## Government Compliance

- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for low-bandwidth connections
- **Security**: CORS enabled for secure cross-origin requests
- **Documentation**: Auto-generated API documentation