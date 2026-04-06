import { ObjectId, Db, Collection } from "mongodb";

export interface Exercise {
  exercise: string;
  sets: number;
  reps: string | number;
  notes?: string;
}

export interface WorkoutDay {
  dayName: string;
  movements: Exercise[];
}

export interface WorkoutPlan {
  _id?: ObjectId;
  userId: ObjectId;
  surveyId: ObjectId;
  name: string;
  details: string;
  isDefault: boolean;
  exercises: WorkoutDay[];
  createdAt: Date;
  updatedAt?: Date;
}

export function getWorkoutCollection(db: Db): Collection<WorkoutPlan> {
  return db.collection<WorkoutPlan>("workouts");
}