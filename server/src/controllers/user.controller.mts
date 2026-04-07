import type { Request, Response } from "express";
import * as UserService from "../services/user.service.mts";
import { getDb } from "../database/database.ts";

// GET current auth user
export async function getCurrentUser(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json(req.user);
}

// GET extended profile
export async function getUserProfile(req: Request, res: Response) {
  try {
    const db = getDb();

    // req.user.id comes from your Better-Auth middleware
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const profile = await UserService.getUserProfile(db, req.user.id);

    if (!profile) {
      console.error(`Profile not found for ID: ${req.user.id}`);
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Fetch Profile Error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}

// UPDATE profile
export async function updateUserProfile(req: Request, res: Response) {
  console.log("Received update profile request with body:", req.body);
  try {
    const db = getDb();
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const result = await UserService.updateUserProfile(
      db,
      req.user.id,
      req.body
    );

    // 1. Handle the "No document found" case
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Check if 'result' is the wrapper (old driver) or the doc (new driver)
    // If result.value exists, use it; otherwise, use the result itself.
    const updatedDoc = result.hasOwnProperty('value') ? result.value : result;

    res.json(updatedDoc);
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}