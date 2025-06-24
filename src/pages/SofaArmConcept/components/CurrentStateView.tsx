import type { JSX } from "react";

interface CurrentStateViewProps {
  activeState: string;
  renderCurrentStateView: (state: string) => JSX.Element;
}

const CurrentStateView: React.FC<CurrentStateViewProps> = ({ activeState, renderCurrentStateView }) => {
  const getStateDetails = (state: string) => {
    switch(state) {
      case 'inactive':
        return {
          title: 'Invisible Interface',
          description: 'The interface blends completely with the sofa material, preserving aesthetics while remaining available when needed.',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground'
        };
      case 'proximity':
        return {
          title: 'Context-Aware Activation',
          description: 'Proximity sensors detect hand movement and reveal basic controls, adapting to the current entertainment context.',
          bgColor: 'bg-secondary',
          textColor: 'text-primary'
        };
      case 'active':
        return {
          title: 'Full Control Interface',
          description: 'The full interface provides intuitive control over media playback, volume, and smart home features with haptic feedback.',
          bgColor: 'bg-accent/50',
          textColor: 'text-accent-foreground'
        };
      default:
        return {
          title: 'Unknown State',
          description: '',
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground'
        };
    }
  };

  const stateDetails = getStateDetails(activeState);

  return (
    <div className="mt-6 bg-card rounded-xl p-5 shadow-md">
      <h2 className="text-card-foreground mb-5 text-xl border-b border-border pb-3">
        Current View: {activeState.charAt(0).toUpperCase() + activeState.slice(1)} State
      </h2>
      
      <div className="h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-lg mb-5">
        {renderCurrentStateView(activeState)}
      </div>
      
      {/* Current state explanation */}
      <div className={`p-4 rounded-lg mt-5 ${stateDetails.bgColor}`}>
        <h3 className={`mt-0 ${stateDetails.textColor}`}>
          {stateDetails.title}
        </h3>
        <p className="m-0 text-muted-foreground">
          {stateDetails.description}
        </p>
      </div>
    </div>
  );
};

export default CurrentStateView;