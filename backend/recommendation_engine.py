import json
import os
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from datetime import datetime

# spaCy will be imported lazily to avoid compatibility issues

class RecommendationEngine:
    def __init__(self):
        self.internships_data = self._load_internships_data()
        self.nlp = self._load_spacy_model()
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self._prepare_vectors()
        
    def _load_spacy_model(self):
        """Load spaCy model for text processing"""
        try:
            # Try to import and load spaCy here
            import spacy
            # Try to load the English model
            nlp = spacy.load("en_core_web_sm")
            print("✅ spaCy English model loaded successfully")
            return nlp
        except ImportError:
            print("⚠️ spaCy not installed. Using basic text processing.")
            return None
        except OSError:
            print("⚠️ spaCy English model not found. Using basic text processing.")
            return None
        except Exception as e:
            print(f"⚠️ Error loading spaCy model ({e}). Using basic text processing.")
            return None
    
    def _load_internships_data(self) -> List[Dict[str, Any]]:
        """Load comprehensive internship dataset"""
        return [
            {
                "id": "1",
                "title": "Digital Marketing Intern",
                "company": "TechCorp India",
                "sector": "Technology",
                "skills": ["Digital Marketing", "Social Media", "Content Writing", "SEO", "Analytics"],
                "location": "Mumbai, Maharashtra",
                "duration": "3 months",
                "stipend": "₹15,000/month",
                "description": "Join our dynamic marketing team to create engaging digital campaigns and grow our online presence. Learn modern marketing tools and strategies.",
                "requirements": ["Basic knowledge of social media platforms", "Good communication skills", "Creative mindset", "Basic understanding of marketing concepts"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "2",
                "title": "Software Development Intern",
                "company": "InnovateTech Solutions",
                "sector": "Technology",
                "skills": ["JavaScript", "React", "Node.js", "Python", "Database Management"],
                "location": "Bangalore, Karnataka",
                "duration": "6 months",
                "stipend": "₹20,000/month",
                "description": "Work with our engineering team to build cutting-edge web applications and learn modern development practices.",
                "requirements": ["Knowledge of JavaScript", "Understanding of web development concepts", "Problem-solving skills", "Basic programming experience"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "3",
                "title": "Graphic Design Intern",
                "company": "Creative Studio Pro",
                "sector": "Design",
                "skills": ["Graphic Design", "Adobe Creative Suite", "UI/UX Design", "Illustration", "Branding"],
                "location": "Delhi, Delhi",
                "duration": "4 months",
                "stipend": "₹12,000/month",
                "description": "Create visually stunning designs for digital and print media while learning from experienced designers.",
                "requirements": ["Proficiency in design software", "Creative portfolio", "Attention to detail", "Understanding of design principles"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "4",
                "title": "Business Analyst Intern",
                "company": "FinanceFirst Consulting",
                "sector": "Finance",
                "skills": ["Data Analysis", "Excel", "Business Intelligence", "SQL", "Reporting"],
                "location": "Pune, Maharashtra",
                "duration": "3 months",
                "stipend": "₹18,000/month",
                "description": "Analyze business processes and help optimize operations through data-driven insights.",
                "requirements": ["Strong analytical skills", "Proficiency in Excel", "Business acumen", "Attention to detail"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "5",
                "title": "Content Writing Intern",
                "company": "MediaMagnet Agency",
                "sector": "Media",
                "skills": ["Content Writing", "SEO", "Research", "Social Media", "Copywriting"],
                "location": "Chennai, Tamil Nadu",
                "duration": "2 months",
                "stipend": "₹10,000/month",
                "description": "Create engaging content for various digital platforms and learn SEO best practices.",
                "requirements": ["Excellent writing skills", "Research abilities", "Creativity", "Understanding of digital media"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "6",
                "title": "Data Science Intern",
                "company": "Analytics Pro",
                "sector": "Technology",
                "skills": ["Python", "Machine Learning", "Data Analysis", "Statistics", "SQL"],
                "location": "Hyderabad, Telangana",
                "duration": "6 months",
                "stipend": "₹25,000/month",
                "description": "Work on real-world data science projects and learn advanced analytics techniques.",
                "requirements": ["Strong mathematical background", "Python programming", "Understanding of statistics", "Problem-solving skills"],
                "education_level": "Post Graduate",
                "age_range": "22-24",
                "experience_level": "Entry"
            },
            {
                "id": "7",
                "title": "HR Operations Intern",
                "company": "PeopleFirst Corp",
                "sector": "Human Resources",
                "skills": ["HR Management", "Recruitment", "Employee Relations", "Communication", "Organization"],
                "location": "Kolkata, West Bengal",
                "duration": "3 months",
                "stipend": "₹14,000/month",
                "description": "Learn HR operations, recruitment processes, and employee management systems.",
                "requirements": ["Good communication skills", "Organizational abilities", "Interest in human resources", "Basic computer skills"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "8",
                "title": "Sales & Marketing Intern",
                "company": "GrowthMax Solutions",
                "sector": "Sales",
                "skills": ["Sales", "Marketing", "Customer Relations", "Communication", "Negotiation"],
                "location": "Ahmedabad, Gujarat",
                "duration": "4 months",
                "stipend": "₹16,000/month",
                "description": "Develop sales and marketing skills while working with real clients and projects.",
                "requirements": ["Excellent communication skills", "Sales aptitude", "Customer service orientation", "Goal-oriented mindset"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "9",
                "title": "Finance Intern",
                "company": "CapitalEdge Financial",
                "sector": "Finance",
                "skills": ["Financial Analysis", "Accounting", "Excel", "Financial Modeling", "Reporting"],
                "location": "Mumbai, Maharashtra",
                "duration": "3 months",
                "stipend": "₹19,000/month",
                "description": "Gain hands-on experience in financial analysis, accounting, and financial reporting.",
                "requirements": ["Strong analytical skills", "Understanding of accounting principles", "Excel proficiency", "Attention to detail"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "10",
                "title": "Operations Intern",
                "company": "EfficiencyMax Ltd",
                "sector": "Operations",
                "skills": ["Operations Management", "Process Improvement", "Project Management", "Analytics", "Communication"],
                "location": "Pune, Maharashtra",
                "duration": "4 months",
                "stipend": "₹17,000/month",
                "description": "Learn operations management, process optimization, and project coordination.",
                "requirements": ["Analytical thinking", "Process orientation", "Communication skills", "Problem-solving abilities"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "11",
                "title": "Healthcare Admin Intern",
                "company": "HealthCare Plus",
                "sector": "Healthcare",
                "skills": ["Healthcare Management", "Administration", "Patient Care", "Medical Records", "Communication"],
                "location": "Delhi, Delhi",
                "duration": "3 months",
                "stipend": "₹13,000/month",
                "description": "Learn healthcare administration, patient management, and medical record systems.",
                "requirements": ["Interest in healthcare", "Administrative skills", "Communication abilities", "Compassionate nature"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            },
            {
                "id": "12",
                "title": "Education Technology Intern",
                "company": "EduTech Innovations",
                "sector": "Education",
                "skills": ["Educational Technology", "Content Development", "Learning Management", "Digital Tools", "Communication"],
                "location": "Bangalore, Karnataka",
                "duration": "4 months",
                "stipend": "₹15,000/month",
                "description": "Work on educational technology solutions and digital learning platforms.",
                "requirements": ["Interest in education technology", "Content creation skills", "Digital literacy", "Communication abilities"],
                "education_level": "Graduate",
                "age_range": "21-24",
                "experience_level": "Entry"
            }
        ]
    
    def _prepare_vectors(self):
        """Prepare TF-IDF vectors for all internships"""
        # Combine all text fields for each internship
        internship_texts = []
        for internship in self.internships_data:
            text = f"{internship['title']} {internship['description']} {' '.join(internship['skills'])} {internship['sector']}"
            internship_texts.append(text)
        
        # Fit the vectorizer
        self.tfidf_matrix = self.vectorizer.fit_transform(internship_texts)
    
    def _calculate_skill_match_score(self, candidate_skills: List[str], internship_skills: List[str]) -> float:
        """Calculate skill matching score"""
        if not candidate_skills or not internship_skills:
            return 0.0
        
        # Convert to lowercase for case-insensitive matching
        candidate_skills_lower = [skill.lower() for skill in candidate_skills]
        internship_skills_lower = [skill.lower() for skill in internship_skills]
        
        # Calculate exact matches
        exact_matches = len(set(candidate_skills_lower) & set(internship_skills_lower))
        
        # Calculate partial matches using spaCy if available
        partial_matches = 0
        if self.nlp:
            for candidate_skill in candidate_skills:
                candidate_doc = self.nlp(candidate_skill.lower())
                for internship_skill in internship_skills:
                    internship_doc = self.nlp(internship_skill.lower())
                    # Calculate similarity
                    similarity = candidate_doc.similarity(internship_doc)
                    if similarity > 0.7:  # Threshold for partial match
                        partial_matches += similarity
        
        # Calculate total score
        total_skills = len(internship_skills)
        exact_score = (exact_matches / total_skills) * 0.8
        partial_score = (partial_matches / total_skills) * 0.2
        
        return min(exact_score + partial_score, 1.0)
    
    def _calculate_sector_match_score(self, candidate_sectors: List[str], internship_sector: str) -> float:
        """Calculate sector matching score"""
        if not candidate_sectors:
            return 0.0
        
        # Direct match
        if internship_sector.lower() in [sector.lower() for sector in candidate_sectors]:
            return 1.0
        
        # Related sectors mapping
        related_sectors = {
            "technology": ["design", "media"],
            "finance": ["business", "operations"],
            "healthcare": ["education"],
            "education": ["technology", "media"],
            "media": ["technology", "design"],
            "design": ["technology", "media"],
            "sales": ["marketing", "business"],
            "marketing": ["sales", "media"],
            "operations": ["business", "finance"],
            "human resources": ["business", "operations"]
        }
        
        for candidate_sector in candidate_sectors:
            candidate_sector_lower = candidate_sector.lower()
            if candidate_sector_lower in related_sectors:
                if internship_sector.lower() in related_sectors[candidate_sector_lower]:
                    return 0.7
        
        return 0.0
    
    def _calculate_location_match_score(self, candidate_location: str, internship_location: str) -> float:
        """Calculate location matching score"""
        if not candidate_location or not internship_location:
            return 0.5  # Neutral score if location not specified
        
        # Extract state from location
        candidate_state = candidate_location.split(',')[-1].strip().lower()
        internship_state = internship_location.split(',')[-1].strip().lower()
        
        # Same state
        if candidate_state == internship_state:
            return 1.0
        
        # Same city
        candidate_city = candidate_location.split(',')[0].strip().lower()
        internship_city = internship_location.split(',')[0].strip().lower()
        if candidate_city == internship_city:
            return 1.0
        
        # Major cities in same region
        major_cities = {
            "mumbai": ["pune", "nashik"],
            "delhi": ["gurgaon", "noida"],
            "bangalore": ["mysore", "mangalore"],
            "hyderabad": ["secunderabad"],
            "chennai": ["coimbatore", "madurai"]
        }
        
        for city, nearby_cities in major_cities.items():
            if (candidate_city == city and internship_city in nearby_cities) or \
               (internship_city == city and candidate_city in nearby_cities):
                return 0.8
        
        return 0.3  # Different location
    
    def _calculate_education_match_score(self, candidate_education: str, internship_education: str) -> float:
        """Calculate education matching score"""
        education_hierarchy = {
            "10th pass": 1,
            "12th pass": 2,
            "diploma": 3,
            "graduate": 4,
            "post graduate": 5,
            "phd": 6
        }
        
        candidate_level = education_hierarchy.get(candidate_education.lower(), 3)
        internship_level = education_hierarchy.get(internship_education.lower(), 3)
        
        # Exact match
        if candidate_level == internship_level:
            return 1.0
        
        # Higher education than required
        if candidate_level > internship_level:
            return 0.9
        
        # Lower education than required
        if candidate_level < internship_level:
            return 0.3
        
        return 0.5
    
    def _calculate_age_match_score(self, candidate_age: str, internship_age_range: str) -> float:
        """Calculate age matching score"""
        try:
            candidate_age_num = int(candidate_age)
            
            # Parse age range (e.g., "21-25")
            if '-' in internship_age_range:
                min_age, max_age = map(int, internship_age_range.split('-'))
                if min_age <= candidate_age_num <= max_age:
                    return 1.0
                else:
                    return 0.5
            else:
                return 0.5
        except:
            return 0.5
    
    def get_recommendations(self, age: str, education: str, skills: List[str], 
                          sectors: List[str], location: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Get personalized recommendations based on candidate profile"""
        
        recommendations = []
        
        for internship in self.internships_data:
            # Calculate individual scores
            skill_score = self._calculate_skill_match_score(skills, internship['skills'])
            sector_score = self._calculate_sector_match_score(sectors, internship['sector'])
            location_score = self._calculate_location_match_score(location, internship['location'])
            education_score = self._calculate_education_match_score(education, internship['education_level'])
            age_score = self._calculate_age_match_score(age, internship['age_range'])
            
            # Calculate weighted total score
            total_score = (
                skill_score * 0.35 +      # Skills are most important
                sector_score * 0.25 +     # Sector preference
                location_score * 0.20 +   # Location preference
                education_score * 0.15 +  # Education match
                age_score * 0.05          # Age match
            )
            
            # Only include internships with score > 0.3
            if total_score > 0.3:
                # Find matching skills
                matching_skills = []
                if skills:
                    candidate_skills_lower = [skill.lower() for skill in skills]
                    internship_skills_lower = [skill.lower() for skill in internship['skills']]
                    matching_skills = [skill for skill in internship['skills'] 
                                     if skill.lower() in candidate_skills_lower]
                
                recommendation = {
                    "id": internship['id'],
                    "title": internship['title'],
                    "company": internship['company'],
                    "sector": internship['sector'],
                    "skills": internship['skills'],
                    "location": internship['location'],
                    "duration": internship['duration'],
                    "stipend": internship['stipend'],
                    "description": internship['description'],
                    "requirements": internship['requirements'],
                    "match_score": round(total_score * 100, 1),
                    "match_reason": {
                        "skills": matching_skills,
                        "sector": internship['sector'] if sector_score > 0.5 else None,
                        "location": "Same location" if location_score > 0.8 else "Nearby location" if location_score > 0.5 else None
                    }
                }
                
                recommendations.append(recommendation)
        
        # Sort by match score and return top recommendations
        recommendations.sort(key=lambda x: x['match_score'], reverse=True)
        return recommendations[:top_k]
    
    def get_all_internships(self) -> List[Dict[str, Any]]:
        """Get all available internships"""
        return self.internships_data
    
    def get_stats(self) -> Dict[str, Any]:
        """Get system statistics"""
        return {
            "total_internships": len(self.internships_data),
            "sectors": list(set(internship['sector'] for internship in self.internships_data)),
            "locations": list(set(internship['location'] for internship in self.internships_data)),
            "avg_stipend": sum([int(re.findall(r'\d+', internship['stipend'])[0]) 
                              for internship in self.internships_data 
                              if re.findall(r'\d+', internship['stipend'])]) / len(self.internships_data),
            "last_updated": datetime.now().isoformat()
        }