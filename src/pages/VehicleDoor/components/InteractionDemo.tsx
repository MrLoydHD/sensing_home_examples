import { Car, Lock, Unlock, Radio, Lightbulb, Smartphone, AlertTriangle, Shield, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractionDemoProps {
  activeState: string;
  currentMode: 'parked' | 'driving' | 'valet';
  activeControl: string | null;
  availableControls: string[];
  showHapticFeedback: boolean;
  lastAction: string | null;
  windowPosition: number;
  doorLocked: boolean;
  radioStation: number;
  ledIntensity: number;
  ledColor: string;
  doorType: 'driver' | 'passenger';
  trunkOpen: boolean;
  onControlPress: (control: string) => void;
}

const InteractionDemo = ({
  activeState,
  currentMode,
  activeControl,
  availableControls,
  showHapticFeedback,
  lastAction,
  windowPosition,
  doorLocked,
  radioStation,
  ledIntensity,
  ledColor,
  doorType,
  trunkOpen,
  onControlPress
}: InteractionDemoProps) => {

  return (
    <div className="mt-8 space-y-6">
      {/* Haptic Feedback Indicator */}
      {showHapticFeedback && lastAction && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            <div>
              <p className="font-semibold text-purple-800">Haptic Feedback</p>
              <p className="text-sm text-purple-600">{lastAction}</p>
            </div>
            <div className="ml-auto">
              <div className="w-16 h-4 bg-purple-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full animate-pulse" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Controls Demo */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Access Controls</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableControls.map((control) => {
            const isActive = activeControl === control;
            
            return (
              <Button
                key={control}
                variant={isActive ? "default" : "outline"}
                onClick={() => onControlPress(control)}
                disabled={activeState !== 'active'}
                className="h-auto p-4 flex flex-col items-center"
              >
                <div className="text-center">
                  <div className="mb-2 flex justify-center">
                    {control === 'Window' && <Car className="w-8 h-8" />}
                    {control === 'Lock' && (doorLocked ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />)}
                    {control === 'Radio' && <Radio className="w-8 h-8" />}
                    {control === 'Trunk' && <Package className="w-8 h-8" />}
                    {control === 'LED' && <Lightbulb className="w-8 h-8" />}
                  </div>
                  <div className="font-medium text-sm">{control}</div>
                  <div className="text-xs mt-1 opacity-75">
                    {control === 'Window' && `${Math.round(100 - windowPosition)}% Open`}
                    {control === 'Lock' && (doorLocked ? 'Locked' : 'Unlocked')}
                    {control === 'Radio' && `Station ${radioStation}`}
                    {control === 'Trunk' && (trunkOpen ? 'Open' : 'Closed')}
                    {control === 'LED' && `${Math.round(ledIntensity * 100)}%`}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Mode-based availability notice */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>{doorType === 'driver' ? 'Driver' : 'Passenger'} Door - {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode</strong>
            {' - '}Available controls: {availableControls.join(', ')}
          </p>
          {currentMode === 'driving' && (
            <p className="text-xs text-orange-600 mt-1">
              <AlertTriangle className="w-3 h-3 inline mr-1" />Limited controls active for driving safety
            </p>
          )}
          {currentMode === 'valet' && (
            <p className="text-xs text-red-600 mt-1">
              <Shield className="w-3 h-3 inline mr-1" />Security mode - only essential controls available
            </p>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">System Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Window Status */}
          {availableControls.includes('Window') && (
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="mb-2 flex justify-center"><Car className="w-8 h-8" /></div>
              <div className="font-medium text-sm text-blue-800">Window</div>
              <div className="text-xs text-blue-600 mt-1">
                {Math.round(100 - windowPosition)}% Open
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${100 - windowPosition}%` }}
                />
              </div>
            </div>
          )}

          {/* Lock Status */}
          {availableControls.includes('Lock') && (
            <div className={`text-center p-3 rounded-lg ${doorLocked ? 'bg-red-50' : 'bg-green-50'}`}>
              <div className="mb-2 flex justify-center">{doorLocked ? <Lock className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}</div>
              <div className={`font-medium text-sm ${doorLocked ? 'text-red-800' : 'text-green-800'}`}>
                Door Lock
              </div>
              <div className={`text-xs mt-1 ${doorLocked ? 'text-red-600' : 'text-green-600'}`}>
                {doorLocked ? 'Secured' : 'Unlocked'}
              </div>
            </div>
          )}

          {/* Radio Status - Passenger Door Only */}
          {availableControls.includes('Radio') && (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="mb-2 flex justify-center"><Radio className="w-8 h-8" /></div>
              <div className="font-medium text-sm text-green-800">Radio</div>
              <div className="text-xs text-green-600 mt-1">
                Station {radioStation}
              </div>
              <div className="w-full bg-green-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${(radioStation / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Trunk Status - Driver Door Only */}
          {availableControls.includes('Trunk') && (
            <div className={`text-center p-3 rounded-lg ${trunkOpen ? 'bg-orange-50' : 'bg-gray-50'}`}>
              <div className="mb-2 flex justify-center"><Package className="w-8 h-8" /></div>
              <div className={`font-medium text-sm ${trunkOpen ? 'text-orange-800' : 'text-gray-600'}`}>
                Trunk
              </div>
              <div className={`text-xs mt-1 ${trunkOpen ? 'text-orange-600' : 'text-gray-500'}`}>
                {trunkOpen ? 'Open' : 'Closed'}
              </div>
            </div>
          )}

          {/* LED Status */}
          {availableControls.includes('LED') && (
            <div className={`text-center p-3 rounded-lg ${ledIntensity > 0 ? 'bg-purple-50' : 'bg-gray-50'}`}>
              <div className="mb-2 flex justify-center"><Lightbulb className="w-8 h-8" /></div>
              <div className={`font-medium text-sm ${ledIntensity > 0 ? 'text-purple-800' : 'text-gray-600'}`}>
                LED Guides
              </div>
              <div className={`text-xs mt-1 ${ledIntensity > 0 ? 'text-purple-600' : 'text-gray-500'}`}>
                {Math.round(ledIntensity * 100)}% Intensity
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div 
                  className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${ledIntensity * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interaction Instructions */}
      {activeState === 'active' && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Interactive Demo Instructions</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            {availableControls.includes('Window') && <li>• Click Window to show slider for precise position control</li>}
            {availableControls.includes('Lock') && <li>• Click Lock to secure/unlock the door</li>}
            {availableControls.includes('Radio') && <li>• Click Radio to cycle through stations 1-5</li>}
            {availableControls.includes('Trunk') && <li>• Click Trunk to open/close the trunk</li>}
            {availableControls.includes('LED') && <li>• Click LED to show slider for intensity control</li>}
            <li>• Try different vehicle modes to see control restrictions</li>
            <li>• Switch between driver and passenger doors to see different controls</li>
          </ul>
        </div>
      )}

      {activeState !== 'active' && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">System Not Active</h4>
          <p className="text-sm text-gray-600">
            Switch to "Active" state above to interact with the door controls. 
            This simulates how the system activates when you approach the vehicle.
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractionDemo;