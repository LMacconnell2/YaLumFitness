import * as mongodb from '../database/database.ts';
import type { Exercise, Workout } from './types.ts';

async function getExercisesByName(name: String): Promise<Exercise[] | null> {
  const data = await mongodb.getDb().collection<Exercise>('exercises').find({
    name: name
  }).toArray()

  console.log(data);

  return data;
}

async function getExerciseById(id: Object): Promise<Exercise | null> {
  const data = await mongodb.getDb().collection<Exercise>('exercises').findOne({
    _id: id
  })

  console.log (data);

  return data;
}

async function createExercise(exercise: Exercise) {
  const result = await mongodb.getDb().collection<Exercise>('exercises').insertOne(exercise);
  console.log(result);
}

export {getExerciseById, getExercisesByName, createExercise};