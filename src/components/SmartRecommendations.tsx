import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, MapPin, Clock, Star, Users, Award } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  matchScore: number;
  reasons: string[];
  skills: string[];
  category: string;
  isRemote: boolean;
  isUrgent: boolean;
}

const SmartRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Simulate AI-powered recommendations
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'AI/ML Intern',
        company: 'TechCorp India',
        location: 'Bangalore',
        duration: '6 months',
        stipend: '₹25,000/month',
        matchScore: 95,
        reasons: ['Your Python skills match perfectly', 'Location preference aligned', 'Recent graduate status'],
        skills: ['Python', 'Machine Learning', 'Data Science'],
        category: 'Technology',
        isRemote: false,
        isUrgent: true
      },
      {
        id: '2',
        title: 'Digital Marketing Intern',
        company: 'GrowthHub',
        location: 'Mumbai',
        duration: '3 months',
        stipend: '₹15,000/month',
        matchScore: 88,
        reasons: ['Your communication skills', 'Interest in marketing sector', 'Social media experience'],
        skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
        category: 'Marketing',
        isRemote: true,
        isUrgent: false
      },
      {
        id: '3',
        title: 'Frontend Developer',
        company: 'StartupXYZ',
        location: 'Delhi',
        duration: '4 months',
        stipend: '₹20,000/month',
        matchScore: 92,
        reasons: ['Your React skills', 'Portfolio projects', 'Location match'],
        skills: ['React', 'JavaScript', 'CSS'],
        category: 'Technology',
        isRemote: false,
        isUrgent: false
      }
    ];

    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  }, []);

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const categories = ['all', 'Technology', 'Marketing', 'Finance', 'Healthcare', 'Education'];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900">AI is analyzing your profile...</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
        </div>
        <div className="text-sm text-gray-500">
          Based on your profile & preferences
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        {filteredRecommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                  {rec.isUrgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                      Urgent
                    </span>
                  )}
                  {rec.isRemote && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                      Remote
                    </span>
                  )}
                </div>
                <p className="text-gray-600 font-medium">{rec.company}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(rec.matchScore)}`}>
                {rec.matchScore}% Match
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{rec.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{rec.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Award className="w-4 h-4" />
                <span className="text-sm">{rec.stipend}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{rec.category}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Why this matches you:</h4>
              <ul className="space-y-1">
                {rec.reasons.map((reason, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {rec.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600">Try selecting a different category or update your profile.</p>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;