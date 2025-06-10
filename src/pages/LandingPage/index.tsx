import { useState } from 'react';
import { Sofa, Coffee, Car, Briefcase, Users, ShoppingBag, Info, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [hoveredExample, setHoveredExample] = useState<string | null>(null);

  // Example data
  const examples = [
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

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 gap-5">
        <h1 className="text-5xl font-bold text-gray-900 max-w-4xl">Seamless Touch Panel Interfaces</h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
          Explore interactive examples of seamless touch panels that blend functionality with aesthetics, 
          creating intuitive and unobtrusive interfaces for everyday environments.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:bg-blue-700">
          Get Started
          <ArrowRight size={18} />
        </button>
      </section>
      
      {/* Examples Grid */}
      <section id="examples" className="my-16">
        <h2 className="text-3xl font-semibold mb-8">Interface Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {examples.map(example => (
            <div 
              key={example.id} 
              className={`bg-white rounded-xl overflow-hidden shadow-md border transition-all duration-300 ${
                hoveredExample === example.id ? 'border-blue-300 -translate-y-1 shadow-lg' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHoveredExample(example.id)}
              onMouseLeave={() => setHoveredExample(null)}
            >
              <div className="h-48 bg-blue-50 flex justify-center items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex justify-center items-center scale-110">
                  {example.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-2 text-gray-800">
                  {example.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{example.description}</p>
                <a href={example.link} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-4 hover:underline">
                  View Example
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="my-20 p-10 bg-gray-50 rounded-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center text-white">
            <Info size={20} />
          </div>
          <h2 className="text-3xl font-semibold m-0">About This Project</h2>
        </div>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-600 max-w-3xl">
            This project showcases interactive prototypes of seamless touch panel interfaces based on research by Silva et al. (2025). 
            These interfaces address key challenges in interaction design for seamless panels, including discoverability, 
            navigation, and feedback mechanisms.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 max-w-3xl">
            Each example demonstrates how these panels can be integrated into everyday objects, creating unobtrusive yet 
            powerful interfaces that enhance user experience while maintaining aesthetic appeal.
          </p>
        </div>
      </section>
      
      {/* Paper Reference */}
      <section id="paper" className="my-20">
        <h2 className="text-3xl font-semibold mb-8">Research Foundation</h2>
        <div className="p-8 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h3 className="text-2xl font-semibold mt-0 mb-4">
            Exploring Interaction Design for Seamless Touch Panels
          </h3>
          <p className="text-base text-gray-600 mb-5">
            <em>Samuel Silva, Bernardo Marques, Raquel Paradinha, Liliana Vale Costa, Sreeram Kongeseri</em><br />
            April 4, 2025
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            This research explores distinct interaction approaches for seamless panels to tackle proxemics, 
            discoverability, menu navigation, and feedback. The study found that users strongly preferred 
            centered menu navigation designs, valued proxemics for intuitive distance-based interactions, 
            and benefited from redundant feedback mechanisms.
          </p>
          <div className="mt-6">
            <a 
              href="#paper"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Read the Paper
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="my-20">
        <h2 className="text-3xl font-semibold mb-8">Key Implementation Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sofa Arm Features */}
          <div className="p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sofa Arm Media Controls</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-blue-700 mb-2">Interaction Features</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Proximity detection illuminates essential controls when the user's hand approaches</li>
                <li>Central menu navigation with options cycling through a viewing area</li>
                <li>Haptic feedback through subtle vibration to confirm button presses</li>
                <li>Contextual display showing only relevant controls for currently active devices</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-blue-700 mb-2">User Benefits</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Eliminates need for multiple remote controls</li>
                <li>Reduces clutter in living spaces</li>
                <li>Interactive surface remains invisible when not in use</li>
                <li>Personalized control interface based on user preferences (detected via Bluetooth)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-blue-700 mb-2">Technical Implementation</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Capacitive touch sensors beneath upholstery material</li>
                <li>Low-power OLED display for visual feedback</li>
                <li>Proximity and ambient light sensors for adaptive display brightness</li>
                <li>Bluetooth/WiFi connectivity to entertainment systems</li>
              </ul>
            </div>
          </div>
          
          {/* Image or illustration placeholder */}
          <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <Sofa size={48} className="text-blue-600" />
              </div>
              <p className="text-gray-500">Interactive demo available in example</p>
              <a 
                href="/examples/sofa-arm" 
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                View Demo
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;