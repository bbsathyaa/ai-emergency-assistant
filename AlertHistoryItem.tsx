import AlertHistoryItem from '../AlertHistoryItem';

export default function AlertHistoryItemExample() {
  const alerts = [
    {
      id: '1',
      status: 'confirmed' as const,
      timestamp: new Date(Date.now() - 3600000),
      location: '123 Market St, San Francisco, CA',
      contactsNotified: 3
    },
    {
      id: '2',
      status: 'sent' as const,
      timestamp: new Date(Date.now() - 86400000),
      location: '456 Mission St, San Francisco, CA',
      contactsNotified: 2
    }
  ];

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {alerts.map(alert => (
        <AlertHistoryItem
          key={alert.id}
          alert={alert}
          onClick={() => console.log('Alert clicked:', alert.id)}
        />
      ))}
    </div>
  );
}
