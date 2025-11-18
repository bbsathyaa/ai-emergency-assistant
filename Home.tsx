import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PanicButton from "@/components/PanicButton";
import LocationCard from "@/components/LocationCard";
import StatusIndicator, { type AlertStatus } from "@/components/StatusIndicator";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Users, History, Settings } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [alertStatus, setAlertStatus] = useState<AlertStatus>('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [currentLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    address: "Acquiring location...",
    lastUpdated: new Date()
  });

  const handlePanicActivate = () => {
    setAlertStatus('sending');
    toast({
      title: "Emergency Alert Activated",
      description: "Sending your location to emergency contacts...",
    });

    setTimeout(() => {
      setAlertStatus('sent');
      toast({
        title: "Alert Sent Successfully",
        description: "Emergency services and contacts have been notified.",
      });
    }, 2000);

    setTimeout(() => {
      setAlertStatus('confirmed');
    }, 4000);
  };

  const handleRefreshLocation = async () => {
    if ('geolocation' in navigator) {
      toast({
        title: "Updating Location",
        description: "Requesting GPS coordinates...",
      });
    }
  };

  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: Users, label: 'Emergency Contacts', path: '/contacts' },
    { icon: History, label: 'Alert History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader
        title="Emergency Alert"
        onMenuClick={() => setMenuOpen(true)}
        onSettingsClick={() => setLocation('/settings')}
      />
      
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" data-testid="sheet-menu">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                onClick={() => {
                  setLocation(item.path);
                  setMenuOpen(false);
                }}
                data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <PanicButton
            onActivate={handlePanicActivate}
            disabled={alertStatus === 'sending'}
          />
        </div>

        <StatusIndicator
          status={alertStatus}
          message={
            alertStatus === 'sent'
              ? 'Alert sent to emergency contacts and services'
              : alertStatus === 'confirmed'
              ? 'Emergency services are on the way'
              : undefined
          }
          timestamp={alertStatus !== 'idle' ? new Date() : undefined}
        />

        <LocationCard
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          address={currentLocation.address}
          lastUpdated={currentLocation.lastUpdated}
          onRefresh={handleRefreshLocation}
        />
      </main>
    </div>
  );
}
