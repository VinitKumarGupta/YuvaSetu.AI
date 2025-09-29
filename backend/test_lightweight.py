#!/usr/bin/env python3
"""
Test script for the lightweight recommendation engine
"""

import sys
import os
import requests
import json

def test_lightweight_engine():
    """Test the lightweight recommendation engine"""
    
    print("🧪 Testing Lightweight Recommendation Engine...")
    
    base_url = "http://localhost:8000"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health endpoint working")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
            return
    except Exception as e:
        print(f"❌ Server not running: {e}")
        return
    
    # Test recommendation endpoint
    test_profile = {
        "skills": ["JavaScript", "React", "HTML", "CSS"],
        "sector_preference": "Technology",
        "location": "Mumbai",
        "education_level": "Graduate",
        "age": 22
    }
    
    print(f"\n📋 Testing with profile: {test_profile}")
    
    try:
        response = requests.post(
            f"{base_url}/recommend",
            json=test_profile,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            recommendations = response.json()
            print(f"✅ Got {len(recommendations)} recommendations")
            
            for i, rec in enumerate(recommendations[:3], 1):
                print(f"\n{i}. {rec['title']} at {rec['company']}")
                print(f"   Skills: {rec['skills']}")
                print(f"   Score: {rec['match_score']:.1%}")
                print(f"   Reason: {rec['reason']}")
        else:
            print(f"❌ Recommendation failed: {response.status_code}")
            print(f"Response: {response.text}")
    
    except Exception as e:
        print(f"❌ Error testing recommendations: {e}")
    
    # Test different profile
    test_profile_2 = {
        "skills": ["Digital Marketing", "Social Media", "Content Writing"],
        "sector_preference": "Marketing",
        "location": "Delhi",
        "education_level": "Graduate", 
        "age": 23
    }
    
    print(f"\n📋 Testing with marketing profile: {test_profile_2}")
    
    try:
        response = requests.post(
            f"{base_url}/recommend",
            json=test_profile_2,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            recommendations = response.json()
            print(f"✅ Got {len(recommendations)} recommendations")
            
            for i, rec in enumerate(recommendations[:2], 1):
                print(f"\n{i}. {rec['title']} at {rec['company']}")
                print(f"   Skills: {rec['skills']}")
                print(f"   Score: {rec['match_score']:.1%}")
                print(f"   Reason: {rec['reason']}")
        else:
            print(f"❌ Recommendation failed: {response.status_code}")
    
    except Exception as e:
        print(f"❌ Error testing marketing recommendations: {e}")
    
    print("\n✅ Lightweight engine test completed!")

if __name__ == "__main__":
    test_lightweight_engine()