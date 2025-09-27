import React, { useState, useRef, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import OnboardingForm from "../components/OnboardingForm";
import RecommendationResults from "../components/RecommendationResults";
import SmartRecommendations from "../components/SmartRecommendations";
import ProgressTracker from "../components/ProgressTracker";
import { isAuthenticated } from "../lib/auth";

interface OnboardingData {
    age: string;
    education: string;
    skills: string[];
    sectors: string[];
    location: string;
}

const Home: React.FC = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const onboardingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // This will re-check authentication status when the component mounts or user navigates
        setIsLoggedIn(isAuthenticated());
    }, []);

    const handleStartJourney = () => {
        setShowOnboarding(true);
        setTimeout(() => {
            onboardingRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleOnboardingComplete = async (data: OnboardingData) => {
        setIsLoading(true);
        setOnboardingData(data);

        // Simulate processing with loading state
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setShowResults(true);

        // Scroll to results
        setTimeout(() => {
            const resultsElement = document.getElementById("results");
            resultsElement?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-white">
            <main id="main">
                <HeroSection onStartJourney={handleStartJourney} />

                {showOnboarding && (
                    <div ref={onboardingRef}>
                        <OnboardingForm onComplete={handleOnboardingComplete} />
                    </div>
                )}

                {isLoading && (
                    <section className="bg-gray-50 py-20">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <div className="bg-white rounded-2xl shadow-xl p-12">
                                <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    🤖 AI is analyzing your profile...
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    Finding the best internship matches for you
                                </p>

                                {/* Loading Progress */}
                                <div className="max-w-md mx-auto">
                                    <div className="bg-gray-200 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
                                            style={{ width: "75%" }}
                                        ></div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Matching skills and analyzing
                                        opportunities...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {showResults && onboardingData && (
                    <div id="results">
                        <RecommendationResults data={onboardingData} />
                    </div>
                )}

                {/* Smart Recommendations Section - only shown if logged in */}
                {isLoggedIn && !showOnboarding && !showResults && (
                    <section className="bg-gray-50 py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                <SmartRecommendations />
                                <ProgressTracker />
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Home;
