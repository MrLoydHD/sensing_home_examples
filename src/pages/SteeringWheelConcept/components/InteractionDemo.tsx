import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InteractionDemoProps {
  activeState: string;
  currentMode: 'drive' | 'cruise' | 'parking';
  pressureLevel: number;
  activeButton: string | null;
  contextualButtons: string[];
  showHapticFeedback: boolean;
  lastAction: string | null;
  onButtonPress: (pressure: number, button: string) => void;
}

export default function InteractionDemo({
  activeState,
  currentMode,
  pressureLevel,
  activeButton,
  contextualButtons,
  showHapticFeedback,
  lastAction,
  onButtonPress
}: InteractionDemoProps) {
  // Simulate different pressure levels
  const simulatePressure = (level: 'light' | 'medium' | 'firm', button: string) => {
    const pressures = {
      light: 25,
      medium: 50,
      firm: 85
    };
    onButtonPress(pressures[level], button);
  };

  if (activeState === 'inactive') {
    return (
      <div className="mt-8 bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">
          Activate the steering wheel to see interaction features
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Interactive Features Demo</h3>
      
      {/* Pressure Sensitivity Demo */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium text-gray-700 mb-4">Pressure Sensitivity</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Try different pressure levels on buttons:
              </p>
              <div className="space-y-2">
                {contextualButtons.slice(0, 2).map(button => (
                  <div key={button} className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulatePressure('light', button)}
                    >
                      Light Touch
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulatePressure('medium', button)}
                    >
                      Medium Press
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => simulatePressure('firm', button)}
                    >
                      Firm Press
                    </Button>
                    <span className="text-sm text-gray-600 self-center">{button}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-3">Current Pressure Level:</p>
              <Progress value={pressureLevel} className="mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Accidental Touch (0-30)</span>
                <span>Intentional Press (60+)</span>
              </div>
              
              {activeButton && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm">
                    <strong>Active Button:</strong> {activeButton}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {pressureLevel < 30 && "Light touch detected - showing guidance"}
                    {pressureLevel >= 30 && pressureLevel < 60 && "Medium pressure - preparing to activate"}
                    {pressureLevel >= 60 && "Button activated with firm press"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contextual Controls */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium text-gray-700 mb-4">
            Contextual Controls - {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {contextualButtons.map((button, index) => (
              <div
                key={button}
                className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all ${
                  activeButton === button 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => onButtonPress(75, button)}
              >
                <div className="text-2xl mb-2">
                  {index === 0 && '🎵'}
                  {index === 1 && '📞'}
                  {index === 2 && '🎤'}
                  {index === 3 && '🚗'}
                </div>
                <p className="text-sm font-medium">{button}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Haptic Feedback Indicator */}
      {showHapticFeedback && lastAction && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
          <p className="text-sm font-medium flex items-center gap-2">
            <span>📳</span> {lastAction}
          </p>
        </div>
      )}

      {/* Tactile Guide Visualization */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium text-gray-700 mb-4">Tactile Guides</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <h5 className="font-medium text-sm mb-2">Raised Rings</h5>
              <p className="text-xs text-gray-600">
                Each button has a raised ring around it, allowing drivers to locate controls by touch alone.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h5 className="font-medium text-sm mb-2">Textured Surfaces</h5>
              <p className="text-xs text-gray-600">
                Different textures help distinguish between control types without looking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}