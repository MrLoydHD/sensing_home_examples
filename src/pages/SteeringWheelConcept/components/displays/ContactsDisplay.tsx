import { Text, RoundedBox } from '@react-three/drei';

interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactsDisplayProps {
  speed: number;
  contacts: Contact[];
  selectedContact: string | null;
}

export default function ContactsDisplay({ speed, contacts, selectedContact }: ContactsDisplayProps) {
  return (
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
  );
}