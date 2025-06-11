import { Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LazyLoad from '@/components/LazyLoad';
import ExamplesGrid from './components/ExamplesGrid';
import FeaturesSection from './components/FeaturesSection';

const LandingPage = () => {

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 gap-5">
        <Badge variant="secondary" className="mb-4">
          Research-Based Design
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 max-w-4xl">
          Seamless Touch Panel Interfaces
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
          Explore interactive examples of seamless touch panels that blend functionality with aesthetics, 
          creating intuitive and unobtrusive interfaces for everyday environments.
        </p>
      </section>
      
      {/* Examples Grid */}
      <LazyLoad>
        <ExamplesGrid />
      </LazyLoad>
      
      {/* About Section */}
      <LazyLoad>
        <section id="about" className="container mx-auto">
          <Card className="p-10 bg-gray-50 border-0">
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </section>
      </LazyLoad>
      
      {/* Paper Reference */}
      <LazyLoad>
        <section id="paper" className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Research Foundation</h2>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mt-0 mb-4">
                Exploring Interaction Design for Seamless Touch Panels
              </h3>
              <p className="text-base text-gray-600 mb-5">
                <em>Samuel Silva, Bernardo Marques, Raquel Paradinha, Liliana Vale Costa, Sreeram Kongeseri</em><br />
                <Badge variant="outline" className="mt-2">April 4, 2025</Badge>
              </p>
              <p className="text-base leading-relaxed text-gray-700 mb-6">
                This research explores distinct interaction approaches for seamless panels to tackle proxemics, 
                discoverability, menu navigation, and feedback. The study found that users strongly preferred 
                centered menu navigation designs, valued proxemics for intuitive distance-based interactions, 
                and benefited from redundant feedback mechanisms.
              </p>
              <Button variant="outline" asChild>
                <Link to="#paper" className="gap-2">
                  Read the Paper
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </LazyLoad>
      
      {/* Features Section */}
      <LazyLoad>
        <FeaturesSection />
      </LazyLoad>
    </div>
  );
};

export default LandingPage;