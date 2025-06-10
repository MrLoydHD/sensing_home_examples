import { motion } from 'framer-motion';

interface ProximitySofaArmProps {
  activeDevice: 'tv' | 'soundbar' | 'smartHome';
  currentMedia: { title: string };
  handleStateChange: (state: string) => void;
  size: 'normal' | 'large';
}

const ProximitySofaArm: React.FC<ProximitySofaArmProps> = ({ activeDevice, currentMedia, handleStateChange, size }) => {

  const containerHeight = size === 'large' ? 'h-64 md:h-72' : 'h-48 md:h-52';


  return (
    <div 
      className={`${containerHeight} h-48 md:h-52 rounded-xl my-2 relative overflow-hidden transition-all duration-500 cursor-pointer bg-gradient-to-br from-[#8b7765] via-[#9c8775] to-[#7a6855] shadow-inner`}
      onClick={() => handleStateChange('active')}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 rounded-full bg-blue-400/10"
        animate={{
          opacity: [0.6, 1, 0.6], // Breathing effect
        }}
        transition={{
          duration: 2, // Duration of one cycle
          repeat: Infinity, // Infinite loop
        }}
      ></motion.div>
      
      {/* Active power button */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/20 flex justify-center items-center">
        <div className="w-3 h-3 rounded-full bg-white/60"></div>
      </div>
      
      {/* Context-aware hint based on what device is active */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 text-base font-medium text-center py-2 px-5 bg-black/20 rounded-full backdrop-blur-sm">
        {activeDevice === 'tv' ? 'Tap to control TV' : 
         activeDevice === 'soundbar' ? 'Tap to control audio' : 
         'Tap to control smart home'}
      </div>
      
      {/* Ambient information */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs font-normal">
        {currentMedia.title}
      </div>
    </div>
  );
};

export default ProximitySofaArm;