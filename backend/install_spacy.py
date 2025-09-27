#!/usr/bin/env python3
"""
Script to install spaCy English model for the recommendation engine
"""

import subprocess
import sys
import os

def install_spacy_model():
    """Install the spaCy English model"""
    try:
        print("Installing spaCy English model...")
        result = subprocess.run([
            sys.executable, "-m", "spacy", "download", "en_core_web_sm"
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ spaCy English model installed successfully!")
            return True
        else:
            print(f"❌ Error installing spaCy model: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Exception while installing spaCy model: {e}")
        return False

def test_spacy_installation():
    """Test if spaCy model is working"""
    try:
        import spacy
        nlp = spacy.load("en_core_web_sm")
        doc = nlp("This is a test sentence.")
        print("✅ spaCy model is working correctly!")
        return True
    except Exception as e:
        print(f"❌ spaCy model test failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Setting up YuvaSetu.AI Recommendation Engine")
    print("=" * 50)
    
    # Install spaCy model
    if install_spacy_model():
        # Test installation
        if test_spacy_installation():
            print("\n🎉 Setup completed successfully!")
            print("You can now run the backend server with: python main.py")
        else:
            print("\n⚠️  Setup completed but spaCy model test failed.")
            print("The system will use basic text processing instead.")
    else:
        print("\n⚠️  spaCy model installation failed.")
        print("The system will use basic text processing instead.")
        print("You can still run the backend server with: python main.py")