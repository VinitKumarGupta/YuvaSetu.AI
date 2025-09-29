import React from "react";
import {
    CheckCircle,
    Users,
    Calendar,
    GraduationCap,
    MapPin,
    Award,
    Building,
} from "lucide-react";

const eligibilityItems = [
    {
        icon: <Users className="w-5 h-5" />,
        text: "Age: 21-24 years • Graduate or pursuing graduation",
    },
    {
        icon: <GraduationCap className="w-5 h-5" />,
        text: "Skills: Basic digital literacy • Communication skills",
    },
    {
        icon: <Calendar className="w-5 h-5" />,
        text: "Duration: 3-6 months • Full-time internship opportunity",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        text: "Location: Pan India • Remote & On-site options available",
    },
    {
        icon: <Award className="w-5 h-5" />,
        text: "Benefits: Monthly stipend • Certificate • Work experience",
    },
    {
        icon: <Building className="w-5 h-5" />,
        text: "Sectors: Technology • Finance • Healthcare • Education • Marketing",
    },
    {
        icon: <CheckCircle className="w-5 h-5" />,
        text: "Apply now for PM Internship Scheme • Start your career journey",
    },
];

const EligibilityCarousel: React.FC = () => {
    return (
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 overflow-hidden">
            {/* Add CSS animation styles */}
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div className="relative">
                {/* Scrolling container */}
                <div className="flex animate-scroll whitespace-nowrap py-3">
                    {/* First set of items */}
                    {eligibilityItems.map((item, index) => (
                        <div
                            key={`first-${index}`}
                            className="flex items-center space-x-3 mx-8 flex-shrink-0"
                        >
                            <div className="text-blue-100 flex-shrink-0">
                                {item.icon}
                            </div>
                            <span className="text-white text-sm font-medium">
                                {item.text}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {eligibilityItems.map((item, index) => (
                        <div
                            key={`second-${index}`}
                            className="flex items-center space-x-3 mx-8 flex-shrink-0"
                        >
                            <div className="text-blue-100 flex-shrink-0">
                                {item.icon}
                            </div>
                            <span className="text-white text-sm font-medium">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-700 to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default EligibilityCarousel;
