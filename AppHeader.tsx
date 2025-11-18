import AppHeader from '../AppHeader';

export default function AppHeaderExample() {
  return (
    <div>
      <AppHeader
        title="Emergency Alert"
        onMenuClick={() => console.log('Menu clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
      />
    </div>
  );
}
