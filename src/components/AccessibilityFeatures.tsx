import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Type, TypeOff, RotateCcw } from 'lucide-react';

interface AccessibilityFeaturesProps {
  onTextToSpeech: (text: string) => void;
  onStopSpeech: () => void;
}

const AccessibilityFeatures: React.FC<AccessibilityFeaturesProps> = ({ 
  onTextToSpeech, 
  onStopSpeech 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Apply large text mode
    if (largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  }, [largeText]);

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      onStopSpeech();
      setIsSpeaking(false);
    } else {
      onTextToSpeech(text);
      setIsSpeaking(true);
    }
  };

  const handleVoiceCommand = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommandExecution(command);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const handleVoiceCommandExecution = (command: string) => {
    // Simple voice commands for navigation
    if (command.includes('home') || command.includes('start')) {
      window.location.href = '/';
    } else if (command.includes('login') || command.includes('sign in')) {
      window.location.href = '/login';
    } else if (command.includes('learn') || command.includes('education')) {
      window.location.href = '/learn';
    } else if (command.includes('help')) {
      onTextToSpeech('You can navigate using voice commands. Say home, login, learn, or help for assistance.');
    }
  };

  const resetAccessibility = () => {
    setHighContrast(false);
    setLargeText(false);
    setIsSpeaking(false);
    onStopSpeech();
    document.documentElement.classList.remove('high-contrast', 'large-text');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex flex-col space-y-2">
        {/* Text to Speech */}
        <button
          onClick={() => handleTextToSpeech('Welcome to YuvaSetu.AI. This is an AI-powered internship recommendation platform for Indian youth.')}
          className={`p-2 rounded-lg transition-colors ${
            isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
          title="Text to Speech"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Voice Commands */}
        <button
          onClick={handleVoiceCommand}
          className={`p-2 rounded-lg transition-colors ${
            isListening ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
          }`}
          title="Voice Commands"
        >
          <span className="text-xs">🎤</span>
        </button>

        {/* High Contrast */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`p-2 rounded-lg transition-colors ${
            highContrast ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="High Contrast"
        >
          {highContrast ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        {/* Large Text */}
        <button
          onClick={() => setLargeText(!largeText)}
          className={`p-2 rounded-lg transition-colors ${
            largeText ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Large Text"
        >
          {largeText ? <Type className="w-4 h-4" /> : <TypeOff className="w-4 h-4" />}
        </button>

        {/* Reset */}
        <button
          onClick={resetAccessibility}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Reset Accessibility Settings"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AccessibilityFeatures;