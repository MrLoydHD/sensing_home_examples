// AccessibilityProvider.tsx - The provider component
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import AccessibilityContext from '@/context/accessibilityContext/AccessibilityContext';

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [isHoverAnnouncementEnabled, setIsHoverAnnouncementEnabled] = useState(true); // Enable hover announcements by default
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechQueue, setSpeechQueue] = useState<string[]>([]);
  const [lastHoveredElement, setLastHoveredElement] = useState('');

  // Initialize speech synthesis on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Process speech queue
  useEffect(() => {
    if (isScreenReaderEnabled && speechSynthesis && speechQueue.length > 0 && !isSpeaking) {
      const textToSpeak = speechQueue[0];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Set voice to a clearer one if available
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google US English') ||
        voice.name.includes('Microsoft Zira') ||
        voice.name.includes('Microsoft David')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Set properties
      utterance.rate = 1.1; // Slightly faster
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Handle speech events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeechQueue(prevQueue => prevQueue.slice(1));
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        setSpeechQueue(prevQueue => prevQueue.slice(1));
      };
      
      // Speak the text
      speechSynthesis.speak(utterance);
    }
  }, [isScreenReaderEnabled, speechSynthesis, speechQueue, isSpeaking]);

  // Toggle screen reader mode
  const toggleScreenReader = () => {
    const newState = !isScreenReaderEnabled;
    setIsScreenReaderEnabled(newState);
    
    // Announce mode change
    if (newState && speechSynthesis) {
      speakText('Screen reader mode enabled. All actions will be spoken aloud.');
    }
  };

  // Function to speak text using speech synthesis
  const speakText = (text: string) => {
    if (isScreenReaderEnabled && text) {
      setSpeechQueue(prevQueue => [...prevQueue, text]);
    }
  };

  // Map action names to more descriptive speech
  const getDescriptiveText = (action: string) => {
    switch(action) {
      case 'Panel activated':
        return 'Control panel activated';
      case 'Volume up':
        return 'Volume increased';
      case 'Volume down':
        return 'Volume decreased';
      case 'Playing':
        return 'Media playing';
      case 'Paused':
        return 'Media paused';
      case 'Next track':
        return 'Skipped to next track';
      case 'Previous track':
        return 'Returned to previous track';
      case 'Lights on':
        return 'Lights turned on';
      case 'Lights off':
        return 'Lights turned off';
      case 'Temperature control':
        return 'Temperature control accessed';
      case 'Home menu':
        return 'Home menu opened';
      case 'Bluetooth on':
        return 'Bluetooth connection enabled';
      case 'Bluetooth off':
        return 'Bluetooth connection disabled';
      default:
        return action;
    }
  };

  // Enhanced speak function for actions specifically
  const speakAction = (action: string | null) => {
    if (isScreenReaderEnabled && action) {
      speakText(getDescriptiveText(action));
    }
  };

  // Function to announce element on hover
  const announceHover = (elementDescription: string) => {
    if (isScreenReaderEnabled && isHoverAnnouncementEnabled && elementDescription) {
      // Prevent announcing the same element repeatedly in quick succession
      if (elementDescription !== lastHoveredElement) {
        setLastHoveredElement(elementDescription);
        
        // Use a lower priority for hover announcements by adding them with lower volume
        const utterance = new SpeechSynthesisUtterance(elementDescription);
        utterance.volume = 0.7; // Slightly lower volume for hover announcements
        utterance.rate = 1.2; // Slightly faster to be less intrusive
        
        // Only announce if not currently speaking something more important
        if (!isSpeaking && speechSynthesis) {
          speechSynthesis.speak(utterance);
          setIsSpeaking(true);
          
          utterance.onend = () => {
            setIsSpeaking(false);
          };
        }
        
        // Reset the last hovered element after a delay to allow re-announcing if user hovers
        // again on the same element after moving away
        setTimeout(() => {
          setLastHoveredElement('');
        }, 1500);
      }
    }
  };

  // Toggle hover announcements
  const toggleHoverAnnouncements = () => {
    const newState = !isHoverAnnouncementEnabled;
    setIsHoverAnnouncementEnabled(newState);
    
    if (isScreenReaderEnabled) {
      speakText(newState ? 'Hover announcements enabled.' : 'Hover announcements disabled.');
    }
  };

  // The value to be provided to consuming components
  const value = {
    isScreenReaderEnabled,
    isHoverAnnouncementEnabled,
    toggleScreenReader,
    toggleHoverAnnouncements,
    speakText,
    speakAction,
    announceHover
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;