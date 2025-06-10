import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Text, RoundedBox, useTexture, MeshReflectorMaterial, useGLTF, useFBX, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import LoadingSpinner from './LoadingSpinner';

// Lazy load the 3D model component
const SteeringWheel3DModel = lazy(() => import('./SteeringWheel3DModel'));

interface SteeringWheel3DProps {
  activeState: string;
  currentMode: 'drive' | 'cruise' | 'parking';
  activeButton: string | null;
  handPosition: { left: boolean; right: boolean };
  onButtonPress: (pressure: number, button: string) => void;
  onHandPositionChange: (left: boolean, right: boolean) => void;
}

// Tactile button component with more realistic design
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
      {/* Raised tactile guide - more subtle */}
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
      
      {/* Touch sensitive area with better materials */}
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
      
      {/* Button icon/symbol instead of text */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshBasicMaterial 
          color={isActive ? '#ffffff' : '#666666'}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Pressure indicator ring */}
      {pressed && (
        <mesh position={[0, 0, -0.01]} scale={[pressure / 100, pressure / 100, 1]}>
          <ringGeometry args={[0.28, 0.32, 16]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// Loading component that shows progress
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-400 text-sm">
          Loading 3D Model... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

// Simple Error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactElement;
}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Failed to load 3D model:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="text-center">
            <p className="text-red-500 text-sm">Failed to load 3D model</p>
            <p className="text-gray-400 text-xs mt-2">Using simplified view</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

// Simplified fallback steering wheel (only shown on error)
function FallbackSteeringWheel({ 
  activeState, 
  currentMode, 
  activeButton,
  handPosition,
  onButtonPress,
  onHandPositionChange 
}: SteeringWheel3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRef = useRef<THREE.Group>(null);

  // Button configurations
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

  useFrame((state) => {
    if (!wheelRef.current || activeState === 'inactive') return;
    
    // Only animate every few frames
    if (state.clock.elapsedTime % 0.05 < 0.025) {
      wheelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
      wheelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
    }
  });

  const handleGripHover = (isLeft: boolean, isHovered: boolean) => {
    if (isLeft) {
      onHandPositionChange(isHovered, handPosition.right);
    } else {
      onHandPositionChange(handPosition.left, isHovered);
    }
  };

  return (
    <group ref={groupRef}>
      <group ref={wheelRef}>
        {/* Main wheel rim */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[2, 0.25, 6, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.7}
            emissive={activeState !== 'inactive' ? '#1e40af' : '#000000'}
            emissiveIntensity={activeState === 'active' ? 0.05 : 0.02}
          />
        </mesh>

        {/* Leather wrap texture simulation */}
        <mesh>
          <torusGeometry args={[2, 0.26, 8, 32]} />
          <meshStandardMaterial 
            color="#0a0a0a"
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Center hub */}
        <group>
          <mesh position={[0, 0, 0.1]} castShadow>
            <cylinderGeometry args={[0.7, 0.75, 0.2, 16]} />
            <meshStandardMaterial 
              color="#1f1f1f"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          <mesh position={[0, 0, 0.2]}>
            <torusGeometry args={[0.65, 0.05, 6, 16]} />
            <meshStandardMaterial 
              color="#ffffff"
              metalness={1}
              roughness={0}
            />
          </mesh>

          <mesh position={[0, 0, 0.21]}>
            <circleGeometry args={[0.6, 16]} />
            <meshStandardMaterial 
              color="#0f0f0f"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Mode display */}
        <group position={[0, 0, 0.25]}>
          <RoundedBox args={[0.8, 0.3, 0.05]} radius={0.05} smoothness={4}>
            <meshStandardMaterial 
              color="#000000"
              metalness={0.5}
              roughness={0.5}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.15}
            color={currentMode === 'parking' ? '#ef4444' : '#3b82f6'}
            anchorX="center"
            anchorY="middle"
          >
            {currentMode.toUpperCase()}
          </Text>
        </group>

        {/* Spokes */}
        {[0, 120, 240].map((angle, i) => (
          <group key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <mesh position={[1, 0, 0]}>
              <boxGeometry args={[1.8, 0.4, 0.15]} />
              <meshStandardMaterial 
                color="#1a1a1a"
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[1, 0, 0.08]}>
              <boxGeometry args={[1.6, 0.3, 0.02]} />
              <meshStandardMaterial 
                color="#2a2a2a"
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>
          </group>
        ))}

        {/* Hand grip areas */}
        <group>
          <mesh 
            position={[-1.7, 0.7, 0.2]}
            onPointerEnter={() => handleGripHover(true, true)}
            onPointerLeave={() => handleGripHover(true, false)}
          >
            <RoundedBox args={[0.5, 0.7, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial 
                color={handPosition.left ? '#059669' : '#1a1a1a'}
                transparent
                opacity={0.6}
                emissive={handPosition.left ? '#059669' : '#000000'}
                emissiveIntensity={handPosition.left ? 0.3 : 0}
              />
            </RoundedBox>
          </mesh>

          <mesh 
            position={[1.7, 0.7, 0.2]}
            onPointerEnter={() => handleGripHover(false, true)}
            onPointerLeave={() => handleGripHover(false, false)}
          >
            <RoundedBox args={[0.5, 0.7, 0.1]} radius={0.05} smoothness={4}>
              <meshStandardMaterial 
                color={handPosition.right ? '#059669' : '#1a1a1a'}
                transparent
                opacity={0.6}
                emissive={handPosition.right ? '#059669' : '#000000'}
                emissiveIntensity={handPosition.right ? 0.3 : 0}
              />
            </RoundedBox>
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

        {/* Perforated leather detail - removed for performance */}
      </group>

      {/* Safety indicator */}
      {(!handPosition.left || !handPosition.right) && activeState === 'active' && (
        <Text
          position={[0, -1.8, 0.5]}
          fontSize={0.12}
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

// Main 3D view component with better lighting and environment
export default function SteeringWheel3D(props: SteeringWheel3DProps) {
  const [modelLoaded, setModelLoaded] = useState(false);
  
  return (
    <div className="h-[600px] relative">
      {!modelLoaded && (
        <div className="absolute inset-0 z-10">
          <LoadingSpinner />
        </div>
      )}
      <div className={`h-full transition-opacity duration-500 ${!modelLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 8], fov: 40 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg"
        >
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={40} />
          <OrbitControls 
            enablePan={false}
            minDistance={5}
            maxDistance={10}
            maxPolarAngle={Math.PI / 1.8}
            target={[0, 0, 0]}
          />
          
          {/* Optimized lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[512, 512]}
            shadow-camera-near={0.1}
            shadow-camera-far={15}
            shadow-camera-left={-3}
            shadow-camera-right={3}
            shadow-camera-top={3}
            shadow-camera-bottom={-3}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.2} color="#60a5fa" />
          
          <Suspense fallback={<Loader />}>
            <ErrorBoundary fallback={<FallbackSteeringWheel {...props} />}>
              <SteeringWheel3DModel 
                {...props} 
                onLoad={() => setModelLoaded(true)}
              />
            </ErrorBoundary>
          </Suspense>
        
        {/* Ground with reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#151515"
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>
        
        {/* Environment removed for performance */}
        </Canvas>
      </div>
    </div>
  );
}