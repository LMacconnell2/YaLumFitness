import * as mongodb from "../database/database.ts";
import { ObjectId } from "mongodb";
import type { Exercise, Workout } from "./types.ts";

async function getWorkoutsByUserId(userId: string): Promise<Workout[] | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').find({
    userId: new ObjectId(userId)
  }).toArray()

  console.log(data);

  return data;
}

async function getWorkoutById(id: string): Promise<Workout | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').findOne({
    _id: new ObjectId(id)
  })

  console.log (data);

  return data;
}

async function createWorkout(workout) {
  const result = await mongodb.getDb().collection<Workout>('workouts').insertOne(workout);
  console.log(result);
  return result;
}

export {getWorkoutsByUserId, getWorkoutById, createWorkout};