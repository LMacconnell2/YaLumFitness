import * as mongodb from '../database/database.ts';
import { getFoodById } from './food.model.mts';
import type { Meal } from './types.ts';
import { ObjectId } from 'mongodb';

async function getMealsByUserId(userId: Object, date?: Date): Promise<Meal[] | null> {
  const query: any = { userId: userId };

  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    query.date = { 
      $gte: start, 
      $lte: end 
    };
  }
  
  const data = await mongodb.getDb().collection<Meal>('meals').find(query).toArray();
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

async function calTotalMacros(foodItems: { foodId: string; servingNum: number }[]): Promise<{ calories: number; protein: number; carbs: number; fats: number }> {
  console.log('Calculating total macros for food items:', foodItems);
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  for (const foodItem of foodItems) {
    // Assuming you have a function to get food details by ID
    console.log(`Fetching food details for foodId: ${foodItem.foodId}`);
    const food = await getFoodById(new ObjectId(foodItem.foodId));
    if (food) {
      console.log(`Food details for ${food.name}`);
      totalCalories += food.calories * foodItem.servingNum;
      totalProtein += food.protein * foodItem.servingNum;
      totalCarbs += food.carbs * foodItem.servingNum;
      totalFats += food.fats * foodItem.servingNum;
    }
  }

  return { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fats: totalFats };
}

export { getMealById, getMealsByUserId, addMeal, updateMeal, deleteMeal, calTotalMacros };