import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LazyLoad from '@/components/LazyLoad';
import { examples } from './ExamplesData';

const ExamplesGrid = () => {
  const [hoveredExample, setHoveredExample] = useState<string | null>(null);

  return (
    <section id="examples" className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Interface Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {examples.map((example, index) => (
          <LazyLoad 
            key={example.id}
            className={`transition-all duration-300 ${
              hoveredExample === example.id ? '-translate-y-1' : ''
            }`}
            threshold={0.1}
            rootMargin={`${index * 20}px`}
          >
            <Link to={example.link} className="block h-full">
              <Card 
                className={`h-full overflow-hidden transition-all duration-300 cursor-pointer p-0 ${
                  hoveredExample === example.id ? 'shadow-lg border-primary/30' : ''
                }`}
                onMouseEnter={() => setHoveredExample(example.id)}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex justify-center items-center">
                  <div className="w-16 h-16 bg-background rounded-xl flex justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-110">
                    {example.icon}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <CardDescription className="mb-4 text-justify line-clamp-3">
                    {example.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </LazyLoad>
        ))}
      </div>
    </section>
  );
};

export default ExamplesGrid;