import { Sofa, Coffee, Car, Briefcase, Users, ShoppingBag } from 'lucide-react';

export interface Example {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}

export interface Feature {
  id: string;
  title: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    iconColor: string;
    buttonBorder: string;
    buttonText: string;
    buttonHover: string;
  };
  icon: JSX.Element;
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
    icon: <Sofa size={20} className="text-blue-600" />,
    link: '/examples/sofa-arm'
  },
  {
    id: 'bedside-table',
    title: 'Bedside Table',
    description: 'Smart home controls integrated into a bedside table surface for convenient environment management.',
    icon: <Coffee size={20} className="text-blue-600" />,
    link: '/examples/bedside-table'
  },
  {
    id: 'kitchen-counter',
    title: 'Kitchen Countertop',
    description: 'Water-resistant touch interface providing recipe information, timers, and appliance control.',
    icon: <Coffee size={20} className="text-blue-600" />,
    link: '/examples/kitchen-counter'
  },
  {
    id: 'steering-wheel',
    title: 'Steering Wheel',
    description: 'Integrated controls allowing drivers to control vehicle functions without removing hands from the wheel.',
    icon: <Car size={20} className="text-blue-600" />,
    link: '/examples/steering-wheel'
  },
  {
    id: 'center-console',
    title: 'Vehicle Console',
    description: 'Center console interface replacing traditional knobs and buttons for climate and media control.',
    icon: <Car size={20} className="text-blue-600" />,
    link: '/examples/center-console'
  },
  {
    id: 'conference-table',
    title: 'Conference Table',
    description: 'Collaborative interface enabling document sharing, presentation control, and meeting management.',
    icon: <Users size={20} className="text-blue-600" />,
    link: '/examples/conference-table'
  },
  {
    id: 'retail-display',
    title: 'Retail Display',
    description: 'Interactive product information panels integrated into retail shelving or display units.',
    icon: <ShoppingBag size={20} className="text-blue-600" />,
    link: '/examples/retail-display'
  },
  {
    id: 'medical-device',
    title: 'Medical Equipment',
    description: 'Sterile, easy-to-clean interfaces for healthcare settings with precise control requirements.',
    icon: <Briefcase size={20} className="text-blue-600" />,
    link: '/examples/medical-device'
  }
];

export const features: Feature[] = [
  {
    id: 'sofa-arm',
    title: 'Sofa Arm Media Controls',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonBorder: 'border-blue-600',
      buttonText: 'text-blue-600',
      buttonHover: 'hover:bg-blue-50'
    },
    icon: <Sofa size={48} className="text-blue-600" />,
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
    colorScheme: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonBorder: 'border-green-600',
      buttonText: 'text-green-600',
      buttonHover: 'hover:bg-green-50'
    },
    icon: <Car size={48} className="text-green-600" />,
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