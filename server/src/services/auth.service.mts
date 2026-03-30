// services/auth.service.mts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI ?? "");
// Note: In some environments, top-level await might need handling, 
// but for an Express startup, this is generally fine.
await client.connect();
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    },
    // The baseURL MUST be the full URL to the auth route on this server
    baseURL: `${process.env.SERVER_URL}/api/auth`, 
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [process.env.CLIENT_URL || "http://localhost:4321"],
});