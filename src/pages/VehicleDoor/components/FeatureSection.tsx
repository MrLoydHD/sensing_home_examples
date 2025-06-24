import FeatureSectionWrapper from '@/components/shared/FeatureSectionWrapper';
import { Zap } from 'lucide-react';

export default function FeatureSection() {
  const tabs = [
    {
      id: "interaction",
      label: "Interaction",
      cards: [
        {
          title: "Context-Aware Controls",
          content: "The door panel intelligently adapts available controls based on vehicle mode. Full access when parked, essential controls while driving, security mode for valet.",
          items: [
            { text: "Parked: All 4 controls available", type: "bullet", color: "bg-blue-500" },
            { text: "Driving: Window & radio only", type: "bullet", color: "bg-blue-500" },
            { text: "Valet: Lock control only", type: "bullet", color: "bg-blue-500" }
          ]
        },
        {
          title: "LED Guidance System", 
          content: "Ambient LED strips provide visual feedback and guidance. Intensity adjusts based on proximity detection and system state for optimal visibility without distraction.",
          items: [
            { text: "Proximity: 50% intensity guidance", type: "bullet", color: "bg-purple-500" },
            { text: "Active: 100% intensity for precision", type: "bullet", color: "bg-purple-500" },
            { text: "Customizable colors per user profile", type: "bullet", color: "bg-purple-500" }
          ]
        },
        {
          title: "Proximity Activation",
          content: "Advanced proximity sensors detect authorized devices and hand approach. System activates smoothly without jarring transitions or delays.",
          items: [
            { text: "Key fob detection at 2m range", type: "bullet", color: "bg-green-500" },
            { text: "Hand detection via IR sensors", type: "bullet", color: "bg-green-500" },
            { text: "Smooth 500ms activation transition", type: "bullet", color: "bg-green-500" }
          ]
        },
        {
          title: "Multi-Level Haptic Feedback",
          content: "Sophisticated haptic patterns provide immediate confirmation without requiring visual attention. Different intensities communicate action types and system responses.",
          items: [
            { text: "Light: Mirror adjustments, LED control", type: "bullet", color: "bg-orange-500" },
            { text: "Medium: Window operation, mode changes", type: "bullet", color: "bg-orange-500" },
            { text: "Strong: Lock/unlock, system activation", type: "bullet", color: "bg-orange-500" }
          ]
        }
      ]
    },
    {
      id: "safety", 
      label: "Safety",
      cards: [
        {
          title: "Driving Mode Safety",
          content: "When vehicle is in motion, only essential controls remain active. Lock and LED controls are disabled to prevent driver distraction during critical moments.",
          items: [
            { text: "Window control limited to passenger safety", type: "check" },
            { text: "Mirror adjustment for blind spot visibility", type: "check" },
            { text: "Lock controls disabled while moving", type: "cross" },
            { text: "LED controls disabled to prevent distraction", type: "cross" }
          ]
        },
        {
          title: "Emergency Override", 
          content: "Critical safety systems remain functional even when main interface is disabled. Emergency unlock and window operation available through backup mechanisms.",
          items: [
            { text: "Mechanical door handle always functional", type: "check" },
            { text: "Emergency window break detection", type: "check" },
            { text: "Power failure backup systems", type: "check" },
            { text: "Child safety lock integration", type: "check" }
          ]
        },
        {
          title: "Valet Security Mode",
          content: "When valet mode is active, only basic lock/unlock functionality is available. All comfort and adjustment features are disabled to prevent unauthorized changes.",
          items: [
            { text: "Basic lock/unlock for access", type: "check" },
            { text: "Window control disabled", type: "cross" },
            { text: "Mirror adjustment blocked", type: "cross" },
            { text: "LED customization prevented", type: "cross" }
          ]
        },
        {
          title: "Accessibility Compliance",
          content: "Interface meets ADA guidelines with voice announcements, adjustable haptic intensity, and high contrast visual modes for users with different abilities.",
          items: [
            { text: "Screen reader compatibility", type: "check" },
            { text: "Adjustable haptic feedback intensity", type: "check" },
            { text: "High contrast LED patterns", type: "check" },
            { text: "Large target areas for motor impairments", type: "check" }
          ]
        }
      ]
    },
    {
      id: "technical",
      label: "Technical", 
      cards: [
        {
          title: "Capacitive Touch Matrix",
          content: "High-resolution capacitive sensing through automotive-grade sensors embedded beneath the door trim. Operates reliably in all weather conditions and with gloves.",
          items: [
            { text: "512-point touch resolution grid", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "-40°C to +85°C operating range", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "IP67 water and dust resistance", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Glove and wet finger operation", type: "technical", icon: Zap, color: "text-blue-600" }
          ]
        },
        {
          title: "Proximity Sensing Array",
          content: "Multi-sensor proximity detection system using infrared, capacitive, and radio frequency technologies for robust activation triggers and presence detection.",
          items: [
            { text: "IR sensors for hand detection", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "RF key fob detection 2m range", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Capacitive field sensing", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Machine learning false positive filtering", type: "technical", icon: Zap, color: "text-blue-600" }
          ]
        },
        {
          title: "LED Driver System",
          content: "Advanced LED driver circuitry enables smooth intensity transitions, color customization, and pattern programming while maintaining automotive electrical standards.",
          items: [
            { text: "16-bit PWM intensity control", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "RGB color mixing capability", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Programmable pattern sequences", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Automotive EMC compliance", type: "technical", icon: Zap, color: "text-blue-600" }
          ]
        },
        {
          title: "Vehicle Integration",
          content: "Direct integration with vehicle CAN bus and body control modules for real-time status monitoring and coordinated operation with other vehicle systems.",
          items: [
            { text: "CAN-FD protocol support", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Body control module interface", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "Security gateway integration", type: "technical", icon: Zap, color: "text-blue-600" },
            { text: "OTA update capability", type: "technical", icon: Zap, color: "text-blue-600" }
          ]
        }
      ]
    },
    {
      id: "benefits",
      label: "Benefits",
      cards: [
        {
          title: "Enhanced User Experience",
          content: "Seamless integration of controls directly into the door surface eliminates the need for separate switches and buttons, creating a cleaner, more intuitive interface.",
          items: [
            { text: "75% faster control access", type: "star" },
            { text: "Reduced visual scanning time", type: "star" },
            { text: "Intuitive gesture-based operation", type: "star" },
            { text: "Personalized control layouts", type: "star" }
          ]
        },
        {
          title: "Operational Efficiency",
          content: "Context-aware functionality ensures only relevant controls are available, reducing decision time and preventing accidental activation of inappropriate functions.",
          items: [
            { text: "Mode-appropriate control filtering", type: "star" },
            { text: "Reduced accidental activation by 90%", type: "star" },
            { text: "Smart power management", type: "star" },
            { text: "Predictive control pre-activation", type: "star" }
          ]
        },
        {
          title: "Maintenance Benefits",
          content: "Solid-state design with no moving parts reduces maintenance requirements compared to traditional mechanical switches and controls.",
          items: [
            { text: "No mechanical wear components", type: "star" },
            { text: "Self-diagnostic capabilities", type: "star" },
            { text: "Remote troubleshooting support", type: "star" },
            { text: "15-year design life expectancy", type: "star" }
          ]
        },
        {
          title: "Manufacturing Advantages", 
          content: "Integrated touch surface reduces part count and assembly complexity while enabling design flexibility and customization options for different vehicle models.",
          items: [
            { text: "40% reduction in mechanical parts", type: "star" },
            { text: "Simplified wire harness design", type: "star" },
            { text: "Flexible control layout configuration", type: "star" },
            { text: "Scalable across vehicle platforms", type: "star" }
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