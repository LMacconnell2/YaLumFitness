//survey.controller.mts
import type { Request, Response } from "express";
import * as SurveyService from "../services/survey.service.mts";
import { getDb } from "../database/database.ts";

type IdParams = {
  id: string;
};

export async function newSurvey(req: Request, res: Response) {
  try {
    const db = getDb();

    const survey = await SurveyService.createSurvey(db, {
      ...req.body,
      userId: req.user?.id
    });

    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ error: "Failed to create survey" });
  }
}


export async function getCurrentUserSurvey(req: Request, res: Response) {
  try {
    const db = getDb();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const surveys = await SurveyService.getUserSurveys(
      db,
      req.user.id,
      req.query
    );

    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
}


export async function getSurveyById(req: Request<IdParams>, res: Response) {

  try {
    const db = getDb();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const survey = await SurveyService.getSurveyById(
      db,
      req.params.id,
      req.user.id // enforce ownership
    );

    if (!survey) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(survey);
  } catch {
    res.status(500).json({ error: "Error retrieving survey" });
  }
}


export async function deleteSurveyById(req: Request<IdParams>, res: Response) {
  try {
    const db = getDb();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = await SurveyService.deleteSurvey(
      db,
      req.params.id,
      req.user.id
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Error deleting survey" });
  }
}


export async function updateSurveyById(req: Request<IdParams>, res: Response) {
  try {
    const db = getDb();
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const updated = await SurveyService.updateSurvey(
      db,
      req.params.id,
      req.user.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Error updating survey" });
  }
}


export async function getSurveyResults(req: Request, res: Response) {
  try {
    const db = getDb();

    const results = await SurveyService.searchSurveys(
      db,
      req.query
    );

    res.json(results);
  } catch {
    res.status(500).json({ error: "Error fetching results" });
  }
}