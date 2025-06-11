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
            <Card 
              className={`h-full overflow-hidden transition-all duration-300 cursor-pointer ${
                hoveredExample === example.id ? 'shadow-lg border-blue-300' : ''
              }`}
              onMouseEnter={() => setHoveredExample(example.id)}
              onMouseLeave={() => setHoveredExample(null)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center">
                <div className="w-16 h-16 bg-white rounded-xl flex justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-110">
                  {example.icon}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  {example.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {example.description}
                </CardDescription>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link to={example.link} className="inline-flex items-center gap-1">
                    View Example
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </LazyLoad>
        ))}
      </div>
    </section>
  );
};

export default ExamplesGrid;