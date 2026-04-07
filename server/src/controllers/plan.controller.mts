import type { Request, Response } from "express";
import * as PlanService from "../services/plan.service.mts";
import { connectDB } from "../database/database.ts";

export async function newPlan(req: Request, res: Response) {
  try {
    const db = await connectDB();
    const plan = await PlanService.createPlan(db, req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPlans(req: Request, res: Response) {
  try {
    const db = await connectDB();
    const plans = await PlanService.getPlans(db);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPlanById(req: Request<{ id: string }>, res: Response) {
  try {
    const db = await connectDB();
    const plan = await PlanService.getPlanById(db, req.params.id);
    if (!plan) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function deletePlanById(req: Request<{ id: string }>, res: Response) {
  try {
    const db = await connectDB();
    const plan = await PlanService.getPlanById(db, req.params.id);
    if (!plan) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }
    await PlanService.deletePlanById(db, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function updatePlanById(req: Request<{ id: string }>, res: Response) {
  try {
    const db = await connectDB();
    const plan = await PlanService.getPlanById(db, req.params.id);
    if (!plan) {
      res.status(404).json({ error: "Plan not found" });
      return;
    }
    const updatedPlan = await PlanService.updatePlanById(db, req.params.id, req.body);
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getCurrentUserPlans(req: Request, res: Response) {
  try {
    const db = await connectDB();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const plans = await PlanService.getPlansByUserId(db, req.user.id);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPlanResults(req: Request<{ id: string }>, res: Response) {
  try {
    const db = await connectDB();
    const planResults = await PlanService.getPlanResults(db, req.params.id);
    res.json(planResults);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPlanResultsByUserId(req: Request, res: Response) {
  try {
    const db = await connectDB();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const planResults = await PlanService.getPlanResultsByUserId(db, req.user.id);
    res.json(planResults);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getPlanResultsByPlanId(req: Request<{ id: string }>, res: Response) {
  try {
    const db = await connectDB();
    const planResults = await PlanService.getPlanResultsByPlanId(db, req.params.id);
    res.json(planResults);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

//Modify the following function to connect to our AI service and retrieve a plan. Then, save it to the current user.
export async function getPlanFromAI(req: Request, res: Response) {
  try {
    const db = await connectDB();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const plan = await PlanService.getPlanFromAI(db, req.user.id, req.body);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
