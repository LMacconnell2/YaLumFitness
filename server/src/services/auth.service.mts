import { betterAuth } from "better-auth";
import { getDb } from "../database/database.ts";

export const auth = betterAuth({
  database: {
    type: "mongodb",
    db: getDb()
  },
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: ["http://localhost:5173"], // This may need to change.
});