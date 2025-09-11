import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    MapPin,
    GraduationCap,
    Briefcase,
    Target,
} from "lucide-react";
import { useI18n } from "../i18n/i18n";
import {
    educationOptions,
    skillsData,
    sectorsData,
    locationOptions,
} from "../data/mockData";

interface OnboardingData {
    age: string;
    education: string;
    skills: string[];
    sectors: string[];
    location: string;
}

interface OnboardingFormProps {
    onComplete: (data: OnboardingData) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
    const { t } = useI18n();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<OnboardingData>({
        age: "",
        education: "",
        skills: [],
        sectors: [],
        location: "",
    });
    const [errors, setErrors] = useState<string[]>([]);

    const validateStep = (step: number): boolean => {
        const newErrors: string[] = [];

        switch (step) {
            case 1:
                if (!formData.age) newErrors.push("Please enter your age");
                else {
                    const age = parseInt(formData.age);
                    if (age < 21 || age > 24) {
                        newErrors.push(
                            "Age must be between 21-24 years for internship eligibility"
                        );
                    }
                }
                break;
            case 2:
                if (!formData.education)
                    newErrors.push(t("onboard.validation.education"));
                break;
            case 3:
                if (formData.skills.length === 0)
                    newErrors.push(t("onboard.validation.skills"));
                break;
            case 4:
                if (formData.sectors.length === 0)
                    newErrors.push(t("onboard.validation.sectors"));
                break;
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 5) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors([]);
        }
    };

    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            onComplete(formData);
        }
    };

    const updateFormData = (key: keyof OnboardingData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
        setErrors([]);
    };

    const toggleSkill = (skill: string) => {
        const updatedSkills = formData.skills.includes(skill)
            ? formData.skills.filter((s) => s !== skill)
            : [...formData.skills, skill];
        updateFormData("skills", updatedSkills);
    };

    const toggleSector = (sector: string) => {
        const updatedSectors = formData.sectors.includes(sector)
            ? formData.sectors.filter((s) => s !== sector)
            : [...formData.sectors, sector];
        updateFormData("sectors", updatedSectors);
    };

    const StepIndicator = () => (
        <div className="flex items-center mb-8">
            {[1, 2, 3, 4, 5].map((step, index, arr) => (
                <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${
                                step <= currentStep
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {step < currentStep ? (
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                step
                            )}
                        </div>
                    </div>
                    {index < arr.length - 1 && (
                        <div
                            className={`flex-grow h-1 transition-colors ${
                                step < currentStep
                                    ? "bg-blue-600"
                                    : "bg-gray-200"
                            }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <section id="onboarding" className="bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {t("onboard.title")}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600">
                            {t("onboard.subtitle")}
                        </p>
                    </div>

                    <StepIndicator />

                    {/* Error Display */}
                    {errors.length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            {errors.map((error, index) => (
                                <p key={index} className="text-red-700 text-sm">
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="min-h-[350px]">
                        {/* Step 1: Age Verification */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🎂</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Age Verification
                                    </h3>
                                    <p className="text-gray-600">
                                        Please enter your age to verify
                                        internship eligibility
                                    </p>
                                </div>

                                <div className="max-w-md mx-auto">
                                    <input
                                        type="number"
                                        min="18"
                                        max="30"
                                        value={formData.age}
                                        onChange={(e) =>
                                            updateFormData(
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your age"
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg text-center"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 text-center">
                                        Internship portal is only for ages 21-24
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Education */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <GraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t("onboard.step1.title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("onboard.step1.subtitle")}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                    {educationOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() =>
                                                updateFormData(
                                                    "education",
                                                    option
                                                )
                                            }
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                formData.education === option
                                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                            }`}
                                        >
                                            <span className="font-medium">
                                                {option}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Skills */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <Briefcase className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t("onboard.step2.title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("onboard.step2.subtitle")}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
                                    {skillsData.map((skill) => (
                                        <button
                                            key={skill.name}
                                            onClick={() =>
                                                toggleSkill(skill.name)
                                            }
                                            className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                                                formData.skills.includes(
                                                    skill.name
                                                )
                                                    ? "border-green-600 bg-green-50 text-green-700"
                                                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                                            }`}
                                        >
                                            <div className="text-2xl mb-2">
                                                {skill.icon}
                                            </div>
                                            <div className="font-medium text-xs sm:text-sm">
                                                {skill.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {formData.skills.length > 0 && (
                                    <div className="text-center text-sm text-gray-600">
                                        Selected: {formData.skills.length}{" "}
                                        skills
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Sectors */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t("onboard.step3.title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("onboard.step3.subtitle")}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                    {sectorsData.map((sector) => (
                                        <button
                                            key={sector.name}
                                            onClick={() =>
                                                toggleSector(sector.name)
                                            }
                                            className={`p-4 sm:p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                                                formData.sectors.includes(
                                                    sector.name
                                                )
                                                    ? "border-purple-600 bg-purple-50 text-purple-700"
                                                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                                            }`}
                                        >
                                            <div className="text-2xl sm:text-3xl mb-3">
                                                {sector.icon}
                                            </div>
                                            <div className="font-semibold text-xs sm:text-sm">
                                                {sector.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 5: Location */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t("onboard.step4.title")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("onboard.step4.subtitle")}
                                    </p>
                                </div>

                                <div className="max-w-md mx-auto">
                                    <select
                                        value={formData.location}
                                        onChange={(e) =>
                                            updateFormData(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-lg"
                                    >
                                        <option value="">
                                            Select your preferred location
                                        </option>
                                        {locationOptions.map((location) => (
                                            <option
                                                key={location}
                                                value={location}
                                            >
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-12">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                                currentStep === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>{t("onboard.back")}</span>
                        </button>

                        <div className="text-sm text-gray-500">
                            Step {currentStep} of 5
                        </div>

                        {currentStep < 5 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                            >
                                <span>{t("onboard.next")}</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
                            >
                                <span>{t("onboard.submit")}</span>
                                <Target className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnboardingForm;
