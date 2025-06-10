import { useAccessibility } from '@/context/accessibilityContext/AccessibilityContext';

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
    <div className="flex flex-col md:flex-row justify-between items-start bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-6">
      <div className="flex flex-col md:mr-4">
        <h3 className="font-bold text-indigo-700 flex items-center gap-2 mb-1">
          <span aria-hidden="true">♿</span> Accessibility Options
        </h3>
        <p className="text-indigo-800 text-sm">
          Enable screen reader mode to have all actions announced through voice.
        </p>
      </div>
      
      <div className="flex flex-col mt-3 md:mt-0 space-y-4">
        {/* Screen Reader Toggle */}
        <div className="flex items-center">
          <label htmlFor="screen-reader-toggle" className="mr-3 text-sm font-medium text-indigo-700">
            Screen Reader
          </label>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input 
              id="screen-reader-toggle"
              type="checkbox"
              checked={isScreenReaderEnabled}
              onChange={handleToggleScreenReader}
              className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{
                top: '0',
                left: isScreenReaderEnabled ? '22px' : '0',
                transition: 'left 0.2s ease-in-out',
                borderColor: isScreenReaderEnabled ? '#6366f1' : '#d1d5db'
              }}
            />
            <label 
              htmlFor="screen-reader-toggle" 
              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${isScreenReaderEnabled ? 'bg-indigo-500' : 'bg-gray-300'}`}
              style={{ transition: 'background-color 0.2s ease-in-out' }}
            ></label>
          </div>
        </div>
        
        {/* Hover Announcements Toggle - Only visible when screen reader is enabled */}
        {isScreenReaderEnabled && (
          <div className="flex items-center">
            <label htmlFor="hover-announce-toggle" className="mr-3 text-sm font-medium text-indigo-700">
              Hover Announcements
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input 
                id="hover-announce-toggle"
                type="checkbox"
                checked={isHoverAnnouncementEnabled}
                onChange={handleToggleHoverAnnouncements}
                className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{
                  top: '0',
                  left: isHoverAnnouncementEnabled ? '22px' : '0',
                  transition: 'left 0.2s ease-in-out',
                  borderColor: isHoverAnnouncementEnabled ? '#6366f1' : '#d1d5db'
                }}
              />
              <label 
                htmlFor="hover-announce-toggle" 
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${isHoverAnnouncementEnabled ? 'bg-indigo-500' : 'bg-gray-300'}`}
                style={{ transition: 'background-color 0.2s ease-in-out' }}
              ></label>
            </div>
          </div>
        )}
        
        {/* Test Voice Button */}
        {isScreenReaderEnabled && (
          <button 
            onClick={handleTestVoice} 
            className="px-3 py-1 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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