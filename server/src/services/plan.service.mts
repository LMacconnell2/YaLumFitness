import { Db, ObjectId } from "mongodb";
import { getPlanCollection } from "../models/plan.model.mts";
import type { Plan } from "../models/plan.model.mts";

export async function createPlan(db: Db, data: Plan) {
  const collection = getPlanCollection(db);
  const result = await collection.insertOne(data);
  return { ...data, _id: result.insertedId };
}

export async function getPlans(db: Db) {
  const collection = getPlanCollection(db);
  return await collection.find().toArray();
}

export async function getPlanById(db: Db, id: string) {
  const collection = getPlanCollection(db);
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function deletePlanById(db: Db, id: string) {
  const collection = getPlanCollection(db);
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function updatePlanById(db: Db, id: string, data: Partial<Plan>) {
  const collection = getPlanCollection(db);
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return await getPlanById(db, id);
}