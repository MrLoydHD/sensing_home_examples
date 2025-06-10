import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface StateSelectorProps {
  activeState: string;
  handleStateChange: (state: string) => void;
  currentMode: 'drive' | 'cruise' | 'parking';
  onModeChange: (mode: 'drive' | 'cruise' | 'parking') => void;
}

export default function StateSelector({ 
  activeState, 
  handleStateChange,
  currentMode,
  onModeChange
}: StateSelectorProps) {
  const states = [
    { value: 'inactive', label: 'Inactive', description: 'Panel is off' },
    { value: 'proximity', label: 'Proximity', description: 'Hand detected' },
    { value: 'active', label: 'Active', description: 'Full controls' },
  ];

  const modes = [
    { value: 'drive', label: 'Drive Mode', color: 'bg-blue-500' },
    { value: 'cruise', label: 'Cruise Mode', color: 'bg-green-500' },
    { value: 'parking', label: 'Parking Mode', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6 mt-6">
      {/* State selector */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-blue-600 font-semibold mb-3">Interaction States</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {states.map((state) => (
            <Button
              key={state.value}
              variant={activeState === state.value ? 'default' : 'outline'}
              onClick={() => handleStateChange(state.value)}
              className="flex flex-col items-center p-3 h-auto"
            >
              <span className="font-medium">{state.label}</span>
              <span className="text-xs opacity-70">{state.description}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Mode selector */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-gray-700 font-semibold mb-3">Driving Modes</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {modes.map((mode) => (
            <Button
              key={mode.value}
              variant={currentMode === mode.value ? 'default' : 'outline'}
              onClick={() => onModeChange(mode.value as 'drive' | 'cruise' | 'parking')}
              className="flex items-center gap-2"
            >
              <Badge className={`${mode.color} text-white`}>
                {mode.value.charAt(0).toUpperCase()}
              </Badge>
              <span>{mode.label}</span>
            </Button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Contextual buttons change based on the selected driving mode
        </p>
      </div>
    </div>
  );
}