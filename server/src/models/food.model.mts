import * as mongodb from '../database/database.ts';
import type { Food } from './types.ts';

async function getFoodByName(name: String): Promise<Food[] | null> {
  const data = await mongodb.getDb().collection<Food>('foods').find({
    name: name
  }).toArray()
  return data;
}

async function getFoodById(id: Object): Promise<Food | null> {
  const data = await mongodb.getDb().collection<Food>('foods').findOne({
    _id: id
  })
  return data;
}

async function addFood(food: Food) {
  const result = await mongodb.getDb().collection<Food>('foods').insertOne(food);
  return result;
}

export { getFoodById, getFoodByName, addFood };