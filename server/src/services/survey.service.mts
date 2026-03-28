import { Db, ObjectId } from "mongodb";
import { getSurveyCollection } from "../models/survey.model.mts";
import type { Survey } from "../models/survey.model.mts";


// CREATE
export async function createSurvey(db: Db, data: Survey) {
  const collection = getSurveyCollection(db);

  const survey: Survey = {
    ...data,
    userId: new ObjectId(data.userId),
    createdAt: new Date()
  };

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
export async function updateSurvey(
  db: Db,
  id: string,
  userId: string,
  data: Partial<Survey>
) {
  const collection = getSurveyCollection(db);

  return await collection.findOneAndUpdate(
    {
      _id: new ObjectId(id),
      userId: new ObjectId(userId)
    },
    {
      $set: {
        ...data,
        updatedAt: new Date()
      }
    },
    {
      returnDocument: "after"
    }
  );
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