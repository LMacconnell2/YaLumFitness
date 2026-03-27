import * as mongodb from "../database/database.ts";
import type { Exercise, Workout } from "./types.ts";

async function getWorkoutsByUser(userId: Object): Promise<Workout[] | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').find({
    userId: userId
  }).toArray()

  console.log(data);

  return data;
}

async function getWorkoutById(id: Object): Promise<Workout | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').findOne({
    _id: id
  })

  console.log (data);

  return data;
}

async function createWorkout(workout) {
  const result = await mongodb.getDb().collection<Workout>('workouts').insertOne(workout);
  console.log(result);
  return result;
}

export {getWorkoutsByUser, getWorkoutById, createWorkout};