import PanicButton from '../PanicButton';

export default function PanicButtonExample() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <PanicButton onActivate={() => console.log('Emergency alert activated!')} />
    </div>
  );
}
