import React, { useState, Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useProgress, Html } from '@react-three/drei';
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
  speed?: number;
  showContactsList?: boolean;
  contacts?: Array<{id: string, name: string, number: string}>;
  selectedContact?: string | null;
  onScroll?: (direction: 'up' | 'down') => void;
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
            <ErrorBoundary fallback={
              <Html center>
                <div className="text-center p-4 bg-red-900 bg-opacity-80 rounded-lg">
                  <p className="text-red-400 font-semibold">❌ Failed to load 3D model</p>
                  <p className="text-red-300 text-sm mt-1">Please refresh the page</p>
                </div>
              </Html>
            }>
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