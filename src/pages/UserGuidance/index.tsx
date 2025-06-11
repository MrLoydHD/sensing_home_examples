import { useState } from 'react';
import { 
  Hand, 
  MousePointer, 
  Volume2, 
  Vibrate, 
  TouchpadIcon,
  Zap,
  Timer,
  MousePointerClick,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import LazyLoad from '@/components/LazyLoad';

const UserGuidance = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [hoverDemo, setHoverDemo] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [pressureLevel, setPressureLevel] = useState(0);

  const interactionPatterns = [
    {
      id: 'proximity',
      title: 'Proximity & Hover Detection',
      icon: <Hand className="w-5 h-5" />,
      description: 'Interface elements appear as your hand approaches',
      color: 'blue',
      examples: [
        'Controls illuminate when hand is within 10cm',
        'Brightness increases as you get closer',
        'Elements fade when hand moves away'
      ]
    },
    {
      id: 'hidden-zones',
      title: 'Hidden Touch Zones',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Touch-sensitive areas in unexpected places',
      color: 'yellow',
      examples: [
        'Steering wheel back has scroll bumps',
        'Side edges for quick access controls',
        'Underside areas for discrete adjustments'
      ]
    },
    {
      id: 'haptic',
      title: 'Haptic Feedback',
      icon: <Vibrate className="w-5 h-5" />,
      description: 'Physical vibration confirms your actions',
      color: 'purple',
      examples: [
        'Light vibration for button press',
        'Strong pulse for confirmations',
        'Continuous feedback during scrolling'
      ]
    },
    {
      id: 'sound',
      title: 'Audio Feedback',
      icon: <Volume2 className="w-5 h-5" />,
      description: 'Subtle sounds guide your interactions',
      color: 'green',
      examples: [
        'Click sound for selections',
        'Whoosh for navigation',
        'Chime for successful actions'
      ]
    },
    {
      id: 'pressure',
      title: 'Pressure Sensitivity',
      icon: <Zap className="w-5 h-5" />,
      description: 'Different pressure levels trigger different actions',
      color: 'orange',
      examples: [
        'Light touch for preview',
        'Normal press for selection',
        'Hard press for context menu'
      ]
    },
    {
      id: 'gestures',
      title: 'Touch Gestures',
      icon: <TouchpadIcon className="w-5 h-5" />,
      description: 'Multi-touch and swipe gestures for navigation',
      color: 'pink',
      examples: [
        'Swipe up/down for scrolling',
        'Two-finger pinch for zoom',
        'Circular motion for volume'
      ]
    },
    {
      id: 'timing',
      title: 'Timing-Based Actions',
      icon: <Timer className="w-5 h-5" />,
      description: 'Hold duration determines the action',
      color: 'indigo',
      examples: [
        'Tap for primary action',
        'Hold 1s for options',
        'Hold 3s for settings'
      ]
    }
  ];

  const handleDemoTap = () => {
    setTapCount(prev => prev + 1);
    setTimeout(() => setTapCount(0), 1000);
  };

  const handlePressureDemo = (e: React.MouseEvent) => {
    // Simulate pressure based on how long the button is held
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setPressureLevel(Math.min(elapsed / 1000, 3));
    }, 50);

    const handleMouseUp = () => {
      clearInterval(interval);
      setTimeout(() => setPressureLevel(0), 500);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* Header */}
      <LazyLoad>
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-4">
            Interaction Guide
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900">
            User Interaction Patterns
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to interact with seamless touch panels through various input methods and feedback mechanisms
          </p>
        </div>
      </LazyLoad>

      {/* Quick Overview */}
      <LazyLoad>
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Seamless panels use multiple interaction methods simultaneously to provide intuitive and accessible controls.
            Combine gestures, pressure, and timing for a rich interaction experience.
          </AlertDescription>
        </Alert>
      </LazyLoad>

      {/* Interaction Patterns Grid */}
      <LazyLoad>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interactionPatterns.map((pattern) => (
            <Card key={pattern.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 bg-${pattern.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`text-${pattern.color}-600`}>
                    {pattern.icon}
                  </div>
                </div>
                <CardTitle className="text-lg">{pattern.title}</CardTitle>
                <CardDescription>{pattern.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pattern.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </LazyLoad>

      {/* Interactive Demos */}
      <LazyLoad>
        <Card>
          <CardHeader>
            <CardTitle>Try It Yourself</CardTitle>
            <CardDescription>
              Interact with these demos to experience different input methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hover" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="hover">Hover</TabsTrigger>
                <TabsTrigger value="tap">Tap</TabsTrigger>
                <TabsTrigger value="pressure">Pressure</TabsTrigger>
                <TabsTrigger value="gesture">Gesture</TabsTrigger>
              </TabsList>

              <TabsContent value="hover" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div 
                    className={`inline-block p-8 rounded-lg transition-all duration-300 ${
                      hoverDemo ? 'bg-blue-100 scale-110 shadow-lg' : 'bg-gray-100'
                    }`}
                    onMouseEnter={() => setHoverDemo(true)}
                    onMouseLeave={() => setHoverDemo(false)}
                  >
                    <MousePointer className={`w-12 h-12 transition-colors ${
                      hoverDemo ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    {hoverDemo ? 'Controls are now visible!' : 'Hover over the icon to reveal controls'}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="tap" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Button
                    size="lg"
                    variant={tapCount >= 2 ? 'default' : 'outline'}
                    onClick={handleDemoTap}
                    className="transition-all"
                  >
                    <MousePointerClick className="w-5 h-5 mr-2" />
                    {tapCount === 0 && 'Tap me'}
                    {tapCount === 1 && 'Tap again to confirm'}
                    {tapCount >= 2 && 'Action confirmed!'}
                  </Button>
                  <p className="mt-4 text-sm text-gray-600">
                    Double-tap pattern prevents accidental activation
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="pressure" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Button
                    size="lg"
                    variant="outline"
                    onMouseDown={handlePressureDemo}
                    className={`transition-all ${
                      pressureLevel > 0 ? 'scale-110' : ''
                    }`}
                    style={{
                      backgroundColor: pressureLevel > 0 
                        ? `rgba(59, 130, 246, ${pressureLevel / 3})` 
                        : undefined
                    }}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Hold to apply pressure
                  </Button>
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(pressureLevel / 3) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      {pressureLevel === 0 && 'Press and hold to see pressure levels'}
                      {pressureLevel > 0 && pressureLevel < 1 && 'Light pressure - Preview mode'}
                      {pressureLevel >= 1 && pressureLevel < 2 && 'Normal pressure - Selection'}
                      {pressureLevel >= 2 && 'Hard pressure - Context menu'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gesture" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="inline-block p-8 bg-gray-100 rounded-lg">
                    <Sparkles className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="text-left space-y-2">
                      <Badge variant="secondary">Swipe Up/Down</Badge>
                      <p className="text-sm text-gray-600">Scroll through content</p>
                    </div>
                    <div className="text-left space-y-2">
                      <Badge variant="secondary">Circular Motion</Badge>
                      <p className="text-sm text-gray-600">Adjust volume or values</p>
                    </div>
                    <div className="text-left space-y-2">
                      <Badge variant="secondary">Two-Finger Pinch</Badge>
                      <p className="text-sm text-gray-600">Zoom in/out</p>
                    </div>
                    <div className="text-left space-y-2">
                      <Badge variant="secondary">Long Press</Badge>
                      <p className="text-sm text-gray-600">Access more options</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </LazyLoad>

      {/* Best Practices */}
      <LazyLoad>
        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>
              Design principles for seamless panel interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Feedback & Confirmation</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <span>Always provide immediate feedback (visual, haptic, or audio)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <span>Use double-tap or hold patterns for destructive actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <span>Combine multiple feedback types for accessibility</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Gesture Design</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <span>Keep gestures simple and intuitive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <span>Provide visual hints for available gestures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <span>Allow customization for different user preferences</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </LazyLoad>

      {/* Special Features */}
      <LazyLoad>
        <Card className="border-2 border-yellow-400 bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <CardTitle>Featured: Steering Wheel Back Scroll</CardTitle>
                <CardDescription>An hidden interaction zone</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">How it works:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <span>Tactile bumps on the back of the steering wheel detect finger position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <span>Hovering activates the scroll zone without taking hands off the wheel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <span>Sliding up/down adjusts volume or scrolls through contacts</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Benefits:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-yellow-600" />
                    <span>Keeps driver's hands in safe position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-yellow-600" />
                    <span>Natural finger movement for scrolling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 mt-1 text-yellow-600" />
                    <span>No visual distraction required</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </LazyLoad>

      {/* Implementation Examples */}
      <LazyLoad>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Implementation Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="text-lg">Sofa Arm Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge>Proximity</Badge>
                  <span className="text-sm">Controls appear when hand approaches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Haptic</Badge>
                  <span className="text-sm">Vibration on button press</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Double-tap</Badge>
                  <span className="text-sm">Confirm media playback</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-green-500">
              <CardHeader>
                <CardTitle className="text-lg">Steering Wheel Implementation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge>Pressure</Badge>
                  <span className="text-sm">Light touch for info, press for action</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Audio</Badge>
                  <span className="text-sm">Click sounds for feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Back Scroll</Badge>
                  <span className="text-sm">Bumps on back detect fingers for volume/contacts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default UserGuidance;