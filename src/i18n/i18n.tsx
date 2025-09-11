import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.saved': 'Saved',
    'nav.learn': 'Learn',
    'nav.login': 'Login',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.language': 'Language',
    
    // Hero
    'hero.title': 'YuvaSetu.AI – Bridging Youth to the Right Opportunities',
    'hero.subtitle': 'Find internships that match your skills, interests, and dreams.',
    'hero.start': 'Start Your Journey',
    'hero.learn': 'Learn More',
    
    // Onboarding
    'onboard.title': 'Tell us about yourself',
    'onboard.subtitle': 'Help us find the perfect internship opportunities for you',
    'onboard.step1.title': 'Education Background',
    'onboard.step1.subtitle': 'What is your current education level?',
    'onboard.step2.title': 'Skills & Expertise',
    'onboard.step2.subtitle': 'Select skills you have or want to develop',
    'onboard.step3.title': 'Sector Interests',
    'onboard.step3.subtitle': 'Which sectors interest you the most?',
    'onboard.step4.title': 'Location Preference',
    'onboard.step4.subtitle': 'Where would you like to work?',
    'onboard.next': 'Next',
    'onboard.back': 'Back',
    'onboard.submit': 'Find Internships',
    'onboard.validation.education': 'Please select your education level',
    'onboard.validation.skills': 'Please select at least one skill',
    'onboard.validation.sectors': 'Please select at least one sector',
    
    // Recommendations
    'rec.title': 'Recommended Internships for You',
    'rec.subtitle': 'Based on your profile, here are the best matches:',
    'rec.match': 'Match',
    'rec.duration': 'Duration',
    'rec.stipend': 'Stipend',
    'rec.apply': 'Apply Now',
    'rec.save': 'Save',
    'rec.share': 'Share',
    'rec.download': 'Download PDF',
    'rec.insight': 'Matched because of your expertise in',
    'rec.and': 'and interest in',
    'rec.skillgap.title': 'No Perfect Matches Yet',
    'rec.skillgap.subtitle': 'Build these skills to unlock more opportunities:',
    'rec.skillgap.cta': 'Explore Learning Resources',
    
    // Auth
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to continue your journey',
    'auth.signup.title': 'Join YuvaSetu.AI',
    'auth.signup.subtitle': 'Start your internship journey today',
    'auth.phone': 'Phone Number',
    'auth.email': 'Email Address',
    'auth.name': 'Full Name',
    'auth.otp': 'Enter OTP',
    'auth.send': 'Send OTP',
    'auth.verify': 'Verify & Continue',
    'auth.switch.login': 'Already have an account? Sign in',
    'auth.switch.signup': 'Don\'t have an account? Sign up',
    
    // Saved
    'saved.title': 'Saved Internships',
    'saved.subtitle': 'Your bookmarked opportunities',
    'saved.empty.title': 'No saved internships yet',
    'saved.empty.subtitle': 'Start exploring internships and save the ones you like',
    'saved.empty.cta': 'Explore Internships',
    'saved.unsave': 'Unsave',
    
    // Learn
    'learn.title': 'Free Learning Resources',
    'learn.subtitle': 'Upgrade your skills with these curated resources',
    'learn.visit': 'Visit Resource',
    
    // Footer
    'footer.copyright': '© 2025 YuvaSetu.AI - PM Internship Scheme Initiative',
    'footer.tagline': 'Bridging Youth to the Right Opportunities',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.success': 'Success!',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View Details',
  },
  hi: {
    // Header
    'nav.home': 'होम',
    'nav.saved': 'सेव्ड',
    'nav.learn': 'सीखें',
    'nav.login': 'लॉगिन',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.logout': 'लॉगआउट',
    'nav.language': 'भाषा',
    
    // Hero
    'hero.title': 'युवासेतु.AI – युवाओं को सही अवसरों से जोड़ना',
    'hero.subtitle': 'ऐसी इंटर्नशिप खोजें जो आपके कौशल, रुचियों और सपनों से मेल खाती हों।',
    'hero.start': 'अपनी यात्रा शुरू करें',
    'hero.learn': 'और जानें',
    
    // Onboarding
    'onboard.title': 'हमें अपने बारे में बताएं',
    'onboard.subtitle': 'आपके लिए सही इंटर्नशिप अवसर खोजने में हमारी मदद करें',
    'onboard.step1.title': 'शैक्षणिक पृष्ठभूमि',
    'onboard.step1.subtitle': 'आपका वर्तमान शिक्षा स्तर क्या है?',
    'onboard.step2.title': 'कौशल और विशेषज्ञता',
    'onboard.step2.subtitle': 'आपके पास जो कौशल हैं या विकसित करना चाहते हैं उन्हें चुनें',
    'onboard.step3.title': 'क्षेत्रीय रुचियां',
    'onboard.step3.subtitle': 'कौन से क्षेत्र आपको सबसे ज्यादा दिलचस्प लगते हैं?',
    'onboard.step4.title': 'स्थान की प्राथमिकता',
    'onboard.step4.subtitle': 'आप कहां काम करना चाहेंगे?',
    'onboard.next': 'आगे',
    'onboard.back': 'पीछे',
    'onboard.submit': 'इंटर्नशिप खोजें',
    'onboard.validation.education': 'कृपया अपना शिक्षा स्तर चुनें',
    'onboard.validation.skills': 'कृपया कम से कम एक कौशल चुनें',
    'onboard.validation.sectors': 'कृपया कम से कम एक क्षेत्र चुनें',
    
    // Recommendations
    'rec.title': 'आपके लिए अनुशंसित इंटर्नशिप',
    'rec.subtitle': 'आपकी प्रोफ़ाइल के आधार पर, यहां सबसे अच्छे मैच हैं:',
    'rec.match': 'मैच',
    'rec.duration': 'अवधि',
    'rec.stipend': 'वेतन',
    'rec.apply': 'अभी आवेदन करें',
    'rec.save': 'सेव करें',
    'rec.share': 'साझा करें',
    'rec.download': 'PDF डाउनलोड करें',
    'rec.insight': 'मैच हुआ क्योंकि आपकी विशेषज्ञता है',
    'rec.and': 'और रुचि है',
    'rec.skillgap.title': 'अभी तक कोई परफेक्ट मैच नहीं',
    'rec.skillgap.subtitle': 'अधिक अवसरों को अनलॉक करने के लिए इन कौशलों का निर्माण करें:',
    'rec.skillgap.cta': 'सीखने के संसाधन देखें',
    
    // Auth
    'auth.login.title': 'वापस स्वागत है',
    'auth.login.subtitle': 'अपनी यात्रा जारी रखने के लिए साइन इन करें',
    'auth.signup.title': 'युवासेतु.AI में शामिल हों',
    'auth.signup.subtitle': 'आज ही अपनी इंटर्नशिप यात्रा शुरू करें',
    'auth.phone': 'फ़ोन नंबर',
    'auth.email': 'ईमेल पता',
    'auth.name': 'पूरा नाम',
    'auth.otp': 'OTP दर्ज करें',
    'auth.send': 'OTP भेजें',
    'auth.verify': 'सत्यापित करें और जारी रखें',
    'auth.switch.login': 'पहले से खाता है? साइन इन करें',
    'auth.switch.signup': 'खाता नहीं है? साइन अप करें',
    
    // Saved
    'saved.title': 'सेव की गई इंटर्नशिप',
    'saved.subtitle': 'आपके बुकमार्क किए गए अवसर',
    'saved.empty.title': 'अभी तक कोई सेव की गई इंटर्नशिप नहीं',
    'saved.empty.subtitle': 'इंटर्नशिप खोजना शुरू करें और पसंदीदा को सेव करें',
    'saved.empty.cta': 'इंटर्नशिप खोजें',
    'saved.unsave': 'अनसेव करें',
    
    // Learn
    'learn.title': 'निःशुल्क शिक्षण संसाधन',
    'learn.subtitle': 'इन क्यूरेटेड संसाधनों के साथ अपने कौशल को अपग्रेड करें',
    'learn.visit': 'संसाधन देखें',
    
    // Footer
    'footer.copyright': '© 2025 युवासेतु.AI - प्रधानमंत्री इंटर्नशिप योजना पहल',
    'footer.tagline': 'युवाओं को सही अवसरों से जोड़ना',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ',
    'common.success': 'सफल!',
    'common.close': 'बंद करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.delete': 'मिटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'विवरण देखें',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ys_language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('ys_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};