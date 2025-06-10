import { motion } from 'framer-motion';

interface InactiveSofaArmProps {
  handleStateChange: (state: string) => void;
  size: 'normal' | 'large';
}

const InactiveSofaArm = ({ handleStateChange, size }: InactiveSofaArmProps) => {

  const containerHeight = size === 'large' ? 'h-64 md:h-72' : 'h-48 md:h-52';

  return (
    <div 
      className={`${containerHeight} h-48 md:h-52 rounded-xl my-2 relative overflow-hidden transition-all duration-500 cursor-pointer bg-gradient-to-br from-[#8b7765] via-[#9c8775] to-[#7a6855] shadow-inner`}
      onClick={() => handleStateChange('proximity')}
    >
      {/* Subtle power button/indicator */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/30 flex justify-center items-center"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(255,255,255,0.1)',
            '0 0 0 6px rgba(255,255,255,0)',
            '0 0 0 0 rgba(255,255,255,0)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white/20"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default InactiveSofaArm;