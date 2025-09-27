# YuvaSetu.AI - PM Internship Portal Integration

## Overview

YuvaSetu.AI is a recommendation engine designed to help students find the most suitable internships through the PM Internship Scheme. This document outlines how to integrate our recommendation system into your existing PM Internship portal.

## Features

- **Government-Style UI**: Matches official PM Internship portal design language
- **Rule-Based Recommendations**: Lightweight, fast recommendation engine
- **Mobile-First Design**: Optimized for all device sizes
- **Accessibility Compliant**: Meets government accessibility standards
- **Multiple Integration Options**: iframe widget or REST API

## Integration Options

### Option 1: iframe Widget (Recommended for Quick Integration)

Embed our recommendation widget directly into your website:

```html
<iframe 
  src="https://yuvasetu.ai/widget/recommendations" 
  width="100%" 
  height="600" 
  frameborder="0"
  title="YuvaSetu.AI Recommendations">
</iframe>
```

**Benefits:**
- Quick setup (copy & paste)
- No backend integration required
- Automatically responsive
- Always up-to-date

### Option 2: REST API Integration

For full control and customization, use our REST API:

#### Base URL
```
https://api.yuvasetu.ai
```

#### Endpoints

##### Health Check
```http
GET /api/health
```

##### Get Recommendations
```http
POST /api/recommend
Content-Type: application/json

{
  "education": "Graduate",
  "skills": ["JavaScript", "React", "Python"],
  "sectors": ["Technology", "Finance"],
  "location": "Mumbai, Maharashtra"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "2",
      "title": "Software Development Intern",
      "company": "InnovateTech Solutions",
      "sector": "Technology",
      "skills": ["JavaScript", "React", "Node.js"],
      "location": "Bangalore, Karnataka",
      "duration": "6 months",
      "stipend": "₹20,000/month",
      "description": "Work with our engineering team...",
      "requirements": ["Knowledge of JavaScript", "..."],
      "matchScore": 88,
      "matchReason": {
        "skills": ["JavaScript", "React"],
        "sector": "Technology"
      }
    }
  ],
  "count": 5
}
```

##### Get All Internships
```http
GET /api/internships
```

##### Get Specific Internship
```http
GET /api/internships/{id}
```

## Recommendation Algorithm

Our rule-based engine calculates match scores based on:

1. **Skills Matching (40% weight)**: Compares user skills with internship requirements
2. **Sector Matching (30% weight)**: Matches user interests with internship sectors
3. **Location Matching (20% weight)**: Prioritizes internships in user's location
4. **Education Level (10% weight)**: Base score for all internships

## Government Design System

### Color Palette
- **Primary Orange**: #f97316 (govt-orange-500)
- **Primary Blue**: #3b82f6 (govt-blue-500)
- **Saffron**: #FF9933
- **White**: #FFFFFF
- **Green**: #138808

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, government blue (#1e40af)
- **Body Text**: Medium weight, readable gray

### Components
- **Cards**: Clean rectangular design with 2px borders
- **Buttons**: Solid colors with 2px borders, no gradients
- **Headers**: Bold, clear hierarchy
- **Accessibility**: High contrast, focus indicators

## Mobile-First Responsive Design

All components are optimized for mobile devices:

- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Touch Targets**: Minimum 44px for buttons and interactive elements
- **Typography**: Scales appropriately across screen sizes
- **Images**: Optimized for low bandwidth connections

## Accessibility Features

- **Color Contrast**: Meets WCAG 2.1 AA standards
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Support for high contrast preferences
- **Reduced Motion**: Respects user motion preferences

## Local Development

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Railway/Heroku)
1. Connect your repository
2. Set Python runtime
3. Install dependencies from requirements.txt
4. Set start command: `python app.py`

## API Rate Limits

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

## Support

For integration support:
- **Email**: support@yuvasetu.ai
- **Documentation**: https://docs.yuvasetu.ai
- **GitHub**: https://github.com/yuvasetu-ai

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

We welcome contributions! Please see our contributing guidelines for more information.

---

**YuvaSetu.AI** - Empowering Youth Through Digital India