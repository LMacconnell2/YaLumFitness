import { ObjectId, Db, Collection } from "mongodb";

// Pure TypeScript type (no runtime enforcement)
export interface Survey {
  _id?: ObjectId;
  userId: ObjectId;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  availableTimePerWeek: number;
  equipmentAccess: 'home' | 'gym' | 'minimal';
  dietaryRestrictions: string[];
  healthConditions: string[];
  age: number;
  experienceLevel: string;
  createdAt?: Date;
}

// Get collection (dependency injected DB)
export function getSurveyCollection(db: Db): Collection<Survey> {
  return db.collection<Survey>("surveys");
}