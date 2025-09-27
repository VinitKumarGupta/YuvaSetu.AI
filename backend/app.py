from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from typing import List, Dict, Any

app = Flask(__name__)
CORS(app)

# Load mock internship data
def load_internships():
    with open('data/internships.json', 'r') as f:
        return json.load(f)

# Rule-based recommendation engine
def calculate_match_score(internship: Dict[str, Any], user_data: Dict[str, Any]) -> float:
    score = 0
    matched_skills = []
    
    # Skill matching (40% weight)
    if 'skills' in user_data and 'skills' in internship:
        skill_matches = [
            skill for skill in internship['skills'] 
            if any(
                user_skill.lower() in skill.lower() or skill.lower() in user_skill.lower()
                for user_skill in user_data['skills']
            )
        ]
        matched_skills = skill_matches
        if internship['skills']:
            score += (len(skill_matches) / len(internship['skills'])) * 40
    
    # Sector matching (30% weight)
    if 'sectors' in user_data and 'sector' in internship:
        if internship['sector'] in user_data['sectors']:
            score += 30
    
    # Location matching (20% weight)
    if 'location' in user_data and 'location' in internship:
        user_location = user_data['location'].split(',')[0].strip()
        if user_location.lower() in internship['location'].lower():
            score += 20
    
    # Education level bonus (10% weight)
    score += 10  # Base score for all internships
    
    return min(score, 95), matched_skills

def get_recommendations(user_data: Dict[str, Any], limit: int = 5) -> List[Dict[str, Any]]:
    internships = load_internships()
    
    # Calculate scores for all internships
    scored_internships = []
    for internship in internships:
        score, matched_skills = calculate_match_score(internship, user_data)
        if score > 30:  # Only include internships with score > 30%
            scored_internships.append({
                **internship,
                'matchScore': round(score),
                'matchReason': {
                    'skills': matched_skills,
                    'sector': internship.get('sector', '')
                }
            })
    
    # Sort by score and return top recommendations
    scored_internships.sort(key=lambda x: x['matchScore'], reverse=True)
    return scored_internships[:limit]

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'YuvaSetu.AI Recommendation API'})

@app.route('/api/recommend', methods=['POST'])
def recommend_internships():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['education', 'skills', 'sectors', 'location']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get recommendations
        recommendations = get_recommendations(data)
        
        return jsonify({
            'success': True,
            'recommendations': recommendations,
            'count': len(recommendations)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/internships', methods=['GET'])
def get_all_internships():
    try:
        internships = load_internships()
        return jsonify({
            'success': True,
            'internships': internships,
            'count': len(internships)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/internships/<internship_id>', methods=['GET'])
def get_internship(internship_id):
    try:
        internships = load_internships()
        internship = next((i for i in internships if i['id'] == internship_id), None)
        
        if not internship:
            return jsonify({'error': 'Internship not found'}), 404
        
        return jsonify({
            'success': True,
            'internship': internship
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)