import { Fragment, type JSX } from "react/jsx-runtime";

interface StateSelectorProps {
  activeState: string;
  handleStateChange: (stateId: string) => void;
  renderFunction: (stateId: string) => JSX.Element;
}

const StateSelector = ({ activeState, handleStateChange, renderFunction }: StateSelectorProps) => {
  const states = [
    {
      id: 'inactive',
      title: 'Inactive State',
      description: 'Completely blended with sofa',
      info: 'The interface is invisible when not in use, with only a subtle power indicator that occasionally pulses to \nindicate availability.'
    },
    {
      id: 'proximity',
      title: 'Proximity Detection',
      description: 'Hand approach detection',
      info: 'As the user\'s hand approaches, a soft glow appears with basic interface elements revealing the \ninteractive area.'
    },
    {
      id: 'active',
      title: 'Active State',
      description: 'Full interface revealed',
      info: 'When touched, the full interface appears with media controls, volume adjustment, and smart home options.'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-5 mt-8">
      {states.map(state => (
        <StateCard 
          key={state.id}
          state={state}
          isActive={activeState === state.id}
          onClick={() => handleStateChange(state.id)}
          renderContent={() => renderFunction(state.id)}
        />
      ))}
    </div>
  );
};

interface StateCardProps {
  state: {
    id: string;
    title: string;
    description: string;
    info: string;
  };
  isActive: boolean;
  onClick: () => void;
  renderContent: () => JSX.Element;
}

const StateCard = ({ state, isActive, onClick, renderContent }: StateCardProps) => (
  <div 
    className={`w-full sm:w-[280px] lg:w-[300px] bg-white rounded-xl p-5 shadow-sm mb-5 cursor-pointer transition-all border-2 ${
      isActive ? 'border-blue-500' : 'border-transparent'
    }`}
    onClick={onClick}
  >
    <h3 className="text-blue-600 mb-3 flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
      {state.title}
    </h3>
    <div className="h-48 relative">
      {renderContent()}
    </div>
    <p className="text-start font-bold mt-4 text-gray-800">{state.description}</p>
    <p className="text-sm text-start mt-1 text-gray-600">
      {state.info.split('\n').map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>
  </div>
);

export default StateSelector;