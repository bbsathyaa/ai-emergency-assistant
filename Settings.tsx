import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    fullName: 'John Doe',
    bloodType: 'O+',
    allergies: 'None',
    medicalConditions: '',
    autoShare: true,
    soundAlerts: true,
    vibration: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader
        title="Settings"
        onMenuClick={() => setLocation('/')}
        onSettingsClick={() => setLocation('/settings')}
      />

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
                data-testid="input-full-name"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input
                id="bloodType"
                placeholder="e.g., A+, O-, AB+"
                value={settings.bloodType}
                onChange={(e) => setSettings(prev => ({ ...prev, bloodType: e.target.value }))}
                data-testid="input-blood-type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                placeholder="List any allergies"
                value={settings.allergies}
                onChange={(e) => setSettings(prev => ({ ...prev, allergies: e.target.value }))}
                data-testid="input-allergies"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Medical Conditions</Label>
              <Input
                id="conditions"
                placeholder="List any medical conditions"
                value={settings.medicalConditions}
                onChange={(e) => setSettings(prev => ({ ...prev, medicalConditions: e.target.value }))}
                data-testid="input-medical-conditions"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-share Location</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically share GPS location with alerts
                </p>
              </div>
              <Switch
                checked={settings.autoShare}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoShare: checked }))}
                data-testid="switch-auto-share"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Play sound when alert is sent
                </p>
              </div>
              <Switch
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundAlerts: checked }))}
                data-testid="switch-sound"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vibration</Label>
                <p className="text-xs text-muted-foreground">
                  Vibrate when alert is activated
                </p>
              </div>
              <Switch
                checked={settings.vibration}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, vibration: checked }))}
                data-testid="switch-vibration"
              />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" onClick={handleSave} data-testid="button-save-settings">
          Save Settings
        </Button>
      </main>
    </div>
  );
}
