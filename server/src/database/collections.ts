// src/database/collections.ts
import { BSONType, Db, ObjectId } from 'mongodb';

export async function createCollections(db: Db): Promise<void> {

  // ── Users ──────────────────────────────────────────────────────────────────
  await db.createCollection('user', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'passwordHash', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
        properties: {
          email:        { bsonType: 'string' },
          passwordHash: { bsonType: 'string' },
          firstName:    { bsonType: 'string' },
          lastName:     { bsonType: 'string' },
          createdAt:    { bsonType: 'date' },
          updatedAt:    { bsonType: 'date' },
        },
      },
    },
  });
  await db.collection('user').createIndex({ email: 1 }, { unique: true });


  // ── Surveys ────────────────────────────────────────────────────────────────
  await db.createCollection('surveys', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'fitnessLevel', 'goal', 'availableTimePerWeek', 'equipmentAccess', 'age', 'experienceLevel', 'createdAt'],
        properties: {
          userId:               { bsonType: 'objectId' },
          fitnessLevel:         { bsonType: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
          goal:                 { bsonType: 'string' },
          availableTimePerWeek: { bsonType: 'number' },
          equipmentAccess:      { bsonType: 'string', enum: ['home', 'gym', 'minimal'] },
          dietaryRestrictions:  { bsonType: 'array', items: { bsonType: 'string' } },
          healthConditions:     { bsonType: 'array', items: { bsonType: 'string' } },
          age:                  { bsonType: 'number' },
          experienceLevel:      { bsonType: 'string' },
          createdAt:            { bsonType: 'date' },
        },
      },
    },
  });
  await db.collection('surveys').createIndex({ userId: 1 });


  // ── Plans ──────────────────────────────────────────────────────────────────
  await db.createCollection('plans', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'surveyId', 'status', 'weeklySchedule', 'targetMetrics'],
        properties: {
          userId:   { bsonType: 'objectId' },
          surveyId: { bsonType: 'objectId' },
          status:   { bsonType: 'string', enum: ['active', 'archived'] },
          weeklySchedule: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['day', 'activityType', 'exercises'],
              properties: {
                day:          { bsonType: 'string' },
                activityType: { bsonType: 'string' },
                exercises:    { bsonType: 'array', items: { bsonType: 'string' } },
              },
            },
          },
          targetMetrics: {
            bsonType: 'object',
            required: ['dailyCalories', 'proteinGrams', 'carbsGrams', 'fatsGrams'],
            properties: {
              dailyCalories: { bsonType: 'number' },
              proteinGrams:  { bsonType: 'number' },
              carbsGrams:    { bsonType: 'number' },
              fatsGrams:     { bsonType: 'number' },
            },
          },
          expiresAt: { bsonType: 'date' },
        },
      },
    },
  });
  await db.collection('plans').createIndex({ userId: 1 });

  // ── Exercise ────────────────────────────────────────────────────────────────
  await db.createCollection('exercises', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'equipmentRequired', 'difficulty', 'primaryMuscleGroup', 'mechanics', 'instructions', 'metValue'],
        properties: {
          name:               { bsonType: 'string' },
          category:           { enum: ['strength', 'cardio', 'flexibility']},
          primaryMuscleGroup: { bsonType: 'string' },
          secondaryMuscles:   { bsonType: 'array', items: { bsonType: 'string' } },
          equipmentRequired:  { bsonType: 'array', items: { bsonType: 'string' } },
          instructions:       { bsonType: 'array', items: { bsonType: 'string' }, minItems: 1 },
          difficulty:         { enum: ['beginner', 'intermediate', 'advanced'] },
        }
      }
    }
  });
  await db.collection('exercises').createIndex({ name: 1 }, { unique: true });

  // ── Workouts ───────────────────────────────────────────────────────────────
  await db.createCollection('workouts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'name', 'date', 'duration', 'workoutType', 'exercises'],
        properties: {
          userId:      { bsonType: 'objectId' },
          name:        { bsonType: 'string' },
          date:        { bsonType: 'date' },
          duration:    { bsonType: 'number' },
          workoutType: { bsonType: 'string' },
          notes:       { bsonType: 'string' },
          exercises: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['name', 'sets', 'reps', 'intensity'],
              properties: {
                exerciseId: { bsonType: 'objectId' },
                name:       { bsonType: 'string' },
                weight:     { bsonType: ['number', 'null'] },
                sets:       { bsonType: 'number' },
                reps:       { bsonType: 'number' },
                intensity:  { bsonType: 'number', minimum: 1, maximum: 10 },
              },
            },
          },
        },
      },
    },
  });
  await db.collection('workouts').createIndex({ userId: 1, date: -1 });


  // ── Meals ──────────────────────────────────────────────────────────────────
  await db.createCollection('meals', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'date', 'time', 'totalMacros', 'foodItems'],
        properties: {
          userId: { bsonType: 'objectId' },
          date:   { bsonType: 'date' },
          time:   { bsonType: 'string' },
          totalMacros: {
            bsonType: 'object',
            required: ['calories', 'protein', 'carbs', 'fats'],
            properties: {
              calories: { bsonType: 'number' },
              protein:  { bsonType: 'number' },
              carbs:    { bsonType: 'number' },
              fats:     { bsonType: 'number' },
            },
          },
          foodItems: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['name', 'servingSize', 'calories'],
              properties: {
                foodId:      { bsonType: 'string' },
                name:        { bsonType: 'string' },
                servingSize: { bsonType: 'string' },
                calories:    { bsonType: 'number' },
              },
            },
          },
        },
      },
    },
  });
  await db.collection('meals').createIndex({ userId: 1, date: -1 });
}