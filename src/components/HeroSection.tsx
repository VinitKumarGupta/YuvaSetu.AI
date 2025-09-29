import React from "react";
import {
    ArrowRight,
    BookOpen,
    Users,
    Award,
    TrendingUp,
    Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/i18n";

interface HeroSectionProps {
    onStartJourney: () => void;
    isAuthenticated?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    onStartJourney,
    isAuthenticated = false,
}) => {
    const { t } = useI18n();
    const navigate = useNavigate();

    return (
        <section className="relative bg-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 10 0 L 0 0 0 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            {/* Government Pattern Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 opacity-10"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-orange-100 opacity-10"></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-100 opacity-10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Government Branding */}
                        <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-2 shadow-sm border border-gray-200 mb-8">
                            <div className="flex space-x-1">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <div className="w-3 h-3 rounded-full bg-white border-2 border-green-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                                PM Internship Scheme Initiative
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-6 leading-tight">
                            {t("hero.title")}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
                            {t("hero.subtitle")}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <button
                                onClick={onStartJourney}
                                className="group bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg flex items-center space-x-2"
                                aria-label={
                                    isAuthenticated
                                        ? t("hero.start")
                                        : "Login to Start"
                                }
                            >
                                <span>
                                    {isAuthenticated
                                        ? t("hero.start")
                                        : "Login to Start Journey"}
                                </span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate("/learn")}
                                className="group bg-white text-gray-800 px-8 py-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-bold text-lg flex items-center space-x-2"
                                aria-label={t("hero.learn")}
                            >
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <span>{t("hero.learn")}</span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            10K+
                                        </div>
                                        <div className="text-sm text-gray-700 font-medium">
                                            Active Internships
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Award className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">
                                            500+
                                        </div>
                                        <div className="text-sm text-gray-700 font-medium">
                                            Partner Companies
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            95%
                                        </div>
                                        <div className="text-sm text-gray-700 font-medium">
                                            Success Rate
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-orange-600">
                                            50K+
                                        </div>
                                        <div className="text-sm text-gray-700 font-medium">
                                            Students Placed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual Elements */}
                    <div className="relative">
                        {/* PM Modi Image */}
                        <div className="relative bg-white rounded-lg p-8 border-2 border-blue-200 shadow-lg">
                            <div className="text-center">
                                <img
                                    src="/modi.png"
                                    alt="PM Narendra Modi"
                                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-lg border-4 border-white"
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    PM Narendra Modi
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Empowering Youth Through Digital India
                                </p>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <p className="text-sm text-gray-700 italic">
                                        "Digital India is not just a vision,
                                        it's a mission to empower every citizen
                                        with technology."
                                    </p>
                                </div>
                            </div>

                            {/* Government Icons */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">💡</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🚀</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
