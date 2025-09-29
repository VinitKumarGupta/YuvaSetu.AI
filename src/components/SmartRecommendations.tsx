import React, { useState, useEffect } from "react";
import {
    Brain,
    TrendingUp,
    MapPin,
    Clock,
    Star,
    Users,
    Award,
    AlertCircle,
} from "lucide-react";
import { apiService, InternshipRecommendation } from "../services/api";

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

interface SmartRecommendationsProps {
    userProfile?: {
        age: string;
        education: string;
        skills: string[];
        sectors: string[];
        location: string;
    };
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
    userProfile,
}) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Default profile for demo purposes
    const defaultProfile = {
        age: "22",
        education: "Graduate",
        skills: ["JavaScript", "Python", "Communication"],
        sectors: ["Technology", "Marketing"],
        location: "Mumbai, Maharashtra",
    };

    const profile = userProfile || defaultProfile;

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setIsLoading(true);
                setError(null);

                console.log(
                    "🔄 Fetching recommendations with profile:",
                    profile
                );

                const response = await apiService.getRecommendations(profile);

                // Convert API response to component format
                const convertedRecommendations: Recommendation[] =
                    response.recommendations.map(
                        (rec: InternshipRecommendation) => ({
                            id: rec.id,
                            title: rec.title,
                            company: rec.company,
                            location: rec.location,
                            duration: rec.duration,
                            stipend: rec.stipend,
                            matchScore: rec.match_score,
                            reasons: [
                                rec.match_reason.skills?.length > 0
                                    ? `Skills match: ${rec.match_reason.skills.join(
                                          ", "
                                      )}`
                                    : "",
                                rec.match_reason.sector
                                    ? `Sector preference: ${rec.match_reason.sector}`
                                    : "",
                                rec.match_reason.location
                                    ? `Location: ${rec.match_reason.location}`
                                    : "",
                            ].filter(Boolean),
                            skills: rec.skills,
                            category: rec.sector,
                            isRemote: rec.location
                                .toLowerCase()
                                .includes("remote"),
                            isUrgent: rec.match_score > 90,
                        })
                    );

                setRecommendations(convertedRecommendations);
                console.log(
                    "✅ Successfully loaded recommendations:",
                    convertedRecommendations.length
                );
            } catch (err) {
                console.error("❌ Failed to fetch recommendations:", err);
                setError("Failed to load recommendations. Please try again.");

                // Fallback to mock data for demo
                const mockRecommendations: Recommendation[] = [
                    {
                        id: "1",
                        title: "AI/ML Intern",
                        company: "TechCorp India",
                        location: "Bangalore",
                        duration: "6 months",
                        stipend: "₹25,000/month",
                        matchScore: 95,
                        reasons: [
                            "Your Python skills match perfectly",
                            "Location preference aligned",
                            "Recent graduate status",
                        ],
                        skills: ["Python", "Machine Learning", "Data Science"],
                        category: "Technology",
                        isRemote: false,
                        isUrgent: true,
                    },
                ];
                setRecommendations(mockRecommendations);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [profile]);

    const getMatchColor = (score: number) => {
        if (score >= 90) return "text-green-600 bg-green-100";
        if (score >= 80) return "text-blue-600 bg-blue-100";
        if (score >= 70) return "text-yellow-600 bg-yellow-100";
        return "text-gray-600 bg-gray-100";
    };

    const getMatchProgress = (score: number) => {
        if (score >= 90)
            return "bg-gradient-to-r from-green-500 to-emerald-600";
        if (score >= 80) return "bg-gradient-to-r from-blue-500 to-cyan-600";
        if (score >= 70)
            return "bg-gradient-to-r from-yellow-500 to-orange-500";
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    };

    // Enhanced loading skeleton component
    const RecommendationSkeleton = () => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 animate-pulse">
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="flex-1 space-y-6">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="flex-1">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="w-20 h-6 bg-gray-200 rounded-full mt-2 sm:mt-0"></div>
                        </div>
                        <div className="mb-6">
                            <div className="h-2 bg-gray-200 rounded-full w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="h-12 bg-gray-200 rounded-xl mb-6"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-6 bg-gray-200 rounded-full w-20"
                                ></div>
                            ))}
                        </div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 mt-6 md:mt-0 md:w-48">
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                    <div className="h-12 bg-gray-200 rounded-xl"></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 bg-gray-200 rounded-xl"></div>
                        <div className="h-12 bg-gray-200 rounded-xl"></div>
                        <div className="h-12 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const categories = [
        "all",
        "Technology",
        "Marketing",
        "Finance",
        "Healthcare",
        "Education",
    ];

    const filteredRecommendations =
        selectedCategory === "all"
            ? recommendations
            : recommendations.filter(
                  (rec) => rec.category === selectedCategory
              );

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        AI is analyzing your profile...
                    </h2>
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <RecommendationSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        Unable to load recommendations
                    </h2>
                </div>
                <p className="text-gray-600 text-center mb-6">{error}</p>
                <div className="text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                        AI-Powered Recommendations
                    </h2>
                </div>
                <div className="text-sm text-gray-500">
                    Based on your profile & preferences
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                            selectedCategory === category
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                        }`}
                    >
                        {category === "all" ? "All Categories" : category}
                    </button>
                ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-8">
                {filteredRecommendations.map((rec) => (
                    <div
                        key={rec.id}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {rec.title}
                                    </h3>
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
                                <p className="text-gray-600 font-medium">
                                    {rec.company}
                                </p>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(
                                    rec.matchScore
                                )}`}
                            >
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
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">
                                    Match Score
                                </span>
                                <span className="text-sm font-bold text-gray-800">
                                    {rec.matchScore}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${getMatchProgress(
                                        rec.matchScore
                                    )}`}
                                    style={{ width: `${rec.matchScore}%` }}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                Why this matches you:
                            </h4>
                            <ul className="space-y-1">
                                {rec.reasons.map((reason, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-2 text-sm text-gray-600"
                                    >
                                        <Star className="w-3 h-3 text-yellow-500" />
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {rec.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRecommendations.length === 0 && (
                <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No recommendations found
                    </h3>
                    <p className="text-gray-600">
                        Try selecting a different category or update your
                        profile.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SmartRecommendations;
