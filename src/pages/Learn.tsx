import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { useI18n } from '../i18n/i18n';
import { learningResources } from '../data/mockData';

const Learn: React.FC = () => {
  const { t } = useI18n();

  const categoryColors = {
    Government: 'bg-blue-500',
    Technology: 'bg-purple-500',
    Skills: 'bg-green-500',
    Education: 'bg-orange-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('learn.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('learn.subtitle')}
          </p>
        </div>

        {/* Featured Government Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Government Initiatives & Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningResources.filter(resource => resource.category === 'Government').map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow group">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{resource.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[resource.category as keyof typeof categoryColors] || 'bg-gray-500'}`}>
                    {resource.category}
                  </span>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <span>{t('learn.visit')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Learning Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Skill Development & Learning Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningResources.filter(resource => resource.category !== 'Government').map((resource) => (
              <div key={resource.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow group">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{resource.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${categoryColors[resource.category as keyof typeof categoryColors] || 'bg-gray-500'}`}>
                    {resource.category}
                  </span>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    <span>{t('learn.visit')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Apply Your New Skills?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Once you've built your skills with these resources, come back to find internships that match your enhanced profile.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
          >
            <BookOpen className="w-5 h-5" />
            <span>Find Internships Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Learn;