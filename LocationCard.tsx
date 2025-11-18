import LocationCard from '../LocationCard';

export default function LocationCardExample() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <LocationCard
        latitude={37.7749}
        longitude={-122.4194}
        address="123 Market St, San Francisco, CA 94103"
        lastUpdated={new Date()}
        onRefresh={() => console.log('Refreshing location...')}
      />
    </div>
  );
}
