import argon2 from "argon2";
import { Db, ObjectId } from "mongodb";
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

async function getUserById(id: string): Promise<User | null> {
    console.log("Searching for ID:", id, "Type of ID:", typeof id);
    const converted = new ObjectId(id);
    console.log("Converted to:", converted, "Is Instance of ObjectId:", converted instanceof ObjectId);
    const data = await mongodb.getDb().collection<User>("users").findOne({
        _id: converted
    })
    return data;
}

export {getUserByEmail, getUserById};
