import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Bookmark, BookOpen, User, LogOut, Globe } from 'lucide-react';
import { useI18n } from '../i18n/i18n';
import { getUser, logout } from '../lib/auth';

const MobileNavigation: React.FC = () => {
  const { t, language, setLanguage, languageNames } = useI18n();
  const navigate = useNavigate();
  const user = getUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navigationItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: Bookmark, label: t('nav.saved'), path: '/saved' },
    { icon: BookOpen, label: t('nav.learn'), path: '/learn' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo.svg"
                    alt="YuvaSetu.AI Logo"
                    className="h-8 w-auto"
                  />
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                    YuvaSetu.AI
                  </h1>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              {user && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">Welcome back!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="space-y-2 mb-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Language Selection */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(languageNames).slice(0, 8).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code as any);
                        setShowLangMenu(false);
                      }}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        language === code 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                {Object.keys(languageNames).length > 8 && (
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="w-full mt-2 p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    View All Languages ({Object.keys(languageNames).length})
                  </button>
                )}
              </div>

              {/* User Actions */}
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t('nav.login')}
                  </Link>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all font-medium"
                  >
                    Start Your Journey
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/learn');
                    }}
                    className="w-full p-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-orange-300 transition-colors font-medium"
                  >
                    Learn New Skills
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Language Menu Modal */}
      {showLangMenu && (
        <div className="fixed inset-0 z-60 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Select Language</h3>
                <button
                  onClick={() => setShowLangMenu(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code as any);
                      setShowLangMenu(false);
                    }}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      language === code 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-500">{code.toUpperCase()}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;