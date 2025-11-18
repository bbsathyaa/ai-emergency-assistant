import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import EmergencyContactCard, { type EmergencyContact } from "@/components/EmergencyContactCard";
import AddContactDialog from "@/components/AddContactDialog";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Contacts() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | undefined>();
  
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', relationship: 'Sister' },
    { id: '2', name: 'Michael Chen', phone: '+1 (555) 234-5678', relationship: 'Best Friend' },
    { id: '3', name: 'Dr. Emily Roberts', phone: '+1 (555) 345-6789', relationship: 'Doctor' },
  ]);

  const handleSaveContact = (contactData: Omit<EmergencyContact, 'id'>) => {
    if (editingContact) {
      setContacts(prev =>
        prev.map(c => c.id === editingContact.id ? { ...contactData, id: c.id } : c)
      );
      toast({
        title: "Contact Updated",
        description: `${contactData.name} has been updated.`,
      });
    } else {
      const newContact: EmergencyContact = {
        ...contactData,
        id: Date.now().toString()
      };
      setContacts(prev => [...prev, newContact]);
      toast({
        title: "Contact Added",
        description: `${contactData.name} has been added to emergency contacts.`,
      });
    }
    setEditingContact(undefined);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setDialogOpen(true);
  };

  const handleDeleteContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    setContacts(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Contact Removed",
      description: `${contact?.name} has been removed from emergency contacts.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader
        title="Emergency Contacts"
        onMenuClick={() => setLocation('/')}
        onSettingsClick={() => setLocation('/settings')}
      />

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add people who should be notified in case of an emergency
          </p>

          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Emergency Contacts</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add contacts who will be notified during emergencies
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map(contact => (
                <EmergencyContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => {
            setEditingContact(undefined);
            setDialogOpen(true);
          }}
          data-testid="button-add-contact"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <AddContactDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingContact(undefined);
        }}
        onSave={handleSaveContact}
        editContact={editingContact}
      />
    </div>
  );
}
