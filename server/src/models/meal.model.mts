import * as mongodb from '../database/database.ts';
import { getFoodById } from './food.model.mts';
import type { Meal } from './types.ts';
import { ObjectId } from 'mongodb';
import type { Filter } from 'mongodb';

function buildMealFilter(query: any): Filter<Meal> {
  const filter: Filter<Meal> = {};
  console.log(query)
  // 1. Keyword Search (Searches through the names of food items in the meal)
  if (query.q?.trim()) {
    const safeSearch = query.q.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    filter["foodItems.name"] = { $regex: safeSearch, $options: "i" };
  }

  // 2. Calorie Filtering (At Most)
  if (query.maxCalories) {
    filter["totalMacros.calories"] = { $lte: Number(query.maxCalories) };
  }

  // 3. Fat Filtering (At Most)
  if (query.maxFats) {
    filter["totalMacros.fats"] = { $lte: Number(query.maxFats) };
  }

  // 4. Protein Filtering (At Least)
  if (query.minProtein) {
    filter["totalMacros.protein"] = { $gte: Number(query.minProtein) };
  }

  // 5. Carbohydrate Filtering (At Least)
  if (query.minCarbs) {
    filter["totalMacros.carbs"] = { $gte: Number(query.minCarbs) };
  }
  console.log(filter)
  return filter;
}

async function getMealsByUserId(userId: string, date?: Date): Promise<Meal[] | null> {
  const query: any = { userId: new ObjectId(userId) };

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

async function getMealById(id: string): Promise<Meal | null> {
  const data = await mongodb.getDb().collection<Meal>('meals').findOne({
    _id: new ObjectId(id)
  })
  return data;
}

async function getAllMeals(filter: Filter<Meal>): Promise<Meal[]> {
  const data = await mongodb.getDb().collection<Meal>('meals').find(filter).toArray();
  return data;
}

async function addMeal(meal: Meal) {
  const result = await mongodb.getDb().collection<Meal>('meals').insertOne(meal);
  return result;
}

async function updateMeal(mealId: string, updatedMeal: Partial<Meal>) {
  const result = await mongodb.getDb().collection<Meal>('meals').updateOne(
    { _id: new ObjectId(mealId) },
    { $set: updatedMeal }
  );
  return result;
}

async function deleteMeal(mealId: string) {
  const result = await mongodb.getDb().collection<Meal>('meals').deleteOne({ _id: new ObjectId(mealId) });
  return result;
} 

async function calTotalMacros(foodItems: { foodId: any; servingNum: number }[]): Promise<{ calories: number; protein: number; carbs: number; fats: number }> {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  for (const foodItem of foodItems) {
    // Handle foodId whether it's already an ObjectId or still a string
    const foodId = foodItem.foodId instanceof ObjectId
      ? foodItem.foodId
      : new ObjectId(foodItem.foodId);

    const food = await getFoodById(foodId);
    if (food) {
      totalCalories += food.calories * foodItem.servingNum;
      totalProtein += food.protein * foodItem.servingNum;
      totalCarbs += food.carbs * foodItem.servingNum;
      totalFats += food.fats * foodItem.servingNum;
    }
  }

  return { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fats: totalFats };
}

export { getMealById, getMealsByUserId, addMeal, updateMeal, deleteMeal, calTotalMacros, buildMealFilter, getAllMeals };
