import { motion } from 'framer-motion';
import HoverAnnounceWrapper from '@/wrappers/HoverAnnounceWrapper';

type ActiveSofaArmProps = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentVolume: number;
  setCurrentVolume: (volume: number) => void;
  getPanelOpacity: () => string | number;
  currentMedia: {
    title: string;
    type: string;
    source: string;
    position: string;
  };
  connectedDevices: { id: string; name: string; active: boolean }[];
  setConnectedDevices: React.Dispatch<React.SetStateAction<{ id: string; name: string; active: boolean }[]>>;
  bluetoothConnected: boolean;
  setBluetoothConnected: (connected: boolean) => void;
  triggerHapticFeedback: (action: string) => void;
  showHapticFeedback: boolean;
  lastAction: string | null; // Updated to allow null
  size: 'normal' | 'large'; // 'normal' or 'large'
  handleStateChange?: (state: string) => void; // Make this optional if it's not always required
};

const ActiveSofaArm = ({ 
  isPlaying, 
  setIsPlaying, 
  currentVolume, 
  setCurrentVolume, 
  getPanelOpacity, 
  currentMedia, 
  connectedDevices, 
  setConnectedDevices, 
  bluetoothConnected, 
  setBluetoothConnected, 
  triggerHapticFeedback, 
  showHapticFeedback, 
  lastAction,
  size = 'normal' // 'normal' for the card in the row of 3, 'large' for the detailed view
}: ActiveSofaArmProps) => {
  // Determine height based on size prop
  const containerHeight = size === 'large' ? 'h-64 md:h-72' : 'h-48 md:h-52';
  const panelHeight = size === 'large' ? 'h-[250px]' : 'h-[170px]';
  
  return (
    <div className={`${containerHeight} rounded-xl my-2 relative overflow-hidden transition-all duration-500 cursor-pointer bg-gradient-to-br from-[#8b7765] via-[#9c8775] to-[#7a6855] shadow-inner`}>
      {/* Panel background with adaptive brightness */}
      <div 
        className={`absolute top-4 left-1/2 -translate-x-1/2 w-[90%] ${panelHeight} rounded-xl shadow-lg backdrop-blur-sm`}
        style={{ backgroundColor: `rgba(30,30,40,${getPanelOpacity()})` }}
      >
        {/* Central media display */}
        <HoverAnnounceWrapper description={`Media display: ${currentMedia.title}, ${currentMedia.type} from ${currentMedia.source}. Current position: ${currentMedia.position}`}>
          <MediaDisplay 
            currentMedia={currentMedia} 
            currentVolume={currentVolume} 
            size={size}
          />
        </HoverAnnounceWrapper>
        
        {/* Media control buttons */}
        <MediaControls 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          triggerHapticFeedback={triggerHapticFeedback}
          size={size}
        />
        
        {/* Volume controls (right side) */}
        <VolumeControls 
          currentVolume={currentVolume} 
          setCurrentVolume={setCurrentVolume} 
          triggerHapticFeedback={triggerHapticFeedback}
          size={size}
        />
        
        {/* Smart home controls (top) */}
        <SmartHomeControls 
          connectedDevices={connectedDevices} 
          setConnectedDevices={setConnectedDevices} 
          bluetoothConnected={bluetoothConnected} 
          setBluetoothConnected={setBluetoothConnected} 
          triggerHapticFeedback={triggerHapticFeedback}
          size={size}
        />
      </div>
      
      {/* Haptic feedback visual indicator */}
      {showHapticFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute bottom-0 left-1/2 bg-black/70 text-white py-1.5 px-3 rounded-full text-xs flex items-center gap-1"
        >
          <span className="text-xs">⚡</span>
          {lastAction}
        </motion.div>
      )}
    </div>
  );
};

// Sub-components with hover announcement wrappers
type MediaDisplayProps = {
  currentMedia: {
    title: string;
    type: string;
    source: string;
    position: string;
  };
  currentVolume: number;
  size?: 'normal' | 'large';
};

const MediaDisplay = ({ currentMedia, currentVolume, size }: MediaDisplayProps) => {
  // Adjust size based on the parent's size prop
  const displaySize = size === 'large' ? 'w-36 h-36' : 'w-28 h-28';
  const titleSize = size === 'large' ? 'text-base' : 'text-sm';
  const typeSize = size === 'large' ? 'text-sm' : 'text-xs';
  const infoSize = size === 'large' ? 'text-xs' : 'text-[10px]';
  const positionSize = size === 'large' ? 'text-[11px]' : 'text-[9px]';
  
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${displaySize} rounded-full bg-[rgba(20,20,30,0.7)] flex flex-col justify-center items-center text-white text-center p-1 shadow-lg`}>
      <div className={`${typeSize} font-bold mb-1`}>{currentMedia.type}</div>
      <div className={`${titleSize} font-bold text-white/90`}>{currentMedia.title}</div>
      <div className={`${infoSize} text-white/60 mb-2`}>{currentMedia.source}</div>
      <div className={`${positionSize} text-white/50 py-1 px-2 bg-white/10 rounded-full`}>
        {currentMedia.position}
      </div>
      
      {/* Volume indicator */}
      <div className="w-4/5 h-[3px] bg-white/20 rounded-sm mt-2 relative">
        <div 
          className="absolute left-0 top-0 h-full rounded-sm bg-blue-500"
          style={{ width: `${currentVolume}%` }}
        ></div>
      </div>
      <div className={`${positionSize} text-white/50 mt-1`}>
        Volume: {currentVolume}%
      </div>
    </div>
  );
};

type MediaControlsProps = Pick<ActiveSofaArmProps, 'isPlaying' | 'setIsPlaying' | 'triggerHapticFeedback' | 'size'>;

const MediaControls = ({ isPlaying, setIsPlaying, triggerHapticFeedback, size }: MediaControlsProps) => {
  // Adjust position and size based on the parent's size prop
  const buttonSpacing = size === 'large' ? 'w-44' : 'w-43';
  const playButtonSize = size === 'large' ? 'w-12 h-12' : 'w-10 h-10';
  const controlButtonSize = size === 'large' ? 'w-10 h-10' : 'w-8 h-8';
  const bottomPosition = size === 'large' ? 'bottom-6' : 'bottom-4';
  
  return (
    <div className={`absolute ${bottomPosition} left-1/2 -translate-x-1/2 translate-y-3 ${buttonSpacing} flex justify-between items-center`}>
      {/* Previous button */}
      <HoverAnnounceWrapper description="Previous track button">
        <div 
          className={`${controlButtonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            triggerHapticFeedback('Previous track');
          }}
        >
          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-r-white/80 mr-0.5"></div>
        </div>
      </HoverAnnounceWrapper>
      
      {/* Play/Pause button */}
      <HoverAnnounceWrapper description={isPlaying ? "Pause button" : "Play button"}>
        <div 
          className={`${playButtonSize} rounded-full bg-white/20 flex justify-center items-center cursor-pointer hover:bg-white/30 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
            triggerHapticFeedback(isPlaying ? 'Paused' : 'Playing');
          }}
        >
          {isPlaying ? (
            <div className="w-3.5 h-3.5 flex">
              <div className="w-1 h-full bg-white/90 mr-1"></div>
              <div className="w-1 h-full bg-white/90"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-white/90 ml-0.5"></div>
          )}
        </div>
      </HoverAnnounceWrapper>
      
      {/* Next button */}
      <HoverAnnounceWrapper description="Next track button">
        <div 
          className={`${controlButtonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            triggerHapticFeedback('Next track');
          }}
        >
          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-white/80 ml-0.5"></div>
        </div>
      </HoverAnnounceWrapper>
    </div>
  );
};

type VolumeControlsProps = Pick<ActiveSofaArmProps, 'currentVolume' | 'setCurrentVolume' | 'triggerHapticFeedback' | 'size'>;

const VolumeControls = ({ currentVolume, setCurrentVolume, triggerHapticFeedback, size }: VolumeControlsProps ) => {
  // Adjust size based on the parent's size prop
  const buttonSize = size === 'large' ? 'w-8 h-8' : 'w-7 h-7';
  const rightPosition = size === 'large' ? 'right-6' : 'right-4';
  
  return (
    <div className={`absolute top-1/2 ${rightPosition} -translate-y-1/2 flex flex-col gap-4`}>
      {/* Volume up button */}
      <HoverAnnounceWrapper description={`Volume up button. Current volume: ${currentVolume}%`}>
        <div 
          className={`${buttonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentVolume(Math.min(100, currentVolume + 5));
            triggerHapticFeedback('Volume up');
          }}
        >
          <div className="text-white/80 text-base">+</div>
        </div>
      </HoverAnnounceWrapper>
      
      {/* Volume down button */}
      <HoverAnnounceWrapper description={`Volume down button. Current volume: ${currentVolume}%`}>
        <div 
          className={`${buttonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentVolume(Math.max(0, currentVolume - 5));
            triggerHapticFeedback('Volume down');
          }}
        >
          <div className="text-white/80 text-base">−</div>
        </div>
      </HoverAnnounceWrapper>
    </div>
  );
};

type SmartHomeControlsProps = Pick<ActiveSofaArmProps, 'connectedDevices' | 'setConnectedDevices' | 'bluetoothConnected' | 'setBluetoothConnected' | 'triggerHapticFeedback' | 'size'>;

const SmartHomeControls = ({ 
  connectedDevices, 
  setConnectedDevices, 
  bluetoothConnected, 
  setBluetoothConnected, 
  triggerHapticFeedback,
  size 
} :  SmartHomeControlsProps) => {
  // Adjust size and position based on the parent's size prop
  const buttonSize = size === 'large' ? 'w-8 h-8' : 'w-7 h-7';
  const barWidth = size === 'large' ? 'w-52' : 'w-44';
  const topPosition = size === 'large' ? 'top-6' : 'top-4';
  
  // Get light status for descriptions
  const lightsActive = connectedDevices.find(d => d.id === 'lights')?.active;
  
  return (
    <div className={`absolute ${topPosition} left-1/2 -translate-x-1/2 -translate-y-2 ${barWidth} flex justify-between`}>
      {/* Lights */}
      <HoverAnnounceWrapper description={`Light switch. Status: ${lightsActive ? 'On' : 'Off'}`}>
        <div 
          className={`${buttonSize} rounded-full ${
            lightsActive ? 'bg-yellow-200/30' : 'bg-white/15'
          } flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            const newDevices = connectedDevices.map(d => 
              d.id === 'lights' ? {...d, active: !d.active} : d
            );
            setConnectedDevices(newDevices);
            triggerHapticFeedback(
              newDevices.find(d => d.id === 'lights')?.active 
                ? 'Lights on' 
                : 'Lights off'
            );
          }}
        >
          <span className="text-xs">💡</span>
        </div>
      </HoverAnnounceWrapper>
      
      {/* Temperature */}
      <HoverAnnounceWrapper description="Temperature control">
        <div 
          className={`${buttonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            triggerHapticFeedback('Temperature control');
          }}
        >
          <span className="text-xs">🌡️</span>
        </div>
      </HoverAnnounceWrapper>
      
      {/* Home */}
      <HoverAnnounceWrapper description="Home menu button">
        <div 
          className={`${buttonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            triggerHapticFeedback('Home menu');
          }}
        >
          <span className="text-xs">🏠</span>
        </div>
      </HoverAnnounceWrapper>
      
      {/* Connected devices */}
      <HoverAnnounceWrapper description={`Bluetooth connection. Status: ${bluetoothConnected ? 'Connected' : 'Disconnected'}`}>
        <div 
          className={`${buttonSize} rounded-full bg-white/15 flex justify-center items-center cursor-pointer hover:bg-white/25 transition-all relative`}
          onClick={(e) => {
            e.stopPropagation();
            setBluetoothConnected(!bluetoothConnected);
            triggerHapticFeedback(bluetoothConnected ? 'Bluetooth off' : 'Bluetooth on');
          }}
        >
          <span className="text-xs">{bluetoothConnected ? '📲' : '📶'}</span>
          
          {/* Connection indicator */}
          <div 
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black/10 ${
              bluetoothConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
        </div>
      </HoverAnnounceWrapper>
    </div>
  );
};

export default ActiveSofaArm;