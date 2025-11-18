import { useState } from 'react';
import AddContactDialog from '../AddContactDialog';
import { Button } from '@/components/ui/button';

export default function AddContactDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AddContactDialog
        open={open}
        onOpenChange={setOpen}
        onSave={(contact) => console.log('Save contact:', contact)}
      />
    </div>
  );
}
