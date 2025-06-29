
import FeatureSectionWrapper from '@/components/shared/FeatureSectionWrapper';

const FeatureSection = () => {
  const featureSections = [
    {
      title: "Key Features",
      items: [
        "Proximity detection illuminates essential controls when a hand approaches",
        "Central menu navigation with options cycling through a viewing area",
        "Haptic feedback through subtle vibration & sound to confirm button presses",
        "Contextual display showing only relevant controls for currently active devices"
      ]
    },
    {
      title: "User Benefits",
      items: [
        "Eliminates need for multiple remote controls",
        "Reduces clutter in living spaces",
        "Interactive surface remains invisible when not in use",
        "Personalized control interface based on user preferences (detected via Bluetooth)",
        "Sound-based haptic feedback provides clear confirmation of actions"
      ]
    },
    {
      title: "Technical Implementation",
      items: [
        "Capacitive touch sensors beneath upholstery material",
        "Low-power OLED display for visual feedback",
        "Proximity and ambient light sensors for adaptive display brightness",
        "Bluetooth/WiFi connectivity to entertainment systems",
        "Micro-speakers for audio-haptic feedback synchronized with physical vibration"
      ]
    },
    {
      title: "Sound Haptic System",
      items: [
        "Unique audio patterns for different types of interactions",
        "Sound frequency and pattern designed to complement physical feedback",
        "Context-aware audio cues that adapt to the current state of devices",
        "Audio feedback patterns designed to be subtle yet distinct",
        "Volume adaptive to ambient noise levels for consistent feedback"
      ]
    }
  ];

  return (
    <FeatureSectionWrapper
      variant="simple"
      sections={featureSections}
    />
  );
};

export default FeatureSection;