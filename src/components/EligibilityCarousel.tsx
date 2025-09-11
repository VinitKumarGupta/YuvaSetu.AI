import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Users, Calendar, GraduationCap, MapPin } from 'lucide-react';

const eligibilityCriteria = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Age Requirement",
    description: "Must be between 21-24 years",
    color: "text-blue-600"
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Education",
    description: "Graduate or pursuing graduation",
    color: "text-green-600"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Duration",
    description: "3-6 months internship period",
    color: "text-purple-600"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Location",
    description: "Pan India opportunities available",
    color: "text-orange-600"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Skills",
    description: "Basic digital literacy required",
    color: "text-indigo-600"
  }
];

const EligibilityCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === eligibilityCriteria.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === eligibilityCriteria.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? eligibilityCriteria.length - 1 : prevIndex - 1
    );
  };

  const currentCriterion = eligibilityCriteria[currentIndex];

  return (
    <div className="hidden lg:flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-4 py-2 border border-blue-200">
      <button
        onClick={prevSlide}
        className="p-1 hover:bg-white rounded-full transition-colors"
        aria-label="Previous criterion"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600" />
      </button>
      
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className={`${currentCriterion.color} flex-shrink-0`}>
          {currentCriterion.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {currentCriterion.title}
          </div>
          <div className="text-xs text-gray-600 truncate">
            {currentCriterion.description}
          </div>
        </div>
      </div>
      
      <button
        onClick={nextSlide}
        className="p-1 hover:bg-white rounded-full transition-colors"
        aria-label="Next criterion"
      >
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </button>
      
      {/* Dots indicator */}
      <div className="flex space-x-1">
        {eligibilityCriteria.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to criterion ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EligibilityCarousel;