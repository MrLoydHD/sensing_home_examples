// HoverAnnounceWrapper.jsx - Component wrapper for elements that need hover announcements
import { useAccessibility } from '@/context/accessibilityContext/AccessibilityContext';

interface HoverAnnounceWrapperProps {
  description: string; // Description to announce on hover
  children: React.ReactNode; // Child elements to wrap
  className?: string; // Optional additional classes
  [key: string]: unknown; // Any other props to pass to the wrapper div
}

const HoverAnnounceWrapper: React.FC<HoverAnnounceWrapperProps> = ({ 
  description,
  children,
  className,
  ...restProps
}) => {
  const { announceHover, isScreenReaderEnabled, isHoverAnnouncementEnabled } = useAccessibility();
  
  const handleMouseEnter = () => {
    if (isScreenReaderEnabled && isHoverAnnouncementEnabled) {
      announceHover(description);
    }
  };
  
  return (
    <div 
      className={className || ''}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter} // Support keyboard focus too
      {...restProps}
    >
      {children}
    </div>
  );
};

export default HoverAnnounceWrapper;