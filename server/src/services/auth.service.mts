import { betterAuth } from "better-auth";
import { getDb } from "../database/database.ts";

let auth: ReturnType<typeof betterAuth>;

export function initAuth() {
  auth = betterAuth({
    database: {
      type: "mongodb",
      db: getDb() // safe now — called after connectDB()
    },
    emailAndPassword: {
      enabled: true
    },
    trustedOrigins: ["http://localhost:5173"],
  });
}

export function getAuth() {
  if (!auth) throw new Error("Auth not initialized. Call initAuth first.");
  return auth;
}