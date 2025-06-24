import { useCallback, useState, useEffect, useMemo } from 'react';
import { Car, Lock, Unlock, Radio, Lightbulb, Moon, Package } from 'lucide-react';

interface VehicleDoorDisplayProps {
  activeState: string;
  currentMode: 'parked' | 'driving' | 'valet';
  activeControl: string | null;
  windowPosition: number;
  doorLocked: boolean;
  radioStation: number;
  ledIntensity: number;
  ledColor: string;
  proximityDetected: boolean;
  availableControls: string[];
  doorType: 'driver' | 'passenger';
  trunkOpen: boolean;
  onControlPress: (control: string) => void;
  onWindowSliderChange: (position: number) => void;
  onLedSliderChange: (intensity: number) => void;
  onLedColorChange: (color: string) => void;
}

// Color palette constant - moved outside component to prevent recreation
const COLOR_PALETTE = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#f97316',
  '#06b6d4', '#ec4899', '#84cc16', '#6366f1', '#ffffff', '#000000'
] as const;

// Control configuration for better maintainability
const CONTROL_CONFIG = {
  Window: { icon: Car, label: 'Window' },
  Lock: { icon: null, label: 'Lock' }, // Special case - dynamic icon
  Radio: { icon: Radio, label: 'Radio' },
  Trunk: { icon: Package, label: 'Trunk' },
  LED: { icon: Lightbulb, label: 'LEDs' }
} as const;

// Utility functions
const getCurrentColor = (ledIntensity: number, hoveredColor: string | null, ledColor: string) =>
  ledIntensity > 0 ? (hoveredColor || ledColor) : '#3b82f6';

const addOpacity = (color: string, opacity: string) => color + opacity;

const VehicleDoorDisplay = ({
  activeState,
  currentMode,
  activeControl,
  windowPosition,
  doorLocked,
  radioStation,
  ledIntensity,
  ledColor,
  proximityDetected,
  availableControls,
  trunkOpen,
  onControlPress,
  onWindowSliderChange,
  onLedSliderChange,
  onLedColorChange
}: VehicleDoorDisplayProps) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [colorPickerActive, setColorPickerActive] = useState(false);

  // Sync color picker state with activeControl changes
  useEffect(() => {
    setColorPickerActive(activeControl === 'LED');
  }, [activeControl]);

  // Memoized computed values
  const isSystemActive = useMemo(() => activeState === 'active', [activeState]);
  const isLedControlAvailable = useMemo(() => availableControls.includes('LED'), [availableControls]);
  const currentDynamicColor = useMemo(() => 
    getCurrentColor(ledIntensity, hoveredColor, ledColor), [ledIntensity, hoveredColor, ledColor]);

  // Optimized style functions with memoization
  const getControlStyle = useCallback((control: string) => {
    const isAvailable = availableControls.includes(control);
    const isActive = activeControl === control;
    
    if (!isAvailable) {
      return 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50';
    }
    
    if (isActive) {
      return 'text-white shadow-lg scale-105 border-2 transition-all duration-200';
    }
    
    const stateClasses = {
      active: 'text-white shadow-md hover:scale-105 transition-all duration-200',
      proximity: 'text-white shadow-sm opacity-80 transition-all duration-200',
      inactive: 'bg-gray-500 text-gray-300 opacity-60'
    };
    
    return stateClasses[activeState as keyof typeof stateClasses] || stateClasses.inactive;
  }, [availableControls, activeControl, activeState]);

  const getButtonDynamicStyle = useCallback((control: string) => {
    const isAvailable = availableControls.includes(control);
    const isActive = activeControl === control;
    
    if (!isAvailable || activeState === 'inactive') return {};
    
    if (isActive || activeState === 'active') {
      return {
        backgroundColor: currentDynamicColor,
        borderColor: currentDynamicColor
      };
    }
    
    if (activeState === 'proximity') {
      return {
        backgroundColor: addOpacity(currentDynamicColor, 'CC'),
        borderColor: currentDynamicColor
      };
    }
    
    return {};
  }, [availableControls, activeControl, activeState, currentDynamicColor]);

  // Event handlers
  const handleControlClick = useCallback((control: string) => {
    if (!availableControls.includes(control) || !isSystemActive) return;
    
    if (control === 'LED') {
      setColorPickerActive(prev => !prev);
    } else {
      setColorPickerActive(false);
    }
    onControlPress(control);
  }, [availableControls, isSystemActive, onControlPress]);

  const handleColorHover = useCallback((color: string) => {
    if (isLedControlAvailable && colorPickerActive) {
      setHoveredColor(color);
    }
  }, [isLedControlAvailable, colorPickerActive]);

  const handleColorSelect = useCallback((color: string) => {
    if (isLedControlAvailable && colorPickerActive) {
      onLedColorChange(color);
      setHoveredColor(null);
    }
  }, [isLedControlAvailable, colorPickerActive, onLedColorChange]);

  // Render helpers for complex controls
  const renderSliderOverlay = useCallback((type: 'window' | 'led') => {
    const isWindow = type === 'window';
    const value = isWindow ? (100 - windowPosition) : (ledIntensity * 100);
    const segments = Math.floor((value / 100) * 10);
    
    return (
      <div className="absolute bottom-2 left-2 right-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-sm transition-all duration-200"
              style={{
                backgroundColor: i < segments
                  ? (isWindow ? '#60a5fa' : currentDynamicColor)
                  : 'rgba(107, 114, 128, 0.5)'
              }}
            />
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (isWindow) {
              onWindowSliderChange(100 - newValue);
            } else {
              onLedSliderChange(newValue / 100);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    );
  }, [windowPosition, ledIntensity, currentDynamicColor, onWindowSliderChange, onLedSliderChange]);

  const renderControlButton = useCallback((controlType: string) => {
    if (!availableControls.includes(controlType)) return null;
    
    const config = CONTROL_CONFIG[controlType as keyof typeof CONTROL_CONFIG];
    const isActive = activeControl === controlType;
    const IconComponent = config.icon;
    
    // Status text logic
    const getStatusText = () => {
      switch (controlType) {
        case 'Window': return `${Math.round(100 - windowPosition)}% Open`;
        case 'Lock': return doorLocked ? 'Locked' : 'Unlocked';
        case 'Radio': return `Station ${radioStation}`;
        case 'Trunk': return trunkOpen ? 'Open' : 'Closed';
        case 'LED': return `${Math.round(ledIntensity * 100)}% Intensity`;
        default: return '';
      }
    };

    const buttonStyle = controlType === 'LED' ? {
      backgroundColor: ledIntensity > 0 ? addOpacity(currentDynamicColor, '20') : undefined,
      borderColor: ledIntensity > 0 ? currentDynamicColor : undefined
    } : getButtonDynamicStyle(controlType);

    return (
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => handleControlClick(controlType)}
          className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-200 relative ${getControlStyle(controlType)}`}
          disabled={!isSystemActive}
          style={buttonStyle}
        >
          {controlType === 'Lock' ? (
            doorLocked ? <Lock className="w-8 h-8 mb-1" /> : <Unlock className="w-8 h-8 mb-1" />
          ) : IconComponent ? (
            <IconComponent 
              className="w-8 h-8 mb-1" 
              style={controlType === 'LED' && ledIntensity > 0 ? { color: currentDynamicColor } : undefined}
            />
          ) : null}
          <span>{config.label}</span>
          
          {/* Render sliders for window and LED controls */}
          {isActive && (controlType === 'Window' || controlType === 'LED') && 
            renderSliderOverlay(controlType.toLowerCase() as 'window' | 'led')}
        </button>
        <div className="mt-2 text-xs text-gray-300 text-center">
          {getStatusText()}
        </div>
      </div>
    );
  }, [availableControls, activeControl, isSystemActive, windowPosition, doorLocked, radioStation, 
      trunkOpen, ledIntensity, currentDynamicColor, getControlStyle, getButtonDynamicStyle, 
      handleControlClick, renderSliderOverlay]);

  const renderColorPicker = useCallback(() => {
    const isColorPickerEnabled = isLedControlAvailable && colorPickerActive;
    
    return (
      <div className={`w-32 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-600 p-4 flex flex-col transition-all duration-300 ${
        isColorPickerEnabled ? 'opacity-100' : 'opacity-30'
      }`}>
        <div className="text-white text-sm font-medium text-center mb-4">LED Colors</div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-3">
            {COLOR_PALETTE.map((color) => (
              <button
                key={color}
                disabled={!isColorPickerEnabled}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                  ledColor === color 
                    ? 'border-white shadow-lg ring-2 ring-white/30' 
                    : 'border-gray-500 hover:border-gray-300'
                } ${
                  !isColorPickerEnabled 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
                onMouseEnter={() => handleColorHover(color)}
                onMouseLeave={() => setHoveredColor(null)}
                onClick={() => handleColorSelect(color)}
              >
                {ledColor === color && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }, [isLedControlAvailable, colorPickerActive, ledColor, handleColorHover, handleColorSelect]);

  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 min-h-[100px] w-1/2 mx-auto overflow-hidden">
      <div className="flex h-full">
        {/* Door Armrest Surface */}
        <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl border border-gray-600 p-8 h-full flex-1 mr-4 transition-all duration-300">
        
          {/* Mode Indicator */}
          <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium capitalize">{currentMode} Mode</span>
          </div>

          {/* Proximity Detection Indicator */}
          {proximityDetected && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-blue-900/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-200 text-sm">Proximity Detected</span>
            </div>
          )}

          {/* LED Strip */}
          <div 
            className="absolute left-0 top-8 bottom-8 w-1 rounded-full transition-all duration-500"
            style={{
              background: ledIntensity > 0 ? currentDynamicColor : '#374151',
              boxShadow: ledIntensity > 0 ? `0 0 15px ${currentDynamicColor}${Math.round(ledIntensity * 255).toString(16).padStart(2, '0')}` : 'none',
              opacity: ledIntensity > 0 ? 1 : 0.3
            }}
          />

          {/* Main Control Grid */}
          <div className="flex justify-center items-center pt-12">
            <div className="grid grid-cols-2 gap-12">
              {['Window', 'Lock', 'Radio', 'Trunk', 'LED'].map(control => 
                renderControlButton(control)
              )}
            </div>
          </div>

          {/* Lock Status Glow */}
          {doorLocked && isSystemActive && (
            <div className="absolute inset-0 border-2 border-red-500/30 rounded-xl pointer-events-none animate-pulse" />
          )}

          {/* Inactive State Overlay */}
          {activeState === 'inactive' && (
            <div className="absolute inset-0 bg-black/40 rounded-xl pointer-events-none flex items-center justify-center">
              <div className="text-white text-center">
                <Moon className="w-12 h-12 mb-2 mx-auto" />
                <div className="text-lg font-medium">Armrest Inactive</div>
                <div className="text-sm text-gray-300">Approach to activate</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Color Picker Panel */}
        {renderColorPicker()}
      </div>
    </div>
  );
};

export default VehicleDoorDisplay;