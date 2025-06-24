interface CurrentStateViewProps {
  activeState: string;
  currentMode: 'parked' | 'driving' | 'valet';
  proximityDetected: boolean;
  ledIntensity: number;
}

const CurrentStateView = ({ 
  activeState, 
  currentMode, 
  proximityDetected, 
  ledIntensity 
}: CurrentStateViewProps) => {
  
  const getStateDetails = () => {
    switch (activeState) {
      case 'inactive':
        return {
          title: 'System Dormant',
          description: 'The door control system is in sleep mode to conserve power. Approach with key fob or smart device to wake up the system.',
          features: [
            'All touch surfaces are disabled',
            'LED guides are completely off',
            'Proximity sensors monitoring for activation signals',
            'Emergency unlock functionality remains active',
            'Power consumption minimized to <0.1W'
          ],
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
      case 'proximity':
        return {
          title: 'Proximity Detection Active',
          description: 'Key fob or authorized device detected within range. LED guides are illuminating to show available interaction zones.',
          features: [
            'LED strips glow at 50% intensity for guidance',
            'Touch zones are pre-heated for faster response',
            'System ready for immediate activation',
            proximityDetected ? 'Hand presence confirmed via infrared' : 'Monitoring for hand approach',
            `Current mode: ${currentMode} - controls are context-filtered`
          ],
          color: 'blue',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
      case 'active':
        return {
          title: 'Controls Fully Active',
          description: 'All authorized touch controls are responsive. LED guidance is at full intensity and haptic feedback is enabled.',
          features: [
            'Full LED illumination providing visual guidance',
            'All authorized touch zones are responsive',
            'Multi-level haptic feedback confirms every interaction',
            'Voice announcements available for accessibility',
            `${currentMode} mode: context-appropriate controls enabled`
          ],
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
      default:
        return null;
    }
  };

  const getModeDetails = () => {
    switch (currentMode) {
      case 'parked':
        return {
          description: 'Vehicle is stationary with full access to all comfort and convenience features.',
          controls: ['Window positioning', 'Door lock/unlock', 'Mirror adjustment', 'LED ambient lighting'],
          safety: 'All controls available for maximum convenience'
        };
      case 'driving':
        return {
          description: 'Vehicle is in motion - only essential, safety-focused controls are accessible.',
          controls: ['Window operation (limited)', 'Mirror adjustment (passenger side only)'],
          safety: 'Lock and LED controls disabled to prevent driver distraction'
        };
      case 'valet':
        return {
          description: 'Security mode active - minimal access to prevent unauthorized adjustments.',
          controls: ['Door lock/unlock only'],
          safety: 'All comfort features disabled for security'
        };
    }
  };

  const details = getStateDetails();
  const modeDetails = getModeDetails();
  
  if (!details || !modeDetails) return null;

  return (
    <div className="mt-6 space-y-4">
      {/* Current State Details */}
      <div className={`${details.bgColor} rounded-lg p-6 border ${details.borderColor}`}>
        <h3 className={`text-lg font-semibold mb-2 ${details.textColor}`}>
          {details.title}
        </h3>
        <p className={`${details.textColor} mb-4 opacity-90`}>{details.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {details.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className={`${details.textColor} mt-0.5 opacity-60`}>•</span>
              <span className={`text-sm ${details.textColor} opacity-80`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* LED Intensity Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">LED Guidance Intensity</span>
            <span className="text-sm text-gray-500">{Math.round(ledIntensity * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                activeState === 'active' ? 'bg-green-500' : 
                activeState === 'proximity' ? 'bg-blue-500' : 'bg-gray-400'
              }`}
              style={{ width: `${ledIntensity * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mode-Specific Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 capitalize">
          {currentMode} Mode Details
        </h3>
        <p className="text-gray-600 mb-4">{modeDetails.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Available Controls:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {modeDetails.controls.map((control, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">{control}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Safety Consideration:</h4>
            <p className="text-sm text-gray-600">{modeDetails.safety}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStateView;