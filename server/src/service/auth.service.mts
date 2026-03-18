import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getDb } from "../database/database.ts";

export const auth = betterAuth({
    database: mongodbAdapter(getDb()),
    emailAndPassword: {
        enabled: true,
    }
}); 