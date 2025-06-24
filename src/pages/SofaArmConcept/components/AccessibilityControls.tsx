import { useAccessibility } from '@/context/accessibilityContext/AccessibilityContext';
import { Accessibility } from 'lucide-react';

const AccessibilityControls = () => {
  const { 
    isScreenReaderEnabled, 
    isHoverAnnouncementEnabled,
    toggleScreenReader, 
    toggleHoverAnnouncements,
    speakText 
  } = useAccessibility();
  
  const handleToggleScreenReader = () => {
    toggleScreenReader();
  };

  const handleToggleHoverAnnouncements = () => {
    toggleHoverAnnouncements();
  };
  
  const handleTestVoice = () => {
    speakText("This is a test of the screen reader. When enabled, all actions will be announced out loud.");
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start bg-secondary p-4 rounded-lg border border-border mt-6">
      <div className="flex flex-col md:mr-4">
        <h3 className="font-bold text-secondary-foreground flex items-center gap-2 mb-1">
          <Accessibility className="w-5 h-5" /> Accessibility Options
        </h3>
        <p className="text-secondary-foreground text-sm">
          Enable screen reader mode to have all actions announced through voice.
        </p>
      </div>
      
      <div className="flex flex-col mt-3 md:mt-0 space-y-4">
        {/* Screen Reader Toggle */}
        <div className="flex items-center">
          <label htmlFor="screen-reader-toggle" className="mr-3 text-sm font-medium text-secondary-foreground">
            Screen Reader
          </label>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input 
              id="screen-reader-toggle"
              type="checkbox"
              checked={isScreenReaderEnabled}
              onChange={handleToggleScreenReader}
              className="absolute block w-6 h-6 rounded-full bg-card border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
              style={{
                top: '0',
                left: isScreenReaderEnabled ? '22px' : '0',
                transition: 'left 0.2s ease-in-out',
                borderColor: isScreenReaderEnabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
              }}
            />
            <label 
              htmlFor="screen-reader-toggle" 
              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${isScreenReaderEnabled ? 'bg-primary' : 'bg-muted'}`}
              style={{ transition: 'background-color 0.2s ease-in-out' }}
            ></label>
          </div>
        </div>
        
        {/* Hover Announcements Toggle - Only visible when screen reader is enabled */}
        {isScreenReaderEnabled && (
          <div className="flex items-center">
            <label htmlFor="hover-announce-toggle" className="mr-3 text-sm font-medium text-secondary-foreground">
              Hover Announcements
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input 
                id="hover-announce-toggle"
                type="checkbox"
                checked={isHoverAnnouncementEnabled}
                onChange={handleToggleHoverAnnouncements}
                className="absolute block w-6 h-6 rounded-full bg-card border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                style={{
                  top: '0',
                  left: isHoverAnnouncementEnabled ? '22px' : '0',
                  transition: 'left 0.2s ease-in-out',
                  borderColor: isHoverAnnouncementEnabled ? 'hsl(var(--primary))' : 'hsl(var(--muted))'
                }}
              />
              <label 
                htmlFor="hover-announce-toggle" 
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${isHoverAnnouncementEnabled ? 'bg-primary' : 'bg-muted'}`}
                style={{ transition: 'background-color 0.2s ease-in-out' }}
              ></label>
            </div>
          </div>
        )}
        
        {/* Test Voice Button */}
        {isScreenReaderEnabled && (
          <button 
            onClick={handleTestVoice} 
            className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Test screen reader voice"
          >
            Test Voice
          </button>
        )}
      </div>
    </div>
  );
};

export default AccessibilityControls;