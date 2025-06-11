import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import SpeedDisplay from './displays/SpeedDisplay';
import MediaDisplay from './displays/MediaDisplay';
import ContactsDisplay from './displays/ContactsDisplay';
import CallingDisplay from './displays/CallingDisplay';

// Button configurations with icons
const buttonConfigs = {
  drive: [
    { position: [-1.2, 0.4, 0.5], label: 'Media', icon: '🎵' },
    { position: [1.2, 0.4, 0.5], label: 'Phone', icon: '📞' },
    { position: [-1.2, -0.4, 0.5], label: 'Voice', icon: '🎤' },
    { position: [1.2, -0.4, 0.5], label: 'Cruise', icon: '🚗' },
  ],
  cruise: [
    { position: [-1.2, 0.4, 0.5], label: 'Speed+', icon: '⬆️' },
    { position: [1.2, 0.4, 0.5], label: 'Speed-', icon: '⬇️' },
    { position: [-1.2, -0.4, 0.5], label: 'Distance', icon: '📏' },
    { position: [1.2, -0.4, 0.5], label: 'Cancel', icon: '❌' },
  ],
  parking: [
    { position: [-1.2, 0.4, 0.5], label: 'Camera', icon: '📷' },
    { position: [1.2, 0.4, 0.5], label: 'Sensors', icon: '📡' },
    { position: [-1.2, -0.4, 0.5], label: 'Park Assist', icon: '🅿️' },
    { position: [1.2, -0.4, 0.5], label: 'Emergency', icon: '🚨' },
  ],
};

interface SteeringWheel3DModelProps {
  activeState: string;
  currentMode: 'drive' | 'cruise' | 'parking';
  activeButton: string | null;
  handPosition: { left: boolean; right: boolean };
  onButtonPress: (pressure: number, button: string) => void;
  onHandPositionChange: (left: boolean, right: boolean) => void;
  onLoad?: () => void;
  speed?: number;
  showContactsList?: boolean;
  contacts?: Array<{id: string, name: string, number: string}>;
  selectedContact?: string | null;
  onContactSelect?: (contactId: string) => void;
  onScroll?: (direction: 'up' | 'down') => void;
  isInCall?: boolean;
  callingContact?: string | null;
  showMediaDisplay?: boolean;
  currentSong?: string;
  artist?: string;
  volume?: number;
  onNextSong?: () => void;
  onPrevSong?: () => void;
}

// Tactile button component
function TactileButton({ 
  position, 
  label, 
  isActive, 
  onPress,
  mode,
  glowColor = '#3b82f6'
}: { 
  position: [number, number, number];
  label: string;
  isActive: boolean;
  onPress: (pressure: number, button: string) => void;
  mode: string;
  glowColor?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pressure] = useState(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Only animate if state changes
    if (isActive && state.clock.elapsedTime % 0.1 < 0.05) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02);
    }
  });

  // Simplified for demo - trigger on click
  const handleClick = () => {
    onPress(100, label); // Always send full pressure for demo
  };

  return (
    <group position={position}>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.25, 0.28, 16]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.4}
          emissive={isActive ? glowColor : '#000000'}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </mesh>
      
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onClick={handleClick}
        castShadow
      >
        <circleGeometry args={[0.25, 16]} />
        <meshStandardMaterial 
          color={pressed ? '#1a1a1a' : '#2d2d2d'}
          emissive={hovered ? glowColor : '#000000'}
          emissiveIntensity={hovered ? 0.15 : 0}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      {/* Button icon */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.15}
        color={isActive ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
      >
        {buttonConfigs[mode]?.find((btn: { label: string; }) => btn.label === label)?.icon || label}
      </Text>
      
      {pressed && (
        <mesh position={[0, 0, -0.01]} scale={[pressure / 100, pressure / 100, 1]}>
          <ringGeometry args={[0.28, 0.32, 16]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// Main steering wheel component with GLTF model
export default function SteeringWheel3DModel({ 
  activeState, 
  currentMode, 
  activeButton,
  handPosition,
  onButtonPress,
  onHandPositionChange,
  onLoad,
  speed = 0,
  showContactsList = false,
  contacts = [],
  selectedContact = null,
  onScroll,
  isInCall = false,
  callingContact = null,
  showMediaDisplay = false,
  currentSong = '',
  artist = '',
  volume = 50,
  onNextSong,
  onPrevSong
}: SteeringWheel3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const backWheelRef = useRef<THREE.Mesh>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const { scene } = useGLTF('/Normal Steering Wheel/scene.gltf');
  
  // Button configurations are now defined at module level

  // Apply materials and shadows to the loaded model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Add emissive glow based on state
          if (child.material && 'emissive' in child.material) {
            child.material.emissive = new THREE.Color(activeState !== 'inactive' ? '#1e40af' : '#000000');
            child.material.emissiveIntensity = activeState === 'active' ? 0.05 : 0.02;
          }
        }
      });
      
      // Call onLoad callback when model is ready
      if (onLoad) {
        onLoad();
      }
    }
  }, [scene, activeState, onLoad]);

  useFrame((state) => {
    if (!groupRef.current || activeState === 'inactive') return;
    
    // Only animate every few frames for performance
    if (state.clock.elapsedTime % 0.05 < 0.025) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
    }
  });

  const handleGripHover = (isLeft: boolean, isHovered: boolean) => {
    if (isLeft) {
      onHandPositionChange(isHovered, handPosition.right);
    } else {
      onHandPositionChange(handPosition.left, isHovered);
    }
  };

  // Scroll handling is now inline in the mesh component for better control

  return (
    <group ref={groupRef}>
      {/* 3D Model */}
      <primitive 
        object={scene} 
        scale={1}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />

      {/* Mode display - adjusted position */}
      <group position={[0, 2.5, 1]}>
        <RoundedBox args={[1.2, 0.4, 0.05]} radius={0.05} smoothness={4}>
          <meshStandardMaterial 
            color="#000000"
            metalness={0.5}
            roughness={0.5}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.03]}
          fontSize={0.2}
          color={currentMode === 'parking' ? '#ef4444' : '#3b82f6'}
          anchorX="center"
          anchorY="middle"
        >
          {currentMode.toUpperCase()}
        </Text>
      </group>

      {/* Main Display - Behind the wheel */}
      <group position={[0, 1.2, -2]} rotation={[0, 0, 0]}>
        <RoundedBox args={[2.5, 1.8, 0.05]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color="#000000"
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        
        {isInCall ? (
          <CallingDisplay speed={speed} callingContact={callingContact} />
        ) : showContactsList ? (
          <ContactsDisplay 
            speed={speed} 
            contacts={contacts} 
            selectedContact={selectedContact} 
          />
        ) : showMediaDisplay ? (
          <MediaDisplay 
            speed={speed} 
            currentSong={currentSong} 
            artist={artist} 
            volume={volume} 
          />
        ) : (
          <SpeedDisplay speed={speed} />
        )}
      </group>

      {/* Back of steering wheel - scrollable area */}
      <mesh 
        ref={backWheelRef}
        position={[0, 0, -0.2]}
        onWheel={(e) => {
          if ((showContactsList || showMediaDisplay) && onScroll) {
            // Reduced sensitivity by requiring larger delta
            if (Math.abs(e.deltaY) > 5) {
              const direction = e.deltaY > 0 ? 'down' : 'up';
              setScrollDirection(direction);
              onScroll(direction);
              setTimeout(() => setScrollDirection(null), 300);
            }
          }
        }}
        onPointerMove={(e) => {
          if ((showContactsList || showMediaDisplay) && onScroll && Math.abs(e.movementY) > 3) {
            const direction = e.movementY > 0 ? 'down' : 'up';
            setScrollDirection(direction);
            onScroll(direction);
            setTimeout(() => setScrollDirection(null), 200);
          }
        }}
      >
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial 
          color={scrollDirection ? '#1e40af' : '#0a0a0a'}
          transparent
          opacity={(showContactsList || showMediaDisplay) ? 0.15 : 0.05}
          emissive={scrollDirection ? '#1e40af' : '#000000'}
          emissiveIntensity={scrollDirection ? 0.3 : 0}
        />
      </mesh>

      {/* Hand grip areas - music controls when in media mode */}
      <group>
        <mesh 
          position={[-2.0, 1, 0.5]}
          onPointerEnter={() => handleGripHover(true, true)}
          onPointerLeave={() => handleGripHover(true, false)}
          onClick={() => {
            if (showMediaDisplay && onPrevSong) {
              onPrevSong();
            }
          }}
        >
          <RoundedBox args={[0.6, 0.6, 0.15]} radius={0.05} smoothness={4}>
            <meshStandardMaterial 
              color={showMediaDisplay ? '#3b82f6' : (handPosition.left ? '#059669' : '#1a1a1a')}
              transparent
              opacity={0.6}
              emissive={showMediaDisplay ? '#3b82f6' : (handPosition.left ? '#059669' : '#000000')}
              emissiveIntensity={showMediaDisplay ? 0.3 : (handPosition.left ? 0.3 : 0)}
            />
          </RoundedBox>
          {/* Previous song icon when in media mode */}
          {showMediaDisplay && (
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.20}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              ⏮️
            </Text>
          )}
        </mesh>

        <mesh 
          position={[2.0, 1, 0.5]}
          onPointerEnter={() => handleGripHover(false, true)}
          onPointerLeave={() => handleGripHover(false, false)}
          onClick={() => {
            if (showMediaDisplay && onNextSong) {
              onNextSong();
            }
          }}
        >
          <RoundedBox args={[0.6, 0.6, 0.15]} radius={0.05} smoothness={4}>
            <meshStandardMaterial 
              color={showMediaDisplay ? '#3b82f6' : (handPosition.right ? '#059669' : '#1a1a1a')}
              transparent
              opacity={0.6}
              emissive={showMediaDisplay ? '#3b82f6' : (handPosition.right ? '#059669' : '#000000')}
              emissiveIntensity={showMediaDisplay ? 0.3 : (handPosition.right ? 0.3 : 0)}
            />
          </RoundedBox>
          {/* Next song icon when in media mode */}
          {showMediaDisplay && (
            <Text
              position={[0, 0, 0.08]}
              fontSize={0.20}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              ⏭️
            </Text>
          )}
        </mesh>
      </group>

      {/* Contextual buttons */}
      {activeState !== 'inactive' && (
        <group>
          {buttonConfigs[currentMode].map((config, index) => (
            <TactileButton
              key={`${currentMode}-${index}`}
              position={config.position as [number, number, number]}
              label={config.label}
              isActive={activeButton === config.label}
              onPress={onButtonPress}
              mode={currentMode}
              glowColor={currentMode === 'parking' ? '#ef4444' : '#3b82f6'}
            />
          ))}
        </group>
      )}

      {/* Safety indicator - adjusted position */}
      {(!handPosition.left || !handPosition.right) && activeState === 'active' && (
        <Text
          position={[0, -3.5, 1]}
          fontSize={0.18}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
        >
          ⚠️ Keep both hands on wheel
        </Text>
      )}

    </group>
  );
}

// Preload the model
useGLTF.preload('/Normal Steering Wheel/scene.gltf');