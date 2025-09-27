import React, { useState } from "react";
import { ExternalLink, Code, Globe, Zap } from "lucide-react";

const IntegrationDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'iframe' | 'api'>('iframe');

    const iframeCode = `<iframe 
  src="https://yuvasetu.ai/widget/recommendations" 
  width="100%" 
  height="600" 
  frameborder="0"
  title="YuvaSetu.AI Recommendations">
</iframe>`;

    const apiExample = `// POST /api/recommend
{
  "education": "Graduate",
  "skills": ["JavaScript", "React", "Python"],
  "sectors": ["Technology", "Finance"],
  "location": "Mumbai, Maharashtra"
}

// Response
{
  "success": true,
  "recommendations": [
    {
      "id": "2",
      "title": "Software Development Intern",
      "company": "InnovateTech Solutions",
      "matchScore": 88,
      "sector": "Technology",
      "location": "Bangalore, Karnataka",
      "duration": "6 months",
      "stipend": "₹20,000/month"
    }
  ],
  "count": 5
}`;

    return (
        <section className="bg-govt-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-govt-4xl lg:text-govt-5xl font-bold text-govt-blue-800 mb-4">
                        Integration Options
                    </h2>
                    <p className="text-govt-xl text-gray-700 font-medium">
                        Integrate YuvaSetu.AI recommendations into your platform
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Integration Methods */}
                    <div className="space-y-6">
                        <div className="card-govt p-8">
                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={() => setActiveTab('iframe')}
                                    className={`px-6 py-3 rounded-lg font-semibold text-govt-base border-2 transition-all ${
                                        activeTab === 'iframe'
                                            ? 'bg-govt-orange-500 text-white border-govt-orange-500'
                                            : 'bg-white text-govt-blue-600 border-govt-blue-300 hover:bg-govt-blue-50'
                                    }`}
                                >
                                    <Globe className="w-5 h-5 inline-block mr-2" />
                                    iframe Widget
                                </button>
                                <button
                                    onClick={() => setActiveTab('api')}
                                    className={`px-6 py-3 rounded-lg font-semibold text-govt-base border-2 transition-all ${
                                        activeTab === 'api'
                                            ? 'bg-govt-orange-500 text-white border-govt-orange-500'
                                            : 'bg-white text-govt-blue-600 border-govt-blue-300 hover:bg-govt-blue-50'
                                    }`}
                                >
                                    <Code className="w-5 h-5 inline-block mr-2" />
                                    REST API
                                </button>
                            </div>

                            {activeTab === 'iframe' ? (
                                <div>
                                    <h3 className="text-govt-2xl font-bold text-govt-blue-800 mb-4">
                                        iframe Integration
                                    </h3>
                                    <p className="text-gray-700 mb-6 font-medium">
                                        Embed our recommendation widget directly into your website with a simple iframe tag.
                                    </p>
                                    
                                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                                        <pre className="text-green-400 text-sm overflow-x-auto">
                                            <code>{iframeCode}</code>
                                        </pre>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">Quick Setup</h4>
                                                <p className="text-govt-sm text-gray-600">Just copy and paste the iframe code</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">Responsive Design</h4>
                                                <p className="text-govt-sm text-gray-600">Automatically adapts to your site's design</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">No Backend Required</h4>
                                                <p className="text-govt-sm text-gray-600">Works with any website or CMS</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-govt-2xl font-bold text-govt-blue-800 mb-4">
                                        REST API Integration
                                    </h3>
                                    <p className="text-gray-700 mb-6 font-medium">
                                        Integrate our recommendation engine into your backend systems using our REST API.
                                    </p>
                                    
                                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                                        <pre className="text-green-400 text-sm overflow-x-auto">
                                            <code>{apiExample}</code>
                                        </pre>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">Full Control</h4>
                                                <p className="text-govt-sm text-gray-600">Customize the recommendation experience</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">Real-time Data</h4>
                                                <p className="text-govt-sm text-gray-600">Get live recommendations via API calls</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <Zap className="w-5 h-5 text-govt-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-govt-blue-800">Scalable</h4>
                                                <p className="text-govt-sm text-gray-600">Handle high-volume requests efficiently</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Integration Flow Diagram */}
                    <div className="card-govt p-8">
                        <h3 className="text-govt-2xl font-bold text-govt-blue-800 mb-6">
                            Integration Flow
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-govt-blue-500 rounded-full flex items-center justify-center text-white font-bold text-govt-lg">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-semibold text-govt-blue-800">PM Portal Integration</h4>
                                    <p className="text-govt-sm text-gray-600">Your PM Internship portal calls our API or embeds our widget</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-govt-orange-500 rounded-full flex items-center justify-center text-white font-bold text-govt-lg">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-semibold text-govt-blue-800">Data Processing</h4>
                                    <p className="text-govt-sm text-gray-600">YuvaSetu.AI processes user profile and preferences</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-govt-green rounded-full flex items-center justify-center text-white font-bold text-govt-lg">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-semibold text-govt-blue-800">AI Recommendations</h4>
                                    <p className="text-govt-sm text-gray-600">Our rule-based engine matches internships to user profile</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-govt-blue-600 rounded-full flex items-center justify-center text-white font-bold text-govt-lg">
                                    4
                                </div>
                                <div>
                                    <h4 className="font-semibold text-govt-blue-800">Results Delivery</h4>
                                    <p className="text-govt-sm text-gray-600">Personalized recommendations are returned to your portal</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-govt-blue-50 rounded-lg border-2 border-govt-blue-200">
                            <h4 className="font-semibold text-govt-blue-800 mb-2">API Endpoints</h4>
                            <div className="space-y-2 text-govt-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="bg-govt-green text-white px-2 py-1 rounded text-xs font-bold">GET</span>
                                    <code className="text-govt-blue-800">/api/health</code>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-govt-orange-500 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                                    <code className="text-govt-blue-800">/api/recommend</code>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="bg-govt-blue-500 text-white px-2 py-1 rounded text-xs font-bold">GET</span>
                                    <code className="text-govt-blue-800">/api/internships</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://github.com/yuvasetu-ai/api-docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-govt-primary text-govt-lg px-8 py-4 inline-flex items-center space-x-2"
                    >
                        <ExternalLink className="w-5 h-5" />
                        <span>View API Documentation</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default IntegrationDemo;