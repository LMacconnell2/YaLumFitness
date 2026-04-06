import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { Db, ObjectId } from "mongodb";
import { getWorkoutCollection } from "../models/workout.model.mts";
import { getSurveyCollection } from "../models/survey.model.mts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("OpenAI Object Keys:", Object.keys(openai));

// Define the response schema for Gemini to ensure it follows your MongoDB validation
const WorkoutPlanSchema = z.object({
  name: z.string(),
  notes: z.string(),
  exercises: z.array(z.object({
    dayName: z.string(),
    movements: z.array(z.object({
      exercise: z.string(),
      sets: z.number(),
      reps: z.string(),
      notes: z.string()
    }))
  }))
});

export async function createPlanFromSurvey(db: Db, userId: string, surveyId: string) {
  const survey = await getSurveyCollection(db).findOne({ _id: new ObjectId(surveyId) });
  if (!survey) throw new Error("Survey not found");

  // Simulate AI "Thinking" time so your frontend loader looks real
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Manually construct a plan that matches your Zod/MongoDB schema
  const mockPlan = {
    userId: new ObjectId(userId),
    surveyId: new ObjectId(surveyId),
    name: `${survey.goal} - ${survey.fitnessLevel} Plan`,
    notes: `A customized routine for ${survey.experienceLevel} level using ${survey.equipmentAccess} equipment.`,
    createdAt: new Date(),
    updatedAt: new Date(),
    exercises: [
      {
        dayName: "Day 1: Upper Body Focus",
        movements: [
          { 
            exercise: survey.equipmentAccess === 'gym' ? "Bench Press" : "Push Ups", 
            sets: 3, 
            reps: "10-12", 
            notes: "Keep your core tight." 
          },
          { 
            exercise: "Dumbbell Rows", 
            sets: 3, 
            reps: "12", 
            notes: "Focus on the squeeze at the top." 
          }
        ]
      },
      {
        dayName: "Day 2: Lower Body & Core",
        movements: [
          { 
            exercise: "Squats", 
            sets: 4, 
            reps: "8-10", 
            notes: "Go as deep as form allows." 
          },
          { 
            exercise: "Plank", 
            sets: 3, 
            reps: "45 seconds", 
            notes: "Don't let your hips sag." 
          }
        ]
      }
    ]
  };

  const result = await getWorkoutCollection(db).insertOne(mockPlan);
  return { ...mockPlan, _id: result.insertedId };
}

export async function updatePlan(db: Db, planId: string, userId: string, updateData: any) {
  const { _id, userId: u, ...validData } = updateData;
  return await getWorkoutCollection(db).findOneAndUpdate(
    { _id: new ObjectId(planId), userId: new ObjectId(userId) },
    { $set: { ...validData, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
}

export async function deletePlan(db: Db, planId: string, userId: string) {
  return await getWorkoutCollection(db).deleteOne({ 
    _id: new ObjectId(planId), 
    userId: new ObjectId(userId) 
  });
}