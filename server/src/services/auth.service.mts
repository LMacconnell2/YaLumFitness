import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI ?? "");
await client.connect();
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.SERVER_URL,
    trustedOrigins: [process.env.CLIENT_URL || "http://localhost:4321"],
});