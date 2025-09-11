import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Saved from './pages/Saved';
import Learn from './pages/Learn';
import InternshipDetails from './pages/InternshipDetails';
import NotFound from './pages/NotFound';
import AccessibilityFeatures from './components/AccessibilityFeatures';

function App() {
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const handleTextToSpeech = (text: string) => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleStopSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  return (
    <I18nProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/details/:id" element={<InternshipDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <AccessibilityFeatures 
            onTextToSpeech={handleTextToSpeech}
            onStopSpeech={handleStopSpeech}
          />
        </div>
      </Router>
    </I18nProvider>
  );
}

export default App;