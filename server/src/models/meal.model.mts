import * as mongodb from '../database/database.ts';
import type { Meal } from './types.ts';

async function getMealsByUserId(userId: Object): Promise<Meal[] | null> {
  const data = await mongodb.getDb().collection<Meal>('meals').find({
    userId: userId
  }).toArray()
  return data;
}

async function getMealById(id: Object): Promise<Meal | null> {
  const data = await mongodb.getDb().collection<Meal>('meals').findOne({
    _id: id
  })
  return data;
}

async function addMeal(meal: Meal) {
  const result = await mongodb.getDb().collection<Meal>('meals').insertOne(meal);
  return result;
}

async function updateMeal(mealId: Object, updatedMeal: Partial<Meal>) {
  const result = await mongodb.getDb().collection<Meal>('meals').updateOne(
    { _id: mealId },
    { $set: updatedMeal }
  );
  return result;
}

async function deleteMeal(mealId: Object) {
  const result = await mongodb.getDb().collection<Meal>('meals').deleteOne({ _id: mealId });
  return result;
} 

export { getMealById, getMealsByUserId, addMeal, updateMeal, deleteMeal };