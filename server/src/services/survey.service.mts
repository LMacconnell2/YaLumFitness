import { Db, ObjectId } from "mongodb";
import { getSurveyCollection } from "../models/survey.model.mts";
import type { Survey } from "../models/survey.model.mts";


// CREATE
export async function createSurvey(db: Db, data: any) {
  const collection = getSurveyCollection(db);

  const survey: Survey = {
    // 1. Convert userId string to ObjectId
    userId: new ObjectId(data.userId),

    // 2. Map standard strings
    goal: data.goal,
    fitnessLevel: data.fitnessLevel, // Must be 'beginner', 'intermediate', or 'advanced'
    experienceLevel: data.experienceLevel,
    equipmentAccess: data.equipmentAccess,

    // 3. FORCE Number types (Crucial for validation)
    age: Number(data.age),
    availableTimePerWeek: Number(data.availableTimePerWeek),

    // 4. Convert comma-separated strings to Arrays (if applicable)
    dietaryRestrictions: Array.isArray(data.dietaryRestrictions) 
      ? data.dietaryRestrictions 
      : data.dietaryRestrictions ? data.dietaryRestrictions.split(',').map((s: string) => s.trim()) : [],
    
    healthConditions: Array.isArray(data.healthConditions) 
      ? data.healthConditions 
      : data.healthConditions ? data.healthConditions.split(',').map((s: string) => s.trim()) : [],

    createdAt: new Date()
  };

  // Perform the insert
  const result = await collection.insertOne(survey);
  return { ...survey, _id: result.insertedId };
}


// GET BY ID (with ownership)
export async function getSurveyById(
  db: Db,
  id: string,
  userId: string
) {
  const collection = getSurveyCollection(db);

  return await collection.findOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId)
  });
}


// GET USER SURVEYS (pagination)
export async function getUserSurveys(
  db: Db,
  userId: string,
  query: any
) {
  const collection = getSurveyCollection(db);

  const limit = parseInt(query.limit) || 10;
  const offset = parseInt(query.offset) || 0;

  return await collection
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
}


// DELETE (ownership enforced)
export async function deleteSurvey(
  db: Db,
  id: string,
  userId: string
) {
  const collection = getSurveyCollection(db);

  return await collection.deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId)
  });
}


// UPDATE (ownership enforced)
// UPDATE (ownership enforced)
// UPDATE (survey.service.mts)
export async function updateSurvey(
  db: Db,
  id: string,
  userId: string,
  data: any
) {
  const collection = getSurveyCollection(db);

  // Helper to ensure we always have an array of strings
  const parseArray = (val: any) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.split(',').map((s: string) => s.trim()).filter(Boolean);
  };

  // 1. Manually extract ONLY the fields allowed by your Survey model
  // This automatically strips out _id, userId, and createdAt which shouldn't be updated
  const cleanedData = {
    goal: String(data.goal),
    fitnessLevel: data.fitnessLevel, // 'beginner' | 'intermediate' | 'advanced'
    experienceLevel: String(data.experienceLevel),
    equipmentAccess: data.equipmentAccess, // 'home' | 'gym' | 'minimal'
    age: Number(data.age),
    availableTimePerWeek: Number(data.availableTimePerWeek),
    dietaryRestrictions: parseArray(data.dietaryRestrictions),
    healthConditions: parseArray(data.healthConditions),
    updatedAt: new Date()
  };

  console.log("Cleaned Update Payload:", cleanedData);

  const result = await collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    },
    { $set: cleanedData },
    { returnDocument: "after" }
  );

  return result;
}


// SEARCH (admin/global search)
export async function searchSurveys(db: Db, query: any) {
  const collection = getSurveyCollection(db);

  const {
    q,
    startdate,
    enddate,
    limit = 10,
    offset = 0
  } = query;

  const filter: any = {};

  if (q) {
    filter.goal = { $regex: q, $options: "i" };
  }

  if (startdate || enddate) {
    filter.createdAt = {};
    if (startdate) filter.createdAt.$gte = new Date(startdate);
    if (enddate) filter.createdAt.$lte = new Date(enddate);
  }

  return await collection
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(parseInt(offset))
    .limit(parseInt(limit))
    .toArray();
}