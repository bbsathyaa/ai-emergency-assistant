import { 
  emergencyContacts,
  alerts,
  userSettings,
  type EmergencyContact, 
  type InsertEmergencyContact,
  type Alert,
  type InsertAlert,
  type UserSettings,
  type InsertUserSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getEmergencyContacts(): Promise<EmergencyContact[]>;
  getEmergencyContact(id: string): Promise<EmergencyContact | undefined>;
  createEmergencyContact(contact: InsertEmergencyContact): Promise<EmergencyContact>;
  updateEmergencyContact(id: string, contact: InsertEmergencyContact): Promise<EmergencyContact | undefined>;
  deleteEmergencyContact(id: string): Promise<boolean>;
  
  getAlerts(): Promise<Alert[]>;
  getAlert(id: string): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  
  getUserSettings(): Promise<UserSettings | undefined>;
  updateUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
}

export class DatabaseStorage implements IStorage {
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return await db.select().from(emergencyContacts);
  }

  async getEmergencyContact(id: string): Promise<EmergencyContact | undefined> {
    const [contact] = await db.select().from(emergencyContacts).where(eq(emergencyContacts.id, id));
    return contact || undefined;
  }

  async createEmergencyContact(insertContact: InsertEmergencyContact): Promise<EmergencyContact> {
    const [contact] = await db
      .insert(emergencyContacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async updateEmergencyContact(id: string, insertContact: InsertEmergencyContact): Promise<EmergencyContact | undefined> {
    const [updated] = await db
      .update(emergencyContacts)
      .set(insertContact)
      .where(eq(emergencyContacts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteEmergencyContact(id: string): Promise<boolean> {
    const result = await db
      .delete(emergencyContacts)
      .where(eq(emergencyContacts.id, id))
      .returning();
    return result.length > 0;
  }

  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts).orderBy(desc(alerts.timestamp));
  }

  async getAlert(id: string): Promise<Alert | undefined> {
    const [alert] = await db.select().from(alerts).where(eq(alerts.id, id));
    return alert || undefined;
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const [alert] = await db
      .insert(alerts)
      .values(insertAlert)
      .returning();
    return alert;
  }

  async getUserSettings(): Promise<UserSettings | undefined> {
    const [settings] = await db.select().from(userSettings).limit(1);
    return settings || undefined;
  }

  async updateUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
    const existing = await this.getUserSettings();
    
    if (existing) {
      const [updated] = await db
        .update(userSettings)
        .set(insertSettings)
        .where(eq(userSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userSettings)
        .values(insertSettings)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
