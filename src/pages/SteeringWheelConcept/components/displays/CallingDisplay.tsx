import { Text } from '@react-three/drei';

interface CallingDisplayProps {
  speed: number;
  callingContact: string | null;
}

export default function CallingDisplay({ speed, callingContact }: CallingDisplayProps) {
  return (
    <>
      {/* Call status - center */}
      <Text
        position={[0, 0.3, 0.03]}
        fontSize={0.2}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
      >
        📞 CALLING
      </Text>
      
      {/* Contact name */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {callingContact}
      </Text>
      
      {/* Speed - small corner */}
      <group position={[0.8, 0.6, 0.03]}>
        <Text
          fontSize={0.1}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
        >
          {speed} km/h
        </Text>
      </group>
    </>
  );
}