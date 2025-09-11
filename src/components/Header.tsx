import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, LogOut, Bookmark, Globe } from 'lucide-react';
import { useI18n } from '../i18n/i18n';
import { getUser, logout } from '../lib/auth';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const user = getUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
  {/* Logo */}
<Link to="/" className="flex items-center space-x-3  py-2 ">
  <img
    src="/logo.svg"
    alt="YuvaSetu.AI Logo"
    className="h-10 w-auto sm:h-12 md:h-14 lg:h-14"
  />
  <div>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">YuvaSetu.AI</h1>
  </div>
</Link>          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/saved" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nav.saved')}
            </Link>
            <Link to="/learn" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nav.learn')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label={t('nav.language')}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLangMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setShowLangMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === 'hi' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                    <Link
                      to="/saved"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{t('nav.saved')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
