import * as mongodb from '../database/database.ts';
import { ObjectId } from 'mongodb';
import type { Exercise, Workout } from './types.ts';

async function getWorkoutsByUserId(userId: string): Promise<Workout[] | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').find({
    userId: new ObjectId(userId)
  }).toArray()

  return data;
}

async function getWorkoutById(id: string): Promise<Workout | null> {
  const data = await mongodb.getDb().collection<Workout>('workouts').findOne({
    _id: new ObjectId(id)
  })

  return data;
}

async function createWorkout(workout) {
  const result = await mongodb.getDb().collection<Workout>('workouts').insertOne(workout);

  return result;
}

async function updateWorkout(workoutId: string, updateData: Object) {
  const result = await mongodb.getDb().collection<Workout>('workouts').updateOne({
    _id: new ObjectId(workoutId)
  }, {
    $set: updateData
  });
  console.log(result);
  return result;
}

async function deleteWorkout(workoutId: string) {
  const result = await mongodb.getDb().collection<Workout>('workouts').deleteOne({
    _id: new ObjectId(workoutId)
  });
  return result;
}

export {getWorkoutsByUserId, getWorkoutById, createWorkout, updateWorkout, deleteWorkout};