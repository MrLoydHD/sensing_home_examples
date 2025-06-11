import { useState, useCallback, useMemo, useEffect } from 'react';
import SteeringWheel3D from './components/SteeringWheel3D';
import StateSelector from './components/StateSelector';
import CurrentStateView from './components/CurrentStateView';
import FeatureSection from './components/FeatureSection';
import AccessibilityControls from './components/AccessibilityControls';
import InteractionDemo from './components/InteractionDemo';
import { HapticSoundProvider, useHapticSound } from '@/context/hapticSoundContext';
import { AccessibilityProvider, useAccessibility } from '@/context/accessibilityContext';

const SteeringWheelConceptWithFeatures = () => {
  const { playHapticSound } = useHapticSound();
  const { isScreenReaderEnabled, speakAction } = useAccessibility();
  
  // State management for steering wheel
  const [activeState, setActiveState] = useState('inactive'); // 'inactive', 'proximity', 'active'
  const [currentMode, setCurrentMode] = useState<'drive' | 'cruise' | 'parking'>('drive');
  const [pressureLevel, setPressureLevel] = useState(0); // 0-100 pressure sensitivity
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [showHapticFeedback, setShowHapticFeedback] = useState(false);
  const [handPosition, setHandPosition] = useState({ left: false, right: false });
  const [speed, setSpeed] = useState(65);
  const [showContactsList, setShowContactsList] = useState(false);
  const [selectedContactIndex, setSelectedContactIndex] = useState(0);
  const [isInCall, setIsInCall] = useState(false);
  const [callingContact, setCallingContact] = useState<string | null>(null);
  const [phoneClickCount, setPhoneClickCount] = useState(0);
  const [showMediaDisplay, setShowMediaDisplay] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const contextualButtons = useMemo(() => ({
    'drive': ['Media', 'Phone', 'Voice', 'Cruise'],
    'cruise': ['Speed+', 'Speed-', 'Distance', 'Cancel'],
    'parking': ['Camera', 'Sensors', 'Park Assist', 'Emergency']
  }), []);

  const contacts = useMemo(() => [
    { id: '1', name: 'John Smith', number: '+1-555-0123' },
    { id: '2', name: 'Sarah Johnson', number: '+1-555-0456' },
    { id: '3', name: 'Mike Davis', number: '+1-555-0789' },
    { id: '4', name: 'Emily Wilson', number: '+1-555-0321' },
    { id: '5', name: 'Chris Brown', number: '+1-555-0654' },
    { id: '6', name: 'Lisa Garcia', number: '+1-555-0987' },
    { id: '7', name: 'David Miller', number: '+1-555-0246' },
    { id: '8', name: 'Anna Taylor', number: '+1-555-0135' }
  ], []);

  const mediaLibrary = useMemo(() => [
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'Hotel California', artist: 'Eagles' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
    { title: 'Imagine', artist: 'John Lennon' },
    { title: 'Sweet Child O Mine', artist: 'Guns N Roses' },
    { title: 'Billie Jean', artist: 'Michael Jackson' },
  ], []);

  const triggerHapticFeedback = useCallback((action: string | null, intensity: 'light' | 'medium' | 'strong' = 'medium') => {
    setLastAction(action);
    setShowHapticFeedback(true);
    
    // Play haptic sound with different intensities
    const soundType = intensity === 'light' ? 'tap' : intensity === 'strong' ? 'press' : 'default';
    playHapticSound(soundType);
    
    // Speak the action for screen reader mode
    if (isScreenReaderEnabled) {
      speakAction(action);
    }
    
    setTimeout(() => {
      setShowHapticFeedback(false);
    }, 1500);
  }, [isScreenReaderEnabled, playHapticSound, speakAction]);

  const handleStateChange = useCallback((newState: string) => {
    setActiveState(newState);
    
    if (newState === 'active') {
      triggerHapticFeedback('Steering controls activated', 'strong');
    } else if (newState === 'proximity') {
      playHapticSound('proximity');
      if (isScreenReaderEnabled) {
        speakAction('Hand detected on steering wheel');
      }
    } else if (newState === 'inactive') {
      if (isScreenReaderEnabled) {
        speakAction('Steering controls deactivated');
      }
    }
  }, [triggerHapticFeedback, playHapticSound, isScreenReaderEnabled, speakAction]);

  const handlePhoneButtonPress = useCallback(() => {
    if (showContactsList && !isInCall) {
      // If contacts are showing and not in call, call the selected contact
      const selectedContact = contacts[selectedContactIndex];
      setCallingContact(selectedContact.name);
      setShowContactsList(false);
      setIsInCall(true);
      triggerHapticFeedback(`Calling ${selectedContact.name}`, 'strong');
      
      // Show call for 5 seconds for demo
      setTimeout(() => {
        setIsInCall(false);
        setCallingContact(null);
        triggerHapticFeedback('Call ended', 'medium');
      }, 5000);
    } else if (!isInCall) {
      // Show contacts list
      setShowContactsList(true);
      triggerHapticFeedback('Contacts list opened', 'medium');
    }
  }, [showContactsList, isInCall, contacts, selectedContactIndex, triggerHapticFeedback]);

  const handleMediaButtonPress = useCallback(() => {
    setShowMediaDisplay(prev => !prev);
    setShowContactsList(false); // Hide contacts when showing media
    triggerHapticFeedback(showMediaDisplay ? 'Media closed' : 'Media opened', 'medium');
  }, [showMediaDisplay, triggerHapticFeedback]);

  const handlePressure = useCallback((pressure: number, button: string) => {
    setPressureLevel(pressure);
    setActiveButton(button);
    triggerHapticFeedback(`${button} pressed`, 'strong');
    
    // Handle button functionality for demo
    if (button === 'Phone') {
      handlePhoneButtonPress();
    } else if (button === 'Media') {
      handleMediaButtonPress();
    } else if (button === 'Cruise') {
      // Hide all displays when entering cruise mode
      setShowContactsList(false);
      setShowMediaDisplay(false);
      setPhoneClickCount(0);
    }
  }, [triggerHapticFeedback, handlePhoneButtonPress, handleMediaButtonPress]);

  const handleModeChange = useCallback((newMode: 'drive' | 'cruise' | 'parking') => {
    setCurrentMode(newMode);
    triggerHapticFeedback(`${newMode} mode activated`, 'medium');
    
    // Hide all displays when changing modes
    if (newMode !== 'drive') {
      setShowContactsList(false);
      setShowMediaDisplay(false);
      setPhoneClickCount(0);
    }
    
    // Update contextual buttons based on mode
    const buttons = contextualButtons[newMode];
    if (isScreenReaderEnabled) {
      speakAction(`Available controls: ${buttons.join(', ')}`);
    }
  }, [contextualButtons, isScreenReaderEnabled, speakAction, triggerHapticFeedback]);

  const handleHandPosition = useCallback((left: boolean, right: boolean) => {
    setHandPosition({ left, right });
    
    if (!left || !right) {
      triggerHapticFeedback('Safety alert: Keep both hands on wheel', 'strong');
    }
  }, [triggerHapticFeedback]);

  const handleMediaScroll = useCallback((direction: 'up' | 'down') => {
    setVolume(prev => {
      const newVolume = direction === 'up' 
        ? Math.min(100, prev + 5)
        : Math.max(0, prev - 5);
      
      triggerHapticFeedback(`Volume ${newVolume}%`, 'light');
      return newVolume;
    });
  }, [triggerHapticFeedback]);

  const handleNextSong = useCallback(() => {
    setCurrentSongIndex(prev => (prev + 1) % mediaLibrary.length);
    const nextSong = mediaLibrary[(currentSongIndex + 1) % mediaLibrary.length];
    triggerHapticFeedback(`Next: ${nextSong.title}`, 'medium');
  }, [mediaLibrary, currentSongIndex, triggerHapticFeedback]);

  const handlePrevSong = useCallback(() => {
    setCurrentSongIndex(prev => prev === 0 ? mediaLibrary.length - 1 : prev - 1);
    const prevSong = mediaLibrary[currentSongIndex === 0 ? mediaLibrary.length - 1 : currentSongIndex - 1];
    triggerHapticFeedback(`Previous: ${prevSong.title}`, 'medium');
  }, [mediaLibrary, currentSongIndex, triggerHapticFeedback]);

  const handleContactScroll = useCallback((direction: 'up' | 'down') => {
    setSelectedContactIndex(prev => {
      const newIndex = direction === 'up' 
        ? Math.max(0, prev - 1)
        : Math.min(contacts.length - 1, prev + 1);
      
      const contact = contacts[newIndex];
      triggerHapticFeedback(`Selected ${contact.name}`, 'light');
      
      return newIndex;
    });
  }, [contacts, triggerHapticFeedback]);

  // Simulate speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const change = (Math.random() - 0.5) * 4; // Random change between -2 and +2
        return Math.max(0, Math.min(120, prev + change));
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-gray-800 border-b-2 border-blue-500 pb-3 text-2xl md:text-3xl text-center mb-6">
          Smart Steering Wheel with Adaptive Touch Controls
        </h1>
        
        <p className="text-gray-600 leading-relaxed text-base">
          A revolutionary steering wheel design featuring pressure-sensitive touch controls beneath a seamless surface. 
          The interface adapts based on driving conditions, providing contextual controls with tactile guides and 
          haptic feedback for safe, eyes-free operation.
        </p>
        
        {/* Haptic feedback callout */}
        <div className="bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200">
          <h3 className="font-bold text-yellow-700 flex items-center gap-2">
            <span>🔊</span> Advanced Haptic Feedback System
          </h3>
          <p className="text-yellow-800 text-sm mt-1">
            This demo simulates pressure-sensitive controls with varying haptic feedback intensities. 
            Light touches provide guidance, while firm presses activate controls.
            {isScreenReaderEnabled && (
              <span className="block mt-2 text-green-700 font-semibold">
                Screen reader mode active: All interactions will be announced.
              </span>
            )}
          </p>
        </div>

        {/* 3D View - Full Width */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">3D Interactive View</h3>
            <SteeringWheel3D 
              activeState={activeState}
              currentMode={currentMode}
              activeButton={activeButton}
              handPosition={handPosition}
              onButtonPress={handlePressure}
              onHandPositionChange={handleHandPosition}
              speed={Math.round(speed)}
              showContactsList={showContactsList && !isInCall}
              contacts={contacts}
              selectedContact={contacts[selectedContactIndex]?.id}
              onScroll={showMediaDisplay ? handleMediaScroll : handleContactScroll}
              isInCall={isInCall}
              callingContact={callingContact}
              showMediaDisplay={showMediaDisplay && !isInCall}
              currentSong={mediaLibrary[currentSongIndex]?.title}
              artist={mediaLibrary[currentSongIndex]?.artist}
              volume={volume}
              onNextSong={handleNextSong}
              onPrevSong={handlePrevSong}
            />
          </div>
        </div>

        {/* Interactive state selector */}
        <StateSelector 
          activeState={activeState}
          handleStateChange={handleStateChange}
          currentMode={currentMode}
          onModeChange={handleModeChange}
        />

        {/* Accessibility Controls */}
        <AccessibilityControls />

        {/* Phone Status Display */}
        {(showContactsList || isInCall) && (
          <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-200">
            <h3 className="font-bold text-blue-700 flex items-center gap-2">
              <span>📱</span> Phone Status
            </h3>
            {isInCall && (
              <div className="text-green-700 font-semibold mt-2">
                📞 In call with {contacts[selectedContactIndex]?.name}
                <div className="text-sm text-gray-600 mt-1">
                  Call will end automatically in 10 seconds
                </div>
              </div>
            )}
            {showContactsList && !isInCall && (
              <div className="text-blue-700 mt-2">
                📋 Contacts list open - Selected: {contacts[selectedContactIndex]?.name}
                <div className="text-sm text-gray-600 mt-1">
                  Scroll on the back of the steering wheel to navigate, click Phone again to call
                </div>
              </div>
            )}
            {phoneClickCount === 1 && (
              <div className="text-orange-600 text-sm mt-2">
                ⏱️ Click Phone button again within 2 seconds to call
              </div>
            )}
          </div>
        )}

        {/* Speed Display */}
        <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
          <h3 className="font-bold text-green-700 flex items-center gap-2">
            <span>🚗</span> Vehicle Speed
          </h3>
          <div className="text-green-700 font-mono text-2xl mt-2">
            {Math.round(speed)} km/h
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Speed updates automatically (simulated)
          </div>
        </div>

        {/* Interactive Demo Section */}
        <InteractionDemo 
          activeState={activeState}
          currentMode={currentMode}
          pressureLevel={pressureLevel}
          activeButton={activeButton}
          contextualButtons={contextualButtons[currentMode]}
          showHapticFeedback={showHapticFeedback}
          lastAction={lastAction}
          onButtonPress={handlePressure}
        />

        {/* Current State Detail View */}
        <CurrentStateView 
          activeState={activeState}
          currentMode={currentMode}
          handPosition={handPosition}
        />

        {/* Key Features Section */}
        <FeatureSection />
      </div>
    </div>
  );
};

const SteeringWheelConcept = () => {
  return (
    <AccessibilityProvider>
      <HapticSoundProvider>
        <SteeringWheelConceptWithFeatures />
      </HapticSoundProvider>
    </AccessibilityProvider>
  );
};

export default SteeringWheelConcept;