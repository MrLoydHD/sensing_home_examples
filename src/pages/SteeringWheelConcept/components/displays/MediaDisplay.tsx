import { Text } from '@react-three/drei';

interface MediaDisplayProps {
  speed: number;
  currentSong: string;
  artist: string;
  volume: number;
}

export default function MediaDisplay({ speed, currentSong, artist, volume }: MediaDisplayProps) {
  return (
    <>
      {/* Media header - left side */}
      <Text
        position={[-0.6, 0.6, 0.03]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        🎵 MEDIA
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
      
      {/* Current song */}
      <Text
        position={[0, 0.2, 0.03]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {currentSong}
      </Text>
      
      {/* Artist */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.1}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {artist}
      </Text>
      
      {/* Volume */}
      <Text
        position={[0, -0.3, 0.03]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        🔊 Volume: {volume}%
      </Text>
    </>
  );
}