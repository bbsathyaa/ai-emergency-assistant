import EmergencyContactCard from '../EmergencyContactCard';

export default function EmergencyContactCardExample() {
  const contact = {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    relationship: 'Sister'
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <EmergencyContactCard
        contact={contact}
        onEdit={(c) => console.log('Edit contact:', c)}
        onDelete={(id) => console.log('Delete contact:', id)}
      />
    </div>
  );
}
