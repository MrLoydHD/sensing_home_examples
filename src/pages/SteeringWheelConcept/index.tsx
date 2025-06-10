import { useState, useCallback, useMemo } from 'react';
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
  const contextualButtons = useMemo(() => ({
    'drive': ['Media', 'Phone', 'Voice', 'Cruise'],
    'cruise': ['Speed+', 'Speed-', 'Distance', 'Cancel'],
    'parking': ['Camera', 'Sensors', 'Park Assist', 'Emergency']
  }), []);

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

  const handlePressure = useCallback((pressure: number, button: string) => {
    setPressureLevel(pressure);
    
    // Distinguish between accidental touch and intentional press
    if (pressure < 30) {
      // Light touch - show guidance
      if (!activeButton) {
        triggerHapticFeedback(`${button} detected`, 'light');
      }
    } else if (pressure > 60) {
      // Intentional press
      setActiveButton(button);
      triggerHapticFeedback(`${button} pressed`, 'strong');
    }
  }, [activeButton, triggerHapticFeedback]);

  const handleModeChange = useCallback((newMode: 'drive' | 'cruise' | 'parking') => {
    setCurrentMode(newMode);
    triggerHapticFeedback(`${newMode} mode activated`, 'medium');
    
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