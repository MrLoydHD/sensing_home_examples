import { Button } from '@/components/ui/button';
import { Moon, Radar, Hand } from 'lucide-react';

interface StateSelectorProps {
  activeState: string;
  handleStateChange: (state: string) => void;
  currentMode: 'parked' | 'driving' | 'valet';
  onModeChange: (mode: 'parked' | 'driving' | 'valet') => void;
}

const StateSelector = ({ 
  activeState, 
  handleStateChange, 
  currentMode, 
  onModeChange 
}: StateSelectorProps) => {
  const states = [
    { 
      id: 'inactive', 
      label: 'Inactive', 
      description: 'Door controls are dormant and LED guides are off',
      icon: <Moon className="w-8 h-8" />
    },
    { 
      id: 'proximity', 
      label: 'Proximity', 
      description: 'Key fob detected, LED guides illuminate softly',
      icon: <Radar className="w-8 h-8" />
    },
    { 
      id: 'active', 
      label: 'Active', 
      description: 'Touch controls are responsive with full LED guidance',
      icon: <Hand className="w-8 h-8" />
    }
  ];

  const modes = [
    {
      id: 'parked' as const,
      label: 'Parked',
      description: 'Full access to all door controls',
      controls: 'Window, Lock, Radio, LED',
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      id: 'driving' as const,
      label: 'Driving',
      description: 'Limited controls for safety',
      controls: 'Window, Radio only',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      id: 'valet' as const,
      label: 'Valet',
      description: 'Security mode with minimal access',
      controls: 'Lock only',
      color: 'bg-red-100 border-red-300 text-red-800'
    }
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* State Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Interaction States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {states.map((state) => (
            <Button
              key={state.id}
              variant={activeState === state.id ? 'default' : 'outline'}
              onClick={() => handleStateChange(state.id)}
              className="h-auto flex flex-col items-center p-4 text-center"
            >
              <div className="mb-2">{state.icon}</div>
              <span className="font-semibold">{state.label}</span>
              <span className="text-xs mt-1 opacity-75 leading-tight">{state.description}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Vehicle Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant={currentMode === mode.id ? "default" : "outline"}
              onClick={() => onModeChange(mode.id)}
              className={`h-auto p-4 text-left justify-start ${
                currentMode === mode.id 
                  ? mode.color
                  : ''
              }`}
            >
              <div className="w-full">
                <div className="font-semibold text-sm mb-1">{mode.label}</div>
                <div className="text-xs mb-2 opacity-80">{mode.description}</div>
                <div className="text-xs font-medium bg-white/50 px-2 py-1 rounded">
                  {mode.controls}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateSelector;