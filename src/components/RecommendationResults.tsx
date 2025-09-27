import React, { useState } from "react";
import {
    ExternalLink,
    Bookmark,
    Share2,
    Download,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    BookOpen,
    Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/i18n";
import { mockInternships, Internship } from "../data/mockData";
import {
    saveInternship,
    unsaveInternship,
    isInternshipSaved,
} from "../lib/storage";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface OnboardingData {
    education: string;
    skills: string[];
    sectors: string[];
    location: string;
}

interface RecommendationResultsProps {
    data: OnboardingData;
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({
    data,
}) => {
    const { t } = useI18n();
    const [savedStates, setSavedStates] = useState<{ [key: string]: boolean }>(
        {}
    );

    // Filter and score internships based on user data
    const getRecommendations = (): Internship[] => {
        return mockInternships
            .map((internship) => {
                let score = 0;
                let matchedSkills: string[] = [];

                // Skill matching (40% weight)
                const skillMatches = internship.skills.filter((skill) =>
                    data.skills.some(
                        (userSkill) =>
                            userSkill
                                .toLowerCase()
                                .includes(skill.toLowerCase()) ||
                            skill
                                .toLowerCase()
                                .includes(userSkill.toLowerCase())
                    )
                );
                matchedSkills = skillMatches;
                score += (skillMatches.length / internship.skills.length) * 40;

                // Sector matching (30% weight)
                if (data.sectors.includes(internship.sector)) {
                    score += 30;
                }

                // Location matching (20% weight)
                if (internship.location.includes(data.location.split(",")[0])) {
                    score += 20;
                }

                // Education level bonus (10% weight)
                score += 10; // Base score for all internships

                return {
                    ...internship,
                    matchScore: Math.min(Math.round(score), 95),
                    matchReason: {
                        skills: matchedSkills,
                        sector: internship.sector,
                    },
                };
            })
            .filter((internship) => internship.matchScore > 30)
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);
    };

    const recommendations = getRecommendations();

    // Identify skill gaps
    const getSkillGaps = (): string[] => {
        const allRecommendedSkills = mockInternships.flatMap((i) => i.skills);
        const uniqueSkills = [...new Set(allRecommendedSkills)];
        return uniqueSkills
            .filter(
                (skill) =>
                    !data.skills.some(
                        (userSkill) =>
                            userSkill
                                .toLowerCase()
                                .includes(skill.toLowerCase()) ||
                            skill
                                .toLowerCase()
                                .includes(userSkill.toLowerCase())
                    )
            )
            .slice(0, 6);
    };

    const skillGaps = getSkillGaps();

    const handleSaveToggle = (internshipId: string) => {
        const currentlySaved = isInternshipSaved(internshipId);
        if (currentlySaved) {
            unsaveInternship(internshipId);
        } else {
            saveInternship(internshipId);
        }
        setSavedStates((prev) => ({
            ...prev,
            [internshipId]: !currentlySaved,
        }));
    };

    const handleShare = async (internship: Internship) => {
        const shareData = {
            title: internship.title,
            text: `Check out this internship: ${internship.title} at ${internship.company}`,
            url: `${window.location.origin}/details/${internship.id}`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                // Fallback to WhatsApp
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    `${shareData.text} - ${shareData.url}`
                )}`;
                window.open(whatsappUrl, "_blank");
            }
        } else {
            // Fallback to WhatsApp
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                `${shareData.text} - ${shareData.url}`
            )}`;
            window.open(whatsappUrl, "_blank");
        }
    };

    const handleDownloadPDF = async (internship: Internship) => {
        // Create a temporary div with internship details
        const tempDiv = document.createElement("div");
        tempDiv.style.padding = "40px";
        tempDiv.style.backgroundColor = "white";
        tempDiv.style.width = "800px";
        tempDiv.style.fontFamily = "Arial, sans-serif";
        tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0A4D8C; margin-bottom: 10px;">${
            internship.title
        }</h1>
        <h2 style="color: #666; margin-bottom: 20px;">${internship.company}</h2>
        <div style="display: inline-block; background: #f0f9ff; padding: 10px 20px; border-radius: 20px; margin-bottom: 20px;">
          <strong style="color: #0A4D8C;">Match Score: ${
              internship.matchScore
          }%</strong>
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0A4D8C; border-bottom: 2px solid #0A4D8C; padding-bottom: 5px;">Details</h3>
        <p><strong>Sector:</strong> ${internship.sector}</p>
        <p><strong>Location:</strong> ${internship.location}</p>
        <p><strong>Duration:</strong> ${internship.duration}</p>
        <p><strong>Stipend:</strong> ${internship.stipend}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0A4D8C; border-bottom: 2px solid #0A4D8C; padding-bottom: 5px;">Description</h3>
        <p>${internship.description}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0A4D8C; border-bottom: 2px solid #0A4D8C; padding-bottom: 5px;">Required Skills</h3>
        <p>${internship.skills.join(", ")}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #0A4D8C; border-bottom: 2px solid #0A4D8C; padding-bottom: 5px;">Requirements</h3>
        <ul>
          ${internship.requirements.map((req) => `<li>${req}</li>`).join("")}
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 14px;">Generated by YuvaSetu.AI - PM Internship Scheme Initiative</p>
        <p style="color: #666; font-size: 12px;">Visit: www.yuvasetu.ai</p>
      </div>
    `;

        document.body.appendChild(tempDiv);

        try {
            const canvas = await html2canvas(tempDiv, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${internship.title.replace(/\s+/g, "_")}_Internship.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        } finally {
            document.body.removeChild(tempDiv);
        }
    };

    const MatchMeter: React.FC<{ score: number }> = ({ score }) => (
        <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${
                        score >= 90
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : score >= 75
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                            : score >= 60
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-gray-400 to-gray-500"
                    }`}
                    style={{ width: `${score}%` }}
                />
            </div>
            <span className="text-sm font-bold text-gray-700 min-w-[3rem]">
                {score}%
            </span>
        </div>
    );

    if (recommendations.length === 0) {
        return (
            <section className="bg-govt-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="card-govt p-12">
                        <div className="card-govt-header">
                            <BookOpen className="w-16 h-16 text-govt-orange-500 mx-auto mb-6" />
                            <h3 className="text-govt-3xl font-bold text-govt-blue-800 mb-4">
                                {t("rec.skillgap.title")}
                            </h3>
                            <p className="text-govt-lg text-gray-700 mb-8 font-medium">
                                {t("rec.skillgap.subtitle")}
                            </p>
                        </div>
                        <div className="card-govt-body">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                {skillGaps.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-govt-orange-50 p-3 rounded-lg border-2 border-govt-orange-200"
                                    >
                                        <span className="text-govt-sm font-semibold text-govt-orange-800">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/learn"
                                className="btn-govt-primary text-govt-lg px-8 py-4 inline-flex items-center space-x-2"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>{t("rec.skillgap.cta")}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-govt-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-govt-4xl lg:text-govt-5xl font-bold text-govt-blue-800 mb-4">
                        {t("rec.title")}
                    </h2>
                    <p className="text-govt-xl text-gray-700 font-medium">{t("rec.subtitle")}</p>
                </div>

                <div className="grid gap-8">
                    {recommendations.map((internship, index) => {
                        const isSaved =
                            savedStates[internship.id] ??
                            isInternshipSaved(internship.id);

                        return (
                            <div
                                key={internship.id}
                                className="card-govt p-6 sm:p-8"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                                    {/* Main Content */}
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                                <div>
                                                    <h3 className="text-govt-xl sm:text-govt-2xl font-bold text-govt-blue-800 mb-2">
                                                        {internship.title}
                                                    </h3>
                                                    <p className="text-govt-lg sm:text-govt-xl text-gray-700 font-semibold">
                                                        {internship.company}
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0 mt-2 sm:mt-0 items-center space-x-2 bg-govt-blue-50 px-4 py-2 rounded-lg border-2 border-govt-blue-200">
                                                    <TrendingUp className="w-4 h-4 text-govt-blue-600 inline-block" />
                                                    <span className="text-govt-sm font-bold text-govt-blue-600">
                                                        #{index + 1}{" "}
                                                        {t("rec.match")}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Match Score */}
                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-govt-sm font-semibold text-gray-700">
                                                        {t("rec.match")} Score
                                                    </span>
                                                    <span className="text-govt-sm font-bold text-govt-blue-800">
                                                        {internship.matchScore}%
                                                    </span>
                                                </div>
                                                <MatchMeter
                                                    score={
                                                        internship.matchScore
                                                    }
                                                />
                                            </div>

                                            {/* AI Insight */}
                                            <div className="bg-govt-blue-50 rounded-lg p-4 mb-6 border-2 border-govt-blue-200">
                                                <p className="text-govt-blue-800 text-govt-sm font-medium">
                                                    <span className="font-bold">
                                                        🤖 AI Insight:{" "}
                                                    </span>
                                                    {t("rec.insight")}{" "}
                                                    <strong>
                                                        {internship.matchReason.skills.join(
                                                            ", "
                                                        )}
                                                    </strong>{" "}
                                                    {t("rec.and")}{" "}
                                                    <strong>
                                                        {
                                                            internship
                                                                .matchReason
                                                                .sector
                                                        }
                                                    </strong>
                                                    .
                                                </p>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-5 h-5 text-govt-blue-600 flex-shrink-0" />
                                                    <span className="text-govt-sm text-gray-700 font-medium">
                                                        {internship.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="w-5 h-5 text-govt-blue-600 flex-shrink-0" />
                                                    <span className="text-govt-sm text-gray-700 font-medium">
                                                        {internship.duration}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <DollarSign className="w-5 h-5 text-govt-blue-600 flex-shrink-0" />
                                                    <span className="text-govt-sm text-gray-700 font-medium">
                                                        {internship.stipend}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <div className="mb-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {internship.skills.map(
                                                        (skill, skillIndex) => {
                                                            const isMatched =
                                                                internship.matchReason.skills.includes(
                                                                    skill
                                                                );
                                                            return (
                                                                <span
                                                                    key={
                                                                        skillIndex
                                                                    }
                                                                    className={`inline-flex items-center px-3 py-1 rounded-lg text-govt-sm font-semibold border-2 ${
                                                                        isMatched
                                                                            ? "bg-govt-green-100 text-govt-green border-govt-green"
                                                                            : "bg-govt-blue-50 text-govt-blue-800 border-govt-blue-200"
                                                                    }`}
                                                                >
                                                                    {isMatched && (
                                                                        <Check className="w-4 h-4 mr-1.5" />
                                                                    )}
                                                                    {skill}
                                                                </span>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-700 leading-relaxed font-medium">
                                                {internship.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col space-y-3 mt-6 md:mt-0 md:w-48">
                                        <a
                                            href="https://internship.gov.in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-govt-primary flex items-center justify-center space-x-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>{t("rec.apply")}</span>
                                        </a>

                                        <button
                                            onClick={() =>
                                                handleSaveToggle(internship.id)
                                            }
                                            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                                                isSaved
                                                    ? "border-govt-green text-govt-green bg-govt-green-50 hover:bg-govt-green-100"
                                                    : "border-govt-blue-300 text-govt-blue-700 hover:border-govt-blue-400 hover:bg-govt-blue-50"
                                            }`}
                                        >
                                            <Bookmark
                                                className={`w-4 h-4 ${
                                                    isSaved
                                                        ? "fill-current"
                                                        : ""
                                                }`}
                                            />
                                            <span>
                                                {isSaved
                                                    ? "Saved"
                                                    : t("rec.save")}
                                            </span>
                                        </button>

                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() =>
                                                    handleShare(internship)
                                                }
                                                className="flex items-center justify-center space-x-2 border-2 border-govt-blue-300 text-govt-blue-700 p-3 rounded-lg hover:border-govt-blue-400 hover:bg-govt-blue-50 transition-all font-semibold"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDownloadPDF(
                                                        internship
                                                    )
                                                }
                                                className="flex items-center justify-center space-x-2 border-2 border-govt-blue-300 text-govt-blue-700 p-3 rounded-lg hover:border-govt-blue-400 hover:bg-govt-blue-50 transition-all font-semibold"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>

                                            <Link
                                                to={`/details/${internship.id}`}
                                                className="flex items-center justify-center space-x-2 border-2 border-govt-orange-300 text-govt-orange-700 p-3 rounded-lg hover:border-govt-orange-400 hover:bg-govt-orange-50 transition-all font-semibold"
                                            >
                                                <span className="text-govt-xs font-bold">
                                                    VIEW
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Skill Gap Section */}
                {skillGaps.length > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Unlock More Opportunities
                            </h3>
                            <p className="text-gray-600">
                                Build these skills to access even better
                                internships:
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                            {skillGaps.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg border border-orange-200 text-center"
                                >
                                    <span className="text-sm font-medium text-gray-700">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link
                                to="/learn"
                                className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>{t("rec.skillgap.cta")}</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecommendationResults;
