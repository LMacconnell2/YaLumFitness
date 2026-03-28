import { Router } from "express";
import { getCurrentUserSurvey, getSurveyResults, getSurveyById, deleteSurveyById, updateSurveyById, newSurvey } from "../controllers/survey.controller.mts";
import requireAuth from "../controllers/auth.controller.mts";

const router: Router = Router();

// GET /survey/?q=string&limit=10&offset=10stardate=mm-dd-yyyy&enddate=mm-dd-yyy
// This will retrieve the route for the current user's surveys which can be filtered and paginated.
router.get("/", requireAuth, getCurrentUserSurvey);

// GET /survey/results?q=string&limit=10&offset=10&stardate=mm-dd-yyyy&enddate=mm-dd-yyy
// This will display surveys based upon search, startdate, enddate, offset and limit.
router.get("/results", requireAuth, getSurveyResults);

// GET /survey/results/:id
// This will retrieve a survey based on its ID.
router.get("/results/:id", requireAuth, getSurveyById);

// DELETE /survey/results/:id
//This will remove a survey based upon its ID.
router.delete("/results/:id", requireAuth, deleteSurveyById);

// POST /survey/results/:id
// This will update a survey based upon its ID.
router.post("/results/:id", requireAuth, updateSurveyById);

// POST /survey/
// This will be the route to add a new survey result to the DB.
router.post("/", requireAuth, newSurvey);

export default router;
