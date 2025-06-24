import { Sofa, Coffee, Car, Briefcase, Users, ShoppingBag, DoorOpen } from 'lucide-react';
import type { ReactNode } from 'react';

export interface Example {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export interface Feature {
  id: string;
  title: string;
  icon: ReactNode;
  link: string;
  sections: {
    interactionFeatures: string[];
    userBenefits: string[];
    technicalImplementation: string[];
  };
}

export const examples: Example[] = [
  {
    id: 'sofa-arm',
    title: 'Sofa Arm Controls',
    description: 'A seamless touch panel embedded within the arm of a sofa for controlling media devices and smart home features.',
    icon: <Sofa size={20} className="text-primary" />,
    link: '/examples/sofa-arm'
  },
  {
    id: 'bedside-table',
    title: 'Bedside Table',
    description: 'Smart home controls integrated into a bedside table surface for convenient environment management.',
    icon: <Coffee size={20} className="text-primary" />,
    link: '/examples/bedside-table'
  },
  {
    id: 'kitchen-counter',
    title: 'Kitchen Countertop',
    description: 'Water-resistant touch interface providing recipe information, timers, and appliance control.',
    icon: <Coffee size={20} className="text-primary" />,
    link: '/examples/kitchen-counter'
  },
  {
    id: 'steering-wheel',
    title: 'Steering Wheel',
    description: 'Integrated controls allowing drivers to control vehicle functions without removing hands from the wheel.',
    icon: <Car size={20} className="text-primary" />,
    link: '/examples/steering-wheel'
  },
  {
    id: 'vehicle-door',
    title: 'Vehicle Door',
    description: 'Interactive vehicle door controls with LED lighting, window management, and trunk operation.',
    icon: <DoorOpen size={20} className="text-primary" />,
    link: '/examples/vehicle-door'
  },
  {
    id: 'conference-table',
    title: 'Conference Table',
    description: 'Collaborative interface enabling document sharing, presentation control, and meeting management.',
    icon: <Users size={20} className="text-primary" />,
    link: '/examples/conference-table'
  },
  {
    id: 'retail-display',
    title: 'Retail Display',
    description: 'Interactive product information panels integrated into retail shelving or display units.',
    icon: <ShoppingBag size={20} className="text-primary" />,
    link: '/examples/retail-display'
  },
  {
    id: 'medical-device',
    title: 'Medical Equipment',
    description: 'Sterile, easy-to-clean interfaces for healthcare settings with precise control requirements.',
    icon: <Briefcase size={20} className="text-primary" />,
    link: '/examples/medical-device'
  }
];

export const features: Feature[] = [
  {
    id: 'sofa-arm',
    title: 'Sofa Arm Media Controls',
    icon: <Sofa size={48} className="text-primary" />,
    link: '/examples/sofa-arm',
    sections: {
      interactionFeatures: [
        'Proximity detection illuminates essential controls when the user\'s hand approaches',
        'Central menu navigation with options cycling through a viewing area',
        'Haptic feedback through subtle vibration to confirm button presses',
        'Contextual display showing only relevant controls for currently active devices'
      ],
      userBenefits: [
        'Eliminates need for multiple remote controls',
        'Reduces clutter in living spaces',
        'Interactive surface remains invisible when not in use',
        'Personalized control interface based on user preferences (detected via Bluetooth)'
      ],
      technicalImplementation: [
        'Capacitive touch sensors beneath upholstery material',
        'Low-power OLED display for visual feedback',
        'Proximity and ambient light sensors for adaptive display brightness',
        'Bluetooth/WiFi connectivity to entertainment systems'
      ]
    }
  },
  {
    id: 'steering-wheel',
    title: 'Steering Wheel Controls',
    icon: <Car size={48} className="text-primary" />,
    link: '/examples/steering-wheel',
    sections: {
      interactionFeatures: [
        'Touch-sensitive controls integrated into steering wheel spokes',
        'Radial menu navigation with thumb-accessible controls',
        'Multi-function displays for media, phone, and vehicle information',
        'Haptic and audio feedback for safe eyes-on-road operation'
      ],
      userBenefits: [
        'Safer driving with hands-on-wheel control access',
        'Customizable control layouts for different drivers',
        'Context-aware controls that adapt to driving conditions',
        'Reduced distraction with intuitive gesture controls'
      ],
      technicalImplementation: [
        'Pressure-sensitive capacitive touch zones',
        'High-resolution OLED displays for visual feedback',
        'Integration with vehicle CAN bus for system control',
        'Voice command support with noise cancellation'
      ]
    }
  }
];