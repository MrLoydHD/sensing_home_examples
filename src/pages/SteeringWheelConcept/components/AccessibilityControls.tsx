import { useAccessibility } from '@/context/accessibilityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AccessibilityControls() {
  const {
    isScreenReaderEnabled,
    toggleScreenReader,
    isHighContrastEnabled,
    toggleHighContrast,
    isReducedMotionEnabled,
    toggleReducedMotion,
    speakAction
  } = useAccessibility();

  const handleToggleScreenReader = () => {
    toggleScreenReader();
    speakAction(isScreenReaderEnabled ? 'Screen reader disabled' : 'Screen reader enabled');
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screen-reader">Screen Reader Support</Label>
              <p className="text-sm text-gray-600">
                Announces all button actions and state changes
              </p>
            </div>
            <Switch
              id="screen-reader"
              checked={isScreenReaderEnabled}
              onCheckedChange={handleToggleScreenReader}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <p className="text-sm text-gray-600">
                Enhanced visibility for visual elements
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={isHighContrastEnabled}
              onCheckedChange={toggleHighContrast}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-gray-600">
                Minimizes animations and transitions
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={isReducedMotionEnabled}
              onCheckedChange={toggleReducedMotion}
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Test Accessibility</h4>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => speakAction('Testing voice announcement for media button')}
              >
                Test Media Announcement
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => speakAction('Safety alert: Keep both hands on steering wheel')}
              >
                Test Safety Alert
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => speakAction('Cruise control activated at 65 miles per hour')}
              >
                Test Mode Change
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}