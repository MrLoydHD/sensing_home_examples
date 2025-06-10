// hapticSoundContext.ts - Context and hook definitions
import { createContext, useContext } from 'react';

// Define the context type
interface HapticSoundContextType {
  playHapticSound: (action: string) => void;
}

// Create context with default value
const HapticSoundContext = createContext<HapticSoundContextType>({
  playHapticSound: () => {}
});

// Custom hook to use the haptic sound context
export const useHapticSound = () => {
  return useContext(HapticSoundContext);
};

// Export the context for the provider
export default HapticSoundContext;