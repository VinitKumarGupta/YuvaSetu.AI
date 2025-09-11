import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Bookmark, Globe } from "lucide-react";
import { useI18n } from "../i18n/i18n";
import { getUser, logout } from "../lib/auth";
import EligibilityCarousel from "./EligibilityCarousel";
import MobileNavigation from "./MobileNavigation";

const Header: React.FC = () => {
    const { t, language, setLanguage, languageNames, isTranslating } =
        useI18n();
    const navigate = useNavigate();
    const user = getUser();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate("/");
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-4 py-2">
                        <img
                            src="/logo.svg"
                            alt="MCA Logo"
                            className="h-10 w-auto sm:h-12 md:h-14 lg:h-14"
                        />
                        <div className="hidden sm:block pl-2">
                            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                                YuvaSetu.AI
                            </h1>
                        </div>
                    </Link>{" "}
                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            {t("nav.home")}
                        </Link>
                        <Link
                            to="/saved"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            {t("nav.saved")}
                        </Link>
                        <Link
                            to="/learn"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            {t("nav.learn")}
                        </Link>
                    </nav>
                    {/* Eligibility Carousel */}
                    <EligibilityCarousel />
                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Navigation */}
                        <MobileNavigation />
                        {/* Language Toggle */}
                        <div className="relative">
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                                aria-label={t("nav.language")}
                                disabled={isTranslating}
                            >
                                <Globe className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {isTranslating
                                        ? "..."
                                        : language.toUpperCase()}
                                </span>
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            {showLangMenu && (
                                <div className="absolute right-0 mt-2 w-48 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                                    {Object.entries(languageNames).map(
                                        ([code, name]) => (
                                            <button
                                                key={code}
                                                onClick={() => {
                                                    setLanguage(code as any);
                                                    setShowLangMenu(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                                                    language === code
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {name}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowUserMenu(!showUserMenu)
                                    }
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="hidden sm:block font-medium">
                                        {user.name}
                                    </span>
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                                        <Link
                                            to="/saved"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() =>
                                                setShowUserMenu(false)
                                            }
                                        >
                                            <Bookmark className="w-4 h-4" />
                                            <span>{t("nav.saved")}</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>{t("nav.logout")}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {t("nav.login")}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
