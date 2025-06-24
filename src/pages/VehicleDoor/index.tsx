import { useState, useCallback, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VehicleDoorDisplay from './components/VehicleDoorDisplay';
import StateSelector from './components/StateSelector';
import CurrentStateView from './components/CurrentStateView';
import FeatureSection from './components/FeatureSection';
import AccessibilityControls from './components/AccessibilityControls';
import InteractionDemo from './components/InteractionDemo';
import { HapticSoundProvider, useHapticSound } from '@/context/hapticSoundContext';
import { AccessibilityProvider, useAccessibility } from '@/context/accessibilityContext';

// Types for better type safety
type VehicleMode = 'parked' | 'driving' | 'valet';
type DoorType = 'driver' | 'passenger';
type ActiveState = 'inactive' | 'proximity' | 'active';
type ControlType = 'Window' | 'Lock' | 'Radio' | 'Trunk' | 'LED';
type HapticIntensity = 'light' | 'medium' | 'strong';

// Configuration constants
const CONTEXTUAL_CONTROLS: Record<VehicleMode, Record<DoorType, ControlType[]>> = {
  parked: {
    driver: ['Window', 'Lock', 'Trunk', 'LED'],
    passenger: ['Window', 'Lock', 'Radio']
  },
  driving: {
    driver: ['Window', 'LED'],
    passenger: ['Window', 'Radio']
  },
  valet: {
    driver: ['Lock'],
    passenger: ['Lock']
  }
} as const;

const STATE_LED_INTENSITY_MAP: Record<ActiveState, number> = {
  active: 1,
  proximity: 0.5,
  inactive: 0
} as const;

const VehicleDoorConceptWithFeatures = () => {
  const { playHapticSound } = useHapticSound();
  const { isScreenReaderEnabled, speakAction } = useAccessibility();
  
  // Core system states
  const [activeState, setActiveState] = useState<ActiveState>('inactive');
  const [currentMode, setCurrentMode] = useState<VehicleMode>('parked');
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const [doorType, setDoorType] = useState<DoorType>('driver');
  
  // Feedback states
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [showHapticFeedback, setShowHapticFeedback] = useState(false);
  
  // Physical control states
  const [windowPosition, setWindowPosition] = useState(100); // 100 = closed, 0 = open
  const [doorLocked, setDoorLocked] = useState(true);
  const [radioStation, setRadioStation] = useState(1);
  const [ledIntensity, setLedIntensity] = useState(0);
  const [ledColor, setLedColor] = useState('#3b82f6');
  const [proximityDetected, setProximityDetected] = useState(false);
  const [trunkOpen, setTrunkOpen] = useState(false);

  // Memoized computed values
  const currentControls = useMemo(() => 
    CONTEXTUAL_CONTROLS[currentMode][doorType], 
    [currentMode, doorType]
  );

  // Optimized feedback function with debouncing
  const triggerHapticFeedback = useCallback((
    action: string | null, 
    intensity: HapticIntensity = 'medium'
  ) => {
    setLastAction(action);
    setShowHapticFeedback(true);
    
    const soundType = intensity === 'light' ? 'tap' : intensity === 'strong' ? 'press' : 'default';
    playHapticSound(soundType);
    
    if (isScreenReaderEnabled && action) {
      speakAction(action);
    }
    
    setTimeout(() => setShowHapticFeedback(false), 1500);
  }, [isScreenReaderEnabled, playHapticSound, speakAction]);

  // State change handler with automatic LED intensity adjustment
  const handleStateChange = useCallback((newState: ActiveState) => {
    setActiveState(newState);
    setLedIntensity(STATE_LED_INTENSITY_MAP[newState]);
    
    const stateActions: Record<ActiveState, () => void> = {
      active: () => triggerHapticFeedback('Door controls activated', 'strong'),
      proximity: () => {
        playHapticSound('proximity');
        setProximityDetected(true);
        if (isScreenReaderEnabled) {
          speakAction('Proximity detected near door');
        }
      },
      inactive: () => {
        setProximityDetected(false);
        if (isScreenReaderEnabled) {
          speakAction('Door controls deactivated');
        }
      }
    };
    
    stateActions[newState]();
  }, [triggerHapticFeedback, playHapticSound, isScreenReaderEnabled, speakAction]);

  // Unified control press handler
  const handleControlPress = useCallback((control: string) => {
    setActiveControl(prev => prev === control ? null : control);
    
    const controlActions: Record<string, () => void> = {
      Window: () => {
        if (activeControl !== 'Window') {
          triggerHapticFeedback('Window control activated', 'medium');
        }
      },
      Lock: () => {
        setDoorLocked(prev => !prev);
        triggerHapticFeedback(doorLocked ? 'Door unlocked' : 'Door locked', 'strong');
      },
      Radio: () => {
        const newStation = radioStation >= 5 ? 1 : radioStation + 1;
        setRadioStation(newStation);
        triggerHapticFeedback(`Radio station ${newStation}`, 'light');
      },
      Trunk: () => {
        setTrunkOpen(prev => !prev);
        triggerHapticFeedback(trunkOpen ? 'Trunk closed' : 'Trunk opened', 'strong');
      },
      LED: () => {
        if (activeControl !== 'LED') {
          triggerHapticFeedback('LED control activated', 'medium');
        }
      }
    };
    
    controlActions[control]?.();
  }, [activeControl, doorLocked, radioStation, trunkOpen, triggerHapticFeedback]);

  // Slider change handlers with optimized feedback
  const handleWindowSliderChange = useCallback((position: number) => {
    setWindowPosition(position);
    const percentage = Math.round((100 - position));
    triggerHapticFeedback(`Window ${percentage}% open`, 'light');
  }, [triggerHapticFeedback]);

  const handleLedSliderChange = useCallback((intensity: number) => {
    setLedIntensity(intensity);
    triggerHapticFeedback(`LED intensity ${Math.round(intensity * 100)}%`, 'light');
  }, [triggerHapticFeedback]);

  const handleLedColorChange = useCallback((color: string) => {
    setLedColor(color);
    triggerHapticFeedback('LED color changed', 'light');
  }, [triggerHapticFeedback]);

  // Mode and door type change handlers
  const handleModeChange = useCallback((newMode: VehicleMode) => {
    setCurrentMode(newMode);
    triggerHapticFeedback(`${newMode} mode activated`, 'medium');
    
    if (isScreenReaderEnabled) {
      const controls = CONTEXTUAL_CONTROLS[newMode][doorType];
      speakAction(`Available controls: ${controls.join(', ')}`);
    }
  }, [doorType, isScreenReaderEnabled, speakAction, triggerHapticFeedback]);

  const handleDoorTypeChange = useCallback((newDoorType: DoorType) => {
    setDoorType(newDoorType);
    triggerHapticFeedback(`${newDoorType} door selected`, 'medium');
    
    if (isScreenReaderEnabled) {
      const controls = CONTEXTUAL_CONTROLS[currentMode][newDoorType];
      speakAction(`${newDoorType} door - Available controls: ${controls.join(', ')}`);
    }
  }, [currentMode, isScreenReaderEnabled, speakAction, triggerHapticFeedback]);

  // Common props for VehicleDoorDisplay to reduce duplication
  const doorDisplayProps = useMemo(() => ({
    activeState,
    currentMode,
    activeControl,
    windowPosition,
    doorLocked,
    radioStation,
    ledIntensity,
    ledColor,
    proximityDetected,
    trunkOpen,
    onControlPress: handleControlPress,
    onWindowSliderChange: handleWindowSliderChange,
    onLedSliderChange: handleLedSliderChange,
    onLedColorChange: handleLedColorChange
  }), [
    activeState, currentMode, activeControl, windowPosition, doorLocked, 
    radioStation, ledIntensity, ledColor, proximityDetected, trunkOpen,
    handleControlPress, handleWindowSliderChange, handleLedSliderChange, handleLedColorChange
  ]);

  const renderDoorPanel = useCallback((type: DoorType) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Interactive {type.charAt(0).toUpperCase() + type.slice(1)} Door Panel
      </h3>
      <VehicleDoorDisplay 
        {...doorDisplayProps}
        availableControls={CONTEXTUAL_CONTROLS[currentMode][type]}
        doorType={type}
      />
    </div>
  ), [doorDisplayProps, currentMode]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="bg-gray-50 rounded-xl shadow-md p-6 md:p-8">
        {/* Header */}
        <h1 className="text-gray-800 border-b-2 border-blue-500 pb-3 text-2xl md:text-3xl text-center mb-6">
          Smart Vehicle Door with Adaptive Touch Controls
        </h1>
        
        <p className="text-gray-600 leading-relaxed text-base">
          An intelligent door panel featuring context-aware touch controls that adapt based on vehicle mode. 
          The interface provides seamless access to window, radio, and security controls with tactile feedback
          and LED guidance for safe operation in any lighting condition.
        </p>
        
        {/* System Info Callout */}
        <div className="bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200">
          <h3 className="font-bold text-yellow-700 flex items-center gap-2">
            <Volume2 className="w-5 h-5" /> Advanced Touch Interface System
          </h3>
          <p className="text-yellow-800 text-sm mt-1">
            This demo showcases context-sensitive controls with multi-level haptic feedback. 
            Controls adapt based on vehicle mode (Parked, Driving, Valet) for optimal safety.
            {isScreenReaderEnabled && (
              <span className="block mt-2 text-green-700 font-semibold">
                Screen reader mode active: All interactions will be announced.
              </span>
            )}
          </p>
        </div>

        {/* Door Selection Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Door Selection</h3>
            <Tabs value={doorType} onValueChange={handleDoorTypeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="driver">Driver Door</TabsTrigger>
                <TabsTrigger value="passenger">Passenger Door</TabsTrigger>
              </TabsList>
              
              <TabsContent value="driver" className="mt-6">
                {renderDoorPanel('driver')}
              </TabsContent>
              
              <TabsContent value="passenger" className="mt-6">
                {renderDoorPanel('passenger')}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Control Sections */}
        <StateSelector 
          activeState={activeState}
          handleStateChange={handleStateChange}
          currentMode={currentMode}
          onModeChange={handleModeChange}
        />

        <AccessibilityControls />

        <InteractionDemo 
          activeState={activeState}
          currentMode={currentMode}
          activeControl={activeControl}
          availableControls={currentControls}
          showHapticFeedback={showHapticFeedback}
          lastAction={lastAction}
          windowPosition={windowPosition}
          doorLocked={doorLocked}
          radioStation={radioStation}
          ledIntensity={ledIntensity}
          ledColor={ledColor}
          doorType={doorType}
          trunkOpen={trunkOpen}
          onControlPress={handleControlPress}
        />

        <CurrentStateView 
          activeState={activeState}
          currentMode={currentMode}
          proximityDetected={proximityDetected}
          ledIntensity={ledIntensity}
        />

        <FeatureSection />
      </div>
    </div>
  );
};

const VehicleDoor = () => (
  <AccessibilityProvider>
    <HapticSoundProvider>
      <VehicleDoorConceptWithFeatures />
    </HapticSoundProvider>
  </AccessibilityProvider>
);

export default VehicleDoor;