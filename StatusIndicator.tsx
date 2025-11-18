import StatusIndicator from '../StatusIndicator';

export default function StatusIndicatorExample() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <StatusIndicator status="idle" />
      <StatusIndicator 
        status="sending" 
        message="Contacting emergency services and contacts..."
        timestamp={new Date()}
      />
      <StatusIndicator 
        status="sent" 
        message="Alert sent to 3 contacts and local emergency services"
        timestamp={new Date()}
      />
      <StatusIndicator 
        status="confirmed" 
        message="Emergency services have been dispatched to your location"
        timestamp={new Date()}
      />
    </div>
  );
}
