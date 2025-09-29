import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import OnboardingForm from "../components/OnboardingForm";
import RecommendationResults from "../components/RecommendationResults";
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onboardingRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication status on component mount
        setIsLoggedIn(isAuthenticated());
    }, []);

    const handleStartJourney = () => {
        if (!isLoggedIn) {
            // Redirect to login if not authenticated
            navigate("/login");
            return;
        }

        setShowOnboarding(true);
        setTimeout(() => {
            onboardingRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleOnboardingComplete = async (data: OnboardingData) => {
        setOnboardingData(data);
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
                <HeroSection
                    onStartJourney={handleStartJourney}
                    isAuthenticated={isLoggedIn}
                />

                {showOnboarding && isLoggedIn && (
                    <div ref={onboardingRef}>
                        <OnboardingForm onComplete={handleOnboardingComplete} />
                    </div>
                )}

                {showResults && onboardingData && isLoggedIn && (
                    <div id="results">
                        <RecommendationResults data={onboardingData} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
