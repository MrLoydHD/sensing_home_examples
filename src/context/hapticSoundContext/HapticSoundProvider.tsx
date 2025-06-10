// HapticSoundProvider.tsx - The provider component
import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as Tone from 'tone';
import HapticSoundContext from './HapticSoundContext';

interface HapticSoundProviderProps {
  children: ReactNode;
}

const HapticSoundProvider: React.FC<HapticSoundProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Initialize Tone.js and sound effects
    const synth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1
      },
      volume: -12 // Set volume lower to avoid loud sounds
    }).toDestination();
    
    // Create noise generator for static/click sounds
    const noise = new Tone.Noise("white").toDestination();
    noise.volume.value = -20;
    
    // Cleanup function
    return () => {
      if (synth) synth.dispose();
      if (noise) noise.dispose();
    };
  }, [isReady]);

  // The haptic sound player function
  const playHapticSound = (action: string) => {
    // Start audio context on first interaction (needed for browsers)
    if (!isReady) {
      Tone.start();
      setIsReady(true);
    }
    
    // Play sound based on action
    switch(action) {
      case 'Panel activated':
        Tone.getDestination().volume.value = -12;
        new Tone.Synth().toDestination().triggerAttackRelease("C4", 0.1, undefined, 0.5);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("E4", 0.1, undefined, 0.3), 100);
        break;
      case 'Volume up':
        new Tone.Synth().toDestination().triggerAttackRelease("C5", 0.05, undefined, 0.3);
        break;
      case 'Volume down':
        new Tone.Synth().toDestination().triggerAttackRelease("G4", 0.05, undefined, 0.3);
        break;
      case 'Playing':
        new Tone.Synth().toDestination().triggerAttackRelease("G4", 0.05, undefined, 0.4);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("C5", 0.05, undefined, 0.4), 70);
        break;
      case 'Paused':
        new Tone.Synth().toDestination().triggerAttackRelease("C5", 0.05, undefined, 0.4);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("G4", 0.05, undefined, 0.4), 70);
        break;
      case 'Next track':
        new Tone.Synth().toDestination().triggerAttackRelease("E5", 0.05, undefined, 0.3);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("G5", 0.05, undefined, 0.3), 50);
        break;
      case 'Previous track':
        new Tone.Synth().toDestination().triggerAttackRelease("G5", 0.05, undefined, 0.3);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("E5", 0.05, undefined, 0.3), 50);
        break;
      case 'Lights on':
        new Tone.Synth().toDestination().triggerAttackRelease("C6", 0.2, undefined, 0.2);
        break;
      case 'Lights off':
        new Tone.Synth().toDestination().triggerAttackRelease("A3", 0.2, undefined, 0.2);
        break;
      case 'Temperature control':
      case 'Home menu':
        { const noise = new Tone.Noise("white").toDestination();
        noise.volume.value = -20;
        noise.start();
        setTimeout(() => noise.stop(), 50);
        break; }
      case 'Bluetooth on':
        new Tone.Synth().toDestination().triggerAttackRelease("C5", 0.05, undefined, 0.3);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("E5", 0.05, undefined, 0.3), 100);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("G5", 0.05, undefined, 0.3), 200);
        break;
      case 'Bluetooth off':
        new Tone.Synth().toDestination().triggerAttackRelease("G5", 0.05, undefined, 0.3);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("E5", 0.05, undefined, 0.3), 100);
        setTimeout(() => new Tone.Synth().toDestination().triggerAttackRelease("C5", 0.05, undefined, 0.3), 200);
        break;
      default:
        new Tone.Synth().toDestination().triggerAttackRelease("C4", 0.08, undefined, 0.3);
    }
  };

  // The value to be provided to consuming components
  const contextValue = {
    playHapticSound
  };

  return (
    <HapticSoundContext.Provider value={contextValue}>
      {children}
    </HapticSoundContext.Provider>
  );
};

export default HapticSoundProvider;