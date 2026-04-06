// src/database/database.ts
import { MongoClient, Db } from 'mongodb';
import { createCollections } from './collections.ts';

let db: Db;

export async function connectDB(): Promise<Db> {
  const client = new MongoClient(process.env.MONGO_URI!);
  await client.connect();
  db = client.db();

  // Only run collection setup on first init
  const existing = await db.listCollections().toArray();
  if (existing.length === 0) {
    await createCollections(db);
  }

  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.client.close();
  }
}

//Modified getDb so that it cannot be called until connectDB is initialized.
export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};