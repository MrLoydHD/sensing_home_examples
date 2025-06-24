import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type definitions for different feature content formats
export interface SimpleFeatureSection {
  title: string;
  items: string[];
}

export interface FeatureItem {
  text: string;
  type?: 'bullet' | 'check' | 'cross' | 'star' | 'technical';
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FeatureCard {
  title: string;
  content: string;
  items: FeatureItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TabFeatureSection {
  id: string;
  label: string;
  cards: FeatureCard[];
}

interface FeatureSectionWrapperProps {
  title?: string;
  variant?: 'simple' | 'tabs';
  className?: string;
  // For simple variant
  sections?: SimpleFeatureSection[];
  // For tabs variant
  tabs?: TabFeatureSection[];
  defaultTab?: string;
}

const FeatureSectionWrapper: React.FC<FeatureSectionWrapperProps> = ({
  title = "Key Features & Technical Details",
  variant = 'simple',
  className = "",
  sections = [],
  tabs = [],
  defaultTab
}) => {
  
  // Render icon based on type and color
  const renderItemIcon = (item: FeatureItem) => {
    const iconClass = "w-4 h-4 flex-shrink-0 mt-0.5";
    
    switch (item.type) {
      case 'check':
        return <span className="text-green-600 mt-0.5">✓</span>;
      case 'cross':
        return <span className="text-red-600 mt-0.5">✗</span>;
      case 'star':
        return <span className="text-purple-600 mt-0.5">★</span>;
      case 'technical':
        if (item.icon) {
          const IconComponent = item.icon;
          return <IconComponent className={`${iconClass} ${item.color || 'text-blue-600'}`} />;
        }
        return <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${item.color || 'bg-blue-500'}`} />;
      default:
        return <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${item.color || 'bg-blue-500'}`} />;
    }
  };

  // Simple list-based feature section
  const renderSimpleSection = () => (
    <div className={`mt-6 p-6 bg-secondary rounded-xl border-l-4 border-primary ${className}`}>
      {sections.map((section, index) => (
        <div key={section.title} className={index > 0 ? "mt-5" : ""}>
          <h3 className="text-secondary-foreground mt-0 font-semibold">{section.title}</h3>
          <ul className="text-muted-foreground pl-5 mt-2">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="mb-1.5 list-disc">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // Tabbed feature section with cards
  const renderTabsSection = () => (
    <div className={`mt-12 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      
      <Tabs defaultValue={defaultTab || tabs[0]?.id} className="w-full">
        <TabsList className={`grid w-full ${tabs.length === 2 ? 'grid-cols-2' : tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tab.cards.map((card, cardIndex) => (
                <Card key={cardIndex}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {card.icon && <card.icon className="w-5 h-5" />}
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      {card.content}
                    </p>
                    {card.items.length > 0 && (
                      <div className="space-y-2">
                        {card.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            {renderItemIcon(item)}
                            <span className="text-sm flex-1">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );

  return variant === 'simple' ? renderSimpleSection() : renderTabsSection();
};

export default FeatureSectionWrapper;