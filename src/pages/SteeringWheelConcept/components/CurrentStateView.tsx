import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface CurrentStateViewProps {
  activeState: string;
  currentMode: 'drive' | 'cruise' | 'parking';
  handPosition: { left: boolean; right: boolean };
}

export default function CurrentStateView({ 
  activeState, 
  currentMode,
  handPosition 
}: CurrentStateViewProps) {
  const getStateDescription = () => {
    switch (activeState) {
      case 'inactive':
        return {
          title: 'Inactive State',
          description: 'The steering wheel controls are dormant. The surface appears seamless with no visible buttons or indicators.',
          features: [
            'No power consumption',
            'Seamless surface design',
            'No visual distractions',
            'Preserves aesthetic'
          ]
        };
      case 'proximity':
        return {
          title: 'Proximity Detection',
          description: 'Hand presence detected. Basic controls illuminate with soft ambient lighting to guide interaction.',
          features: [
            'Proximity sensors active',
            'Gentle illumination',
            'Essential controls visible',
            'Low power mode'
          ]
        };
      case 'active':
        return {
          title: 'Full Control Mode',
          description: 'All contextual controls are active. Haptic feedback confirms each interaction, and controls adapt to driving conditions.',
          features: [
            'All sensors active',
            'Full haptic feedback',
            'Context-aware buttons',
            'Safety monitoring'
          ]
        };
      default:
        return { title: '', description: '', features: [] };
    }
  };

  const stateInfo = getStateDescription();

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{stateInfo.title}</h3>
        <div className="flex gap-2">
          <Badge variant="outline">{currentMode}</Badge>
          {activeState === 'active' && (
            <>
              {handPosition.left && handPosition.right ? (
                <Badge className="bg-green-500">Safe Position</Badge>
              ) : (
                <Badge variant="destructive">⚠️ Check Hand Position</Badge>
              )}
            </>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{stateInfo.description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stateInfo.features.map((feature, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded text-center">
            <p className="text-sm text-gray-700">{feature}</p>
          </div>
        ))}
      </div>

      {/* Visual representation of current state */}
      <div className="bg-gray-900 rounded-lg p-8 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Steering wheel visualization */}
          <div className={`w-48 h-48 rounded-full border-8 transition-all duration-500 ${
            activeState === 'inactive' ? 'border-gray-700' :
            activeState === 'proximity' ? 'border-gray-600 shadow-lg shadow-blue-500/20' :
            'border-blue-500 shadow-xl shadow-blue-500/40'
          }`}>
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
              <span className={`text-xs font-bold transition-colors ${
                activeState === 'active' ? 'text-blue-400' : 'text-gray-600'
              }`}>
                {currentMode.toUpperCase()}
              </span>
            </div>
            
            {/* Control points */}
            {activeState !== 'inactive' && (
              <>
                {/* Top left */}
                <div className={`absolute top-4 left-4 w-8 h-8 rounded-full transition-all ${
                  activeState === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`} />
                {/* Top right */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full transition-all ${
                  activeState === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`} />
                {/* Bottom left */}
                <div className={`absolute bottom-4 left-4 w-8 h-8 rounded-full transition-all ${
                  activeState === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`} />
                {/* Bottom right */}
                <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full transition-all ${
                  activeState === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                }`} />
              </>
            )}
          </div>
        </div>

        {/* Hand position indicators */}
        {activeState === 'active' && (
          <>
            <div className={`absolute top-1/2 left-8 -translate-y-1/2 px-3 py-1 rounded text-xs font-medium ${
              handPosition.left ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'
            }`}>
              LEFT
            </div>
            <div className={`absolute top-1/2 right-8 -translate-y-1/2 px-3 py-1 rounded text-xs font-medium ${
              handPosition.right ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-pulse'
            }`}>
              RIGHT
            </div>
          </>
        )}
      </div>

      {/* Safety alerts */}
      {activeState === 'active' && (!handPosition.left || !handPosition.right) && (
        <Alert className="mt-4" variant="destructive">
          <AlertDescription>
            Safety Alert: Both hands should be on the steering wheel for optimal control and safety.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}