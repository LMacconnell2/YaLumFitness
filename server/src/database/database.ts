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