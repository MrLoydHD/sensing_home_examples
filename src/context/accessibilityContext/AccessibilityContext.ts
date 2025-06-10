// accessibilityContext.ts - Context and hook definitions
import { createContext, useContext } from 'react';

// Define the context type
interface AccessibilityContextType {
  isScreenReaderEnabled: boolean;
  isHoverAnnouncementEnabled: boolean;
  toggleScreenReader: () => void;
  toggleHoverAnnouncements: () => void;
  speakText: (text: string) => void;
  speakAction: (action: string | null) => void;
  announceHover: (elementDescription: string) => void;
}

// Create context with default values
const AccessibilityContext = createContext<AccessibilityContextType>({
  isScreenReaderEnabled: false,
  isHoverAnnouncementEnabled: true,
  toggleScreenReader: () => {},
  toggleHoverAnnouncements: () => {},
  speakText: () => {},
  speakAction: () => {},
  announceHover: () => {}
});

// Custom hook to use the accessibility context
export const useAccessibility = () => {
  return useContext(AccessibilityContext);
};
// Export the context for the provider
export default AccessibilityContext;





