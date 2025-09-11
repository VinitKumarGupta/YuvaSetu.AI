import React from 'react';
import { useI18n } from '../i18n/i18n';

const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-lg shadow-md p-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YS</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">YuvaSetu.AI</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-1 mb-4">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/saved" className="block text-gray-300 hover:text-white transition-colors">
                Saved Internships
              </a>
              <a href="/learn" className="block text-gray-300 hover:text-white transition-colors">
                Learning Resources
              </a>
            </div>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="font-semibold mb-4">Government</h4>
            <div className="space-y-2">
              <a 
                href="https://internship.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Internship Portal
              </a>
              <a 
                href="https://pmkvyofficial.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                PM Skill Development
              </a>
              <a 
                href="https://digitalindia.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Digital India
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ for Indian Youth
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;