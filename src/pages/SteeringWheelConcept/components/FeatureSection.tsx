import FeatureSectionWrapper from '@/components/shared/FeatureSectionWrapper';

export default function FeatureSection() {
  const tabs = [
    {
      id: "interaction",
      label: "Interaction",
      cards: [
        {
          title: "Raised Tactile Guides",
          content: "Each control features a raised ring that allows drivers to locate buttons by touch alone. The subtle elevation provides tactile feedback without visual distraction.",
          items: [
            { text: "3mm raised edges for easy location", type: "bullet", color: "bg-blue-500" },
            { text: "Textured surfaces for grip", type: "bullet", color: "bg-blue-500" },
            { text: "Braille-compatible patterns", type: "bullet", color: "bg-blue-500" }
          ]
        },
        {
          title: "Pressure-Sensitive Input",
          content: "Advanced force sensors distinguish between accidental touches and intentional presses, preventing false activations while driving.",
          items: [
            { text: "0-30% pressure: Touch guidance", type: "bullet", color: "bg-green-500" },
            { text: "30-60% pressure: Pre-activation", type: "bullet", color: "bg-yellow-500" },
            { text: "60%+ pressure: Full activation", type: "bullet", color: "bg-red-500" }
          ]
        },
        {
          title: "Contextual Controls",
          content: "Button functions automatically adapt based on driving mode and conditions, providing relevant controls when needed.",
          items: [
            { text: "Drive Mode: Media, Phone, Voice, Navigation" },
            { text: "Cruise Mode: Speed adjust, Distance, Resume, Cancel" },
            { text: "Parking Mode: Cameras, Sensors, Assist, Emergency" }
          ]
        },
        {
          title: "Haptic Feedback",
          content: "Multi-level vibration feedback confirms actions without requiring visual attention, with different patterns for different interactions.",
          items: [
            { text: "Light tap: 20ms pulse" },
            { text: "Button press: 50ms vibration" },
            { text: "Mode change: Pattern sequence" }
          ]
        }
      ]
    },
    {
      id: "safety",
      label: "Safety",
      cards: [
        {
          title: "Hand Position Detection",
          content: "Capacitive sensors monitor hand placement on the wheel, alerting drivers if hands are removed for extended periods.",
          items: [
            { text: "Real-time hand position monitoring" },
            { text: "Visual and haptic alerts for safety" },
            { text: "Automatic control deactivation if needed" },
            { text: "Integration with driver assistance systems" }
          ]
        },
        {
          title: "Eyes-Free Operation",
          content: "All controls are designed for operation without looking, reducing visual distraction and improving road safety.",
          items: [
            { text: "Tactile differentiation between controls" },
            { text: "Audio confirmation of actions" },
            { text: "Consistent button placement" },
            { text: "Memory muscle development support" }
          ]
        }
      ]
    },
    {
      id: "technical",
      label: "Technical",
      cards: [
        {
          title: "Force-Sensitive Resistors",
          content: "High-precision FSR sensors beneath the seamless surface detect pressure variations from 0-10N with millisecond response times.",
          items: [
            { text: "Resolution: 0.1N" },
            { text: "Response: <5ms" },
            { text: "Durability: 1M+ cycles" }
          ]
        },
        {
          title: "Vibration Motors",
          content: "Linear resonant actuators provide precise haptic feedback with variable intensity and pattern control.",
          items: [
            { text: "Frequency: 20-1000Hz" },
            { text: "Latency: <2ms" },
            { text: "Patterns: 50+ presets" }
          ]
        },
        {
          title: "CAN Bus Integration",
          content: "Direct integration with vehicle systems enables real-time adaptation to driving conditions and modes.",
          items: [
            { text: "Protocol: CAN 2.0B" },
            { text: "Bitrate: 500kbps" },
            { text: "Latency: <10ms" }
          ]
        }
      ]
    },
    {
      id: "benefits",
      label: "Benefits",
      cards: [
        {
          title: "Driver Benefits",
          content: "",
          items: [
            { text: "Reduced visual distraction for safer driving", type: "check" },
            { text: "Customizable interface based on preferences", type: "check" },
            { text: "Intuitive controls that adapt to context", type: "check" },
            { text: "Enhanced accessibility for all users", type: "check" }
          ]
        },
        {
          title: "Design Advantages",
          content: "",
          items: [
            { text: "Sleek, modern aesthetic without physical buttons", type: "bullet", color: "bg-blue-500" },
            { text: "Seamless integration with steering wheel design", type: "bullet", color: "bg-blue-500" },
            { text: "Reduced mechanical complexity and failure points", type: "bullet", color: "bg-blue-500" },
            { text: "Future-proof with software updates", type: "bullet", color: "bg-blue-500" }
          ]
        }
      ]
    }
  ];

  return (
    <FeatureSectionWrapper
      variant="tabs"
      tabs={tabs}
      defaultTab="interaction"
    />
  );
}