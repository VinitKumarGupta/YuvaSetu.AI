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
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
    const { t } = useI18n();
    const navigate = useNavigate();

    return (
        <section className="relative bg-govt-white overflow-hidden">
            {/* Government Pattern Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-govt-orange-500"></div>
                <div className="absolute top-2 left-0 w-full h-1 bg-govt-blue-500"></div>
                <div className="absolute top-3 left-0 w-full h-1 bg-govt-green"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Government Branding */}
                        <div className="inline-flex items-center space-x-3 bg-govt-blue-50 rounded-lg px-6 py-3 shadow-govt border-2 border-govt-blue-200 mb-8">
                            <div className="flex space-x-2">
                                <div className="w-4 h-4 rounded-full bg-govt-orange-500"></div>
                                <div className="w-4 h-4 rounded-full bg-govt-white border-2 border-govt-blue-500"></div>
                                <div className="w-4 h-4 rounded-full bg-govt-green"></div>
                            </div>
                            <span className="text-govt-sm text-govt-blue-800 font-semibold">
                                PM Internship Scheme Initiative
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-govt-4xl sm:text-govt-5xl lg:text-govt-6xl font-bold text-govt-blue-800 mb-6 leading-tight">
                            {t("hero.title")}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-govt-xl sm:text-govt-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
                            {t("hero.subtitle")}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <button
                                onClick={onStartJourney}
                                className="btn-govt-primary text-govt-lg px-8 py-4 flex items-center space-x-2"
                                aria-label={t("hero.start")}
                            >
                                <span>{t("hero.start")}</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => navigate("/learn")}
                                className="btn-govt-outline text-govt-lg px-8 py-4 flex items-center space-x-2"
                                aria-label={t("hero.learn")}
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>{t("hero.learn")}</span>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <div className="card-govt p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-govt-blue-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-govt-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-govt-2xl font-bold text-govt-blue-600">
                                            10K+
                                        </div>
                                        <div className="text-govt-sm text-gray-600 font-medium">
                                            Active Internships
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-govt p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-govt-green-100 rounded-lg flex items-center justify-center">
                                        <Award className="w-5 h-5 text-govt-green" />
                                    </div>
                                    <div>
                                        <div className="text-govt-2xl font-bold text-govt-green">
                                            500+
                                        </div>
                                        <div className="text-govt-sm text-gray-600 font-medium">
                                            Partner Companies
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-govt p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-govt-orange-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-govt-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-govt-2xl font-bold text-govt-orange-600">
                                            95%
                                        </div>
                                        <div className="text-govt-sm text-gray-600 font-medium">
                                            Success Rate
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-govt p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-govt-blue-100 rounded-lg flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-govt-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-govt-2xl font-bold text-govt-blue-600">
                                            50K+
                                        </div>
                                        <div className="text-govt-sm text-gray-600 font-medium">
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
                        <div className="relative card-govt p-8">
                            <div className="text-center">
                                <img
                                    src="/modi.png"
                                    alt="PM Narendra Modi"
                                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-govt border-4 border-govt-orange-500"
                                />
                                <h3 className="text-govt-xl font-bold text-govt-blue-800 mb-2">
                                    PM Narendra Modi
                                </h3>
                                <p className="text-govt-base text-gray-700 mb-4 font-medium">
                                    Empowering Youth Through Digital India
                                </p>
                                <div className="bg-govt-blue-50 rounded-lg p-4 border-2 border-govt-blue-200">
                                    <p className="text-govt-sm text-govt-blue-800 italic font-medium">
                                        "Digital India is not just a vision,
                                        it's a mission to empower every citizen
                                        with technology."
                                    </p>
                                </div>
                            </div>

                            {/* Government Icons */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-govt-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">💡</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-govt-orange-500 rounded-full flex items-center justify-center">
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
