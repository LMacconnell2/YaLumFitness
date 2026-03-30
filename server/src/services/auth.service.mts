import { betterAuth } from "better-auth";
import { connectDB } from "../database/database.ts";

export const auth = betterAuth({
  database: {
    type: "mongodb",
    db: connectDB()
  },
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ["http://localhost:5173"], // This may need to change.
  baseURL: "http://localhost:3000",
});