import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FeatureSection() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features & Technical Details</h2>
      
      <Tabs defaultValue="interaction" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="interaction">Interaction</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interaction" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Raised Tactile Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Each control features a raised ring that allows drivers to locate buttons by touch alone. 
                  The subtle elevation provides tactile feedback without visual distraction.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">3mm raised edges for easy location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Textured surfaces for grip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Braille-compatible patterns</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pressure-Sensitive Input</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Advanced force sensors distinguish between accidental touches and intentional presses, 
                  preventing false activations while driving.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">0-30% pressure: Touch guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm">30-60% pressure: Pre-activation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm">60%+ pressure: Full activation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contextual Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Button functions automatically adapt based on driving mode and conditions, 
                  providing relevant controls when needed.
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>Drive Mode:</strong> Media, Phone, Voice, Navigation
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Cruise Mode:</strong> Speed adjust, Distance, Resume, Cancel
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <strong>Parking Mode:</strong> Cameras, Sensors, Assist, Emergency
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Haptic Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Multi-level vibration feedback confirms actions without requiring visual attention, 
                  with different patterns for different interactions.
                </p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📳</span>
                    <span className="text-sm">Light tap: 20ms pulse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📳📳</span>
                    <span className="text-sm">Button press: 50ms vibration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📳📳📳</span>
                    <span className="text-sm">Mode change: Pattern sequence</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="safety" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hand Position Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Capacitive sensors monitor hand placement on the wheel, alerting drivers 
                  if hands are removed for extended periods.
                </p>
                <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
                  <li>Real-time hand position monitoring</li>
                  <li>Visual and haptic alerts for safety</li>
                  <li>Automatic control deactivation if needed</li>
                  <li>Integration with driver assistance systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eyes-Free Operation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  All controls are designed for operation without looking, reducing visual 
                  distraction and improving road safety.
                </p>
                <ul className="mt-3 space-y-1 text-sm list-disc list-inside">
                  <li>Tactile differentiation between controls</li>
                  <li>Audio confirmation of actions</li>
                  <li>Consistent button placement</li>
                  <li>Memory muscle development support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Force-Sensitive Resistors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  High-precision FSR sensors beneath the seamless surface detect pressure 
                  variations from 0-10N with millisecond response times.
                </p>
                <div className="mt-3 text-xs bg-gray-100 p-2 rounded font-mono">
                  Resolution: 0.1N<br/>
                  Response: &lt;5ms<br/>
                  Durability: 1M+ cycles
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vibration Motors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Linear resonant actuators provide precise haptic feedback with variable 
                  intensity and pattern control.
                </p>
                <div className="mt-3 text-xs bg-gray-100 p-2 rounded font-mono">
                  Frequency: 20-1000Hz<br/>
                  Latency: &lt;2ms<br/>
                  Patterns: 50+ presets
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CAN Bus Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Direct integration with vehicle systems enables real-time adaptation 
                  to driving conditions and modes.
                </p>
                <div className="mt-3 text-xs bg-gray-100 p-2 rounded font-mono">
                  Protocol: CAN 2.0B<br/>
                  Bitrate: 500kbps<br/>
                  Latency: &lt;10ms
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="benefits" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Driver Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Reduced visual distraction for safer driving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Customizable interface based on preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Intuitive controls that adapt to context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Enhanced accessibility for all users</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Design Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">◆</span>
                    <span>Sleek, modern aesthetic without physical buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">◆</span>
                    <span>Seamless integration with steering wheel design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">◆</span>
                    <span>Reduced mechanical complexity and failure points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">◆</span>
                    <span>Future-proof with software updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}