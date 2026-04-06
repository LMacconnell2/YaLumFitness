import type { Request, Response } from "express";
import * as WorkoutService from "../services/workout.service.mts";
import { getDb } from "../database/database.ts";

// workout.controller.mts
export async function generateWorkout(req: Request, res: Response) {
  try {
    const db = getDb();
    
    // Check if user exists before accessing .id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user session found" });
    }

    const plan = await WorkoutService.createPlanFromSurvey(db, req.user.id, req.body.surveyId);
    res.status(201).json(plan);
  } catch (err) {
    console.error("Generation Error:", err);
    res.status(500).json({ error: "Failed to generate plan" });
  }
}

export async function getAllPlans(req: Request, res: Response) {
  console.log(`🔍 [GET] /all-plans - Fetching for user: ${req.user?.id}`);
  try {
    const plans = await WorkoutService.getUserPlans(getDb(), req.user!.id);
    console.log(`📊 Found ${plans.length} plans`);
    res.json(plans);
  } catch (err: any) {
    console.error("❌ Fetch All Plans Error:", err.message);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
}

export async function getPlan(req: Request, res: Response) {
  console.log(`🔍 [GET] /plans/${req.params.id} - Fetching for user: ${req.user?.id}`);
  try {
    const plan = await WorkoutService.getPlanById(getDb(), req.params.id, req.user!.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });
    res.json(plan);
  } catch (err: any) {
    console.error("❌ Fetch Plan Error:", err.message);
    res.status(500).json({ error: "Error fetching plan" });
  }
}

export async function updateWorkout(req: Request, res: Response) {
  try {
    const updated = await WorkoutService.updatePlan(getDb(), req.params.id, req.user!.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
}

export async function removeWorkout(req: Request, res: Response) {
  try {
    await WorkoutService.deletePlan(getDb(), req.params.id, req.user!.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
}