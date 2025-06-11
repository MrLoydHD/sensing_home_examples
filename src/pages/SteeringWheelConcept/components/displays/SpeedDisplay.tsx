import { Text } from '@react-three/drei';

interface SpeedDisplayProps {
  speed: number;
}

export default function SpeedDisplay({ speed }: SpeedDisplayProps) {
  return (
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
  );
}