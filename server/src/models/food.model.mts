import * as mongodb from '../database/database.ts';
import type { Food } from './types.ts';
import type { Filter } from 'mongodb';

function buildFoodFilter(query: any): Filter<Food> {
  const filter: Filter<Food> = {};

  // 1. Keyword Search (Searches through the names of food items in the meal)
  if (query.q?.trim()) {
    const safeSearch = query.q.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    filter.name = { $regex: safeSearch, $options: "i" };
  }
  // 2. Calorie Filtering (At Most)
  if (query.maxCalories) {
    filter["calories"] = { $lte: Number(query.maxCalories) };
  }

  // 3. Fat Filtering (At Most)
  if (query.maxFats) {
    filter["fats"] = { $lte: Number(query.maxFats) };
  }

  // 4. Protein Filtering (At Least)
  if (query.minProtein) {
    filter["protein"] = { $gte: Number(query.minProtein) };
  }

  // 5. Carbohydrate Filtering (At Least)
  if (query.minCarbs) {
    filter["carbs"] = { $gte: Number(query.minCarbs) };
  }
  return filter;
}

async function getAllFood(filter: Filter<Food>): Promise<Food[]> {
  const data = await mongodb.getDb().collection<Food>('foods').find(filter).toArray();
  return data;
}

async function getFoodByName(name: string): Promise<Food[]> {
  const data = await mongodb.getDb().collection<Food>('foods').find({
    name: { $regex: name, $options: 'i' }
  }).limit(10).toArray();
  return data;
}

async function getFoodById(id: Object): Promise<Food | null> {
  const data = await mongodb.getDb().collection<Food>('foods').findOne({ _id: id });
  return data;
}

async function addFood(food: Food) {
  const result = await mongodb.getDb().collection<Food>('foods').insertOne(food);
  return result;
}

export { getFoodById, getFoodByName, addFood, getAllFood, buildFoodFilter };