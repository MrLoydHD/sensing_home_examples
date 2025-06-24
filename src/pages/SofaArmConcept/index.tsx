// Enhanced SofaArmConcept.jsx with accessibility features
import { useState, useEffect, type SetStateAction } from 'react';
import { Volume2 } from 'lucide-react';
import InactiveSofaArm from './components/InactiveSofaArm';
import ProximitySofaArm from './components/ProximitySofaArm';
import ActiveSofaArm from './components/ActiveSofaArm';
import StateSelector from './components/StateSelector';
import CurrentStateView from './components/CurrentStateView';
import FeatureSection from './components/FeatureSection';
import { HapticSoundProvider, useHapticSound } from '@/context/hapticSoundContext';
import { AccessibilityProvider, useAccessibility } from '@/context/accessibilityContext';
import AccessibilityControls from './components/AccessibilityControls';

// Wrapped component that uses haptic sound and accessibility features
const SofaArmConceptWithFeatures = () => {
  // Get haptic sound function from context
  const { playHapticSound } = useHapticSound();
  
  // Get accessibility features from context
  const { isScreenReaderEnabled, speakAction } = useAccessibility();
  
  // State management for interactive features
  const [activeState, setActiveState] = useState('inactive'); // 'inactive', 'proximity', 'active'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(65);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [activeDevice] = useState<'tv' | 'soundbar' | 'smartHome'>('tv');
  const [connectedDevices, setConnectedDevices] = useState([
    { id: 'tv', name: 'Living Room TV', active: true },
    { id: 'soundbar', name: 'Soundbar', active: true },
    { id: 'lights', name: 'Smart Lights', active: false }
  ]);
  const [currentMedia] = useState({
    title: 'Stranger Things',
    source: 'Netflix',
    type: 'TV Show',
    position: '23:15 / 45:00'
  });
  const [showHapticFeedback, setShowHapticFeedback] = useState(false);
  const [bluetoothConnected, setBluetoothConnected] = useState(true);
  const [currentBrightness, setCurrentBrightness] = useState(80);
  const [, setAmbientLightLevel] = useState('medium'); // 'low', 'medium', 'high'

  // Function to simulate haptic feedback with sound and accessibility features
  const triggerHapticFeedback = (action: string | null) => {
    setLastAction(action);
    setShowHapticFeedback(true);
    
    // Play haptic sound feedback
    playHapticSound(action ?? 'default');
    
    // Speak the action for screen reader mode
    speakAction(action);
    
    // Hide feedback after a short delay
    setTimeout(() => {
      setShowHapticFeedback(false);
    }, 1500); // Shortened from 8000ms to 1500ms for better UX
  };

  // Function to handle panel activation state changes
  const handleStateChange = (newState: SetStateAction<string>) => {
    setActiveState(newState);
    
    if (newState === 'active') {
      triggerHapticFeedback('Panel activated');
    } else if (newState === 'proximity') {
      // Optional: add sound for proximity state
      playHapticSound('Proximity');
      if (isScreenReaderEnabled) {
        speakAction('Hand detected, showing basic controls');
      }
    } else if (newState === 'inactive') {
      if (isScreenReaderEnabled) {
        speakAction('Panel deactivated');
      }
    }
  };

  // Simulating ambient light detection and adaptive brightness
  useEffect(() => {
    // This would actually use real sensors in a real implementation
    const lightLevels = ['low', 'medium', 'high'];
    const randomLightChange = () => {
      const newLevel = lightLevels[Math.floor(Math.random() * lightLevels.length)];
      setAmbientLightLevel(newLevel);
      
      // Adjust panel brightness based on ambient light
      if (newLevel === 'low') {
        setCurrentBrightness(40);
      } else if (newLevel === 'medium') {
        setCurrentBrightness(70);
      } else {
        setCurrentBrightness(100);
      }
    };
    
    // Simulate light changes occasionally
    const interval = setInterval(randomLightChange, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate opacity for the panel based on current brightness
  const getPanelOpacity = () => {
    return (currentBrightness / 100 * 0.85).toFixed(2);
  };

  // Props objects to pass to components
  const commonProps = {
    activeDevice,
    currentMedia,
    triggerHapticFeedback,
    handleStateChange
  };
  
  const activeProps = {
    ...commonProps,
    isPlaying,
    setIsPlaying,
    currentVolume,
    setCurrentVolume,
    getPanelOpacity,
    connectedDevices,
    setConnectedDevices,
    bluetoothConnected,
    setBluetoothConnected,
    showHapticFeedback,
    lastAction
  };

  // Function to render the appropriate state component
  const renderCurrentStateView = (state: string, size: 'normal' | 'large' = 'normal') => {
    switch(state) {
      case 'inactive':
        return <InactiveSofaArm handleStateChange={handleStateChange} size={size} />;
      case 'proximity':
        return <ProximitySofaArm {...commonProps} size={size} />;
      case 'active':
        return <ActiveSofaArm {...activeProps} size={size} />;
      default:
        return <InactiveSofaArm handleStateChange={handleStateChange} size={size} />;
    }
  };

  // Render the concept
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="bg-card rounded-xl shadow-md p-6 md:p-8">
        <h1 className="text-card-foreground border-b-2 border-primary pb-3 text-2xl md:text-3xl text-center mb-6">
          Sofa Arm with Integrated Media Controls
        </h1>
        
        <p className="text-muted-foreground leading-relaxed text-base">
          A seamless touch panel embedded within the arm of a sofa, allowing users to control connected media devices without a traditional remote. The panel remains invisible when not in use, illuminates essential controls when a hand approaches, and provides intuitive access to media and smart home functions.
        </p>
        
        {/* Haptic sound feature callout */}
        <div className="bg-secondary p-4 rounded-lg mt-4 border border-border">
          <h3 className="font-bold text-secondary-foreground flex items-center gap-2">
            <Volume2 className="w-5 h-5" /> Haptic Sound Feedback
          </h3>
          <p className="text-secondary-foreground text-sm mt-1">
            This demo includes sound-based haptic feedback. Each interaction produces unique audio feedback that simulates the physical vibration you would feel in a real implementation.
            {isScreenReaderEnabled && (
              <span className="block mt-2 text-chart-2 font-semibold">
                Screen reader mode is active. All actions will be spoken aloud.
              </span>
            )}
          </p>
        </div>
        
        {/* Interactive demonstration - click to cycle through states */}
        <div className="bg-muted p-4 rounded-lg mt-6 text-center border border-border">
          <h3 className="m-0 mb-2 text-primary">Interactive Demo</h3>
          <p className="m-0 mb-4 text-sm text-muted-foreground">
            Click on the states below to see different interaction modes
          </p>
          
          <StateSelector 
            activeState={activeState} 
            handleStateChange={handleStateChange} 
            renderFunction={renderCurrentStateView}
          />
        </div>
        
        {/* Accessibility Controls */}
        <AccessibilityControls />

        {/* Full preview of current state */}
        <CurrentStateView 
          activeState={activeState} 
          renderCurrentStateView={() => renderCurrentStateView(activeState, 'large')} 
        />

        {/* Key Features Section */}
        <FeatureSection />
      </div>
    </div>
  );
};

// Main component with provider wrappers
const SofaArmConcept = () => {
  return (
    <AccessibilityProvider>
      <HapticSoundProvider>
        <SofaArmConceptWithFeatures />
      </HapticSoundProvider>
    </AccessibilityProvider>
  );
};

export default SofaArmConcept;