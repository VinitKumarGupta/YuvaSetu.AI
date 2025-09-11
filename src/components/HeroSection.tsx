import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';

interface HeroSectionProps {
  onStartJourney: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Government Branding */}
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-2 shadow-sm border border-gray-200 mb-8">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-white border-2 border-green-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">PM Internship Scheme Initiative</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

       

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={onStartJourney}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg flex items-center space-x-2 transform hover:scale-105 animate-pulse hover:animate-none"
              aria-label={t('hero.start')}
            >
              <span>{t('hero.start')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/learn')}
              className="group bg-white text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300 font-semibold text-lg flex items-center space-x-2 transform hover:scale-105"
              aria-label={t('hero.learn')}
            >
              <BookOpen className="w-5 h-5 text-orange-500" />
              <span>{t('hero.learn')}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600">Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Students Placed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;