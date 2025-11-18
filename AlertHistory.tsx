import AppHeader from "@/components/AppHeader";
import AlertHistoryItem, { type AlertHistoryEntry } from "@/components/AlertHistoryItem";
import { useLocation } from "wouter";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function AlertHistory() {
  const [, setLocation] = useLocation();
  
  const [alerts] = useState<AlertHistoryEntry[]>([
    {
      id: '1',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 3600000),
      location: '123 Market St, San Francisco, CA 94103',
      contactsNotified: 3
    },
    {
      id: '2',
      status: 'sent',
      timestamp: new Date(Date.now() - 86400000),
      location: '456 Mission St, San Francisco, CA 94105',
      contactsNotified: 2
    },
    {
      id: '3',
      status: 'sent',
      timestamp: new Date(Date.now() - 172800000),
      location: '789 Howard St, San Francisco, CA 94103',
      contactsNotified: 3
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader
        title="Alert History"
        onMenuClick={() => setLocation('/')}
        onSettingsClick={() => setLocation('/settings')}
      />

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            View your past emergency alerts and their status
          </p>

          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Alert History</h3>
              <p className="text-sm text-muted-foreground">
                Your emergency alerts will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map(alert => (
                <AlertHistoryItem
                  key={alert.id}
                  alert={alert}
                  onClick={() => console.log('View alert details:', alert.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
