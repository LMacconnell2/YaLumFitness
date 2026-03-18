import argon2 from "argon2";
import { Db } from "mongodb";
import * as mongodb from "../database/database.ts";
import type { User } from "./types.ts";


async function getUserByEmail(email: string): Promise<User | null> {
    // Ensure 'id' matches the field name in your DB (usually _id or id)
    const data = await mongodb.getDb().collection<User>("users").findOne({ 
        email: email.toLowerCase() 
    });
    const count = await mongodb.getDb().collection("users").countDocuments({ email: email });
    console.log("count", count);
    console.log("getUserByEmail:data", data);
    return data;
}


