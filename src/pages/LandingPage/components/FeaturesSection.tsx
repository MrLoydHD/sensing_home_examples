import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LazyLoad from '@/components/LazyLoad';
import { features } from './ExamplesData';

const FeaturesSection = () => {
  return (
    <section id="features" className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Key Implementation Features</h2>
      
      <div className="space-y-12">
        {features.map((feature, index) => (
          <LazyLoad 
            key={feature.id}
            threshold={0.1}
            rootMargin={`${index * 50}px`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className={`border-l-4 ${feature.id === 'sofa-arm' ? 'border-primary bg-primary/5' : 'border-accent bg-accent/5'}`}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      Interaction Features
                    </Badge>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {feature.sections.interactionFeatures.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      User Benefits
                    </Badge>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {feature.sections.userBenefits.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      Technical Implementation
                    </Badge>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {feature.sections.technicalImplementation.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className={`w-24 h-24 ${feature.id === 'sofa-arm' ? 'bg-primary/10' : 'bg-accent/10'} rounded-full mx-auto flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {feature.id === 'steering-wheel' ? 'Interactive 3D demo available' : 'Interactive demo available'}
                  </p>
                  <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                    <Link to={feature.link} className="gap-2">
                      View Demo
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </LazyLoad>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;