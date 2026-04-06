import { Db, ObjectId } from "mongodb";

// GET profile
export async function getUserProfile(db: Db, userId: string) {
  return await db.collection("user").findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        name: 1,
        email: 1,
        height: 1,
        fitnessGoal: 1,
        startingWeight: 1,
        currentWeight: 1,
        createdAt: 1
        // updatedAt is usually useful to have too!
      }
    }
  );
}

// UPDATE profile
export async function updateUserProfile(
  db: Db,
  userId: string,
  data: any
) {
  // 1. Destructure to SEPARATE the _id and other protected fields from the update data
  // This prevents the "Modifying immutable field '_id'" error.
  const { _id, createdAt, emailVerified, ...updateData } = data;

  return await db.collection("user").findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    },
    { returnDocument: "after" }
  );
}