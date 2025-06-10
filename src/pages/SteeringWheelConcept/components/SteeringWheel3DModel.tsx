import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

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
  const [pressure, setPressure] = useState(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Only animate if state changes
    if (isActive && state.clock.elapsedTime % 0.1 < 0.05) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02);
    }
    
    // Smooth pressure animation with less frequent updates
    if (pressed && pressure < 100) {
      setPressure(prev => Math.min(prev + 10, 100));
      meshRef.current.position.z = -0.02;
    } else if (!pressed && pressure > 0) {
      setPressure(prev => Math.max(prev - 20, 0));
      meshRef.current.position.z = 0;
    }
  });

  useEffect(() => {
    if (pressure > 0) {
      onPress(pressure, label);
    }
  }, [pressure, label, onPress]);

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
      
      {/* Button label text */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.08}
        color={isActive ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.4}
      >
        {label}
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
  onContactSelect,
  onScroll
}: SteeringWheel3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const backWheelRef = useRef<THREE.Mesh>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const { scene } = useGLTF('/Normal Steering Wheel/scene.gltf');
  
  // Button configurations - adjusted for larger model
  const buttonConfigs = {
    drive: [
      { position: [-1.2, 0.4, 0.5], label: 'Media' },
      { position: [1.2, 0.4, 0.5], label: 'Phone' },
      { position: [-1.2, -0.4, 0.5], label: 'Voice' },
      { position: [1.2, -0.4, 0.5], label: 'Cruise' },
    ],
    cruise: [
      { position: [-1.2, 0.4, 0.5], label: 'Speed+' },
      { position: [1.2, 0.4, 0.5], label: 'Speed-' },
      { position: [-1.2, -0.4, 0.5], label: 'Distance' },
      { position: [1.2, -0.4, 0.5], label: 'Cancel' },
    ],
    parking: [
      { position: [-1.2, 0.4, 0.5], label: 'Camera' },
      { position: [1.2, 0.4, 0.5], label: 'Sensors' },
      { position: [-1.2, -0.4, 0.5], label: 'Park Assist' },
      { position: [1.2, -0.4, 0.5], label: 'Emergency' },
    ],
  };

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
      <group position={[0, 1.2, -0.8]} rotation={[0, 0, 0]}>
        <RoundedBox args={[2.5, 1.8, 0.05]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color="#000000"
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        
        {showContactsList ? (
          // Contacts view with speed in corner
          <>
            {/* Contacts header - left side */}
            <Text
              position={[-0.6, 0.6, 0.03]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              📞 CONTACTS
            </Text>
            
            {/* Speed - right side */}
            <group position={[0.6, 0.6, 0.03]}>
              <Text
                fontSize={0.15}
                color="#00ff00"
                anchorX="center"
                anchorY="middle"
              >
                {speed} km/h
              </Text>
            </group>
            
            {/* Contact list */}
            {contacts.slice(0, 4).map((contact, index) => (
              <group key={contact.id} position={[0, 0.2 - index * 0.25, 0.03]}>
                <Text
                  fontSize={0.12}
                  color={selectedContact === contact.id ? '#00ff00' : '#ffffff'}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2.2}
                >
                  {contact.name}
                </Text>
                {selectedContact === contact.id && (
                  <mesh position={[0, 0, -0.01]}>
                    <RoundedBox args={[2.2, 0.2, 0.01]} radius={0.02} smoothness={4}>
                      <meshStandardMaterial 
                        color="#00ff00"
                        transparent
                        opacity={0.3}
                        emissive="#00ff00"
                        emissiveIntensity={0.2}
                      />
                    </RoundedBox>
                  </mesh>
                )}
              </group>
            ))}
          </>
        ) : (
          // Speed-only view
          <>
            <Text
              position={[0, 0.2, 0.03]}
              fontSize={0.4}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
            >
              {speed}
            </Text>
            <Text
              position={[0, -0.2, 0.03]}
              fontSize={0.12}
              color="#00ff00"
              anchorX="center"
              anchorY="middle"
            >
              km/h
            </Text>
          </>
        )}
      </group>

      {/* Back of steering wheel - scrollable area */}
      <mesh 
        ref={backWheelRef}
        position={[0, 0, -0.2]}
        onWheel={(e) => {
          if (showContactsList && onScroll) {
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
          if (showContactsList && Math.abs(e.movementY) > 3) {
            const direction = e.movementY > 0 ? 'down' : 'up';
            setScrollDirection(direction);
            onScroll?.(direction);
            setTimeout(() => setScrollDirection(null), 200);
          }
        }}
      >
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial 
          color={scrollDirection ? '#1e40af' : '#0a0a0a'}
          transparent
          opacity={showContactsList ? 0.15 : 0.05}
          emissive={scrollDirection ? '#1e40af' : '#000000'}
          emissiveIntensity={scrollDirection ? 0.3 : 0}
        />
      </mesh>

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