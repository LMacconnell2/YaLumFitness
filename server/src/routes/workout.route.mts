import { Router } from 'express';
import type { Workout } from '../models/types.ts'
import { createWorkout, getWorkoutById, getWorkoutsByUserId, updateWorkout, deleteWorkout
  
 } from '../models/workout.model.mts';
import { ObjectId } from 'mongodb';
import { getUserById } from '../models/user.model.mts';

interface exercisesReport {
  exerciseId: ObjectId;
  name: String;
  weight: Number | null;
  set: Number;
  reps: Number;
  intensity: Number;
}

const router:Router = Router();

// Create a workout log
// TODO: add auth middleware to get user id from session
router.post('/', async (req, res) => {
  try {
    const {name, duration, workoutType, notes, exercises} = req.body;
    // TODO: get the session and the user id in it
    const userId = new ObjectId('65df12341234123412341235')

    /*
    WORKOUT OBJECT EXAMPLE:
    {
      name: 'Get a Big Arm',
      duration: 90,   // Minutes
      workoutType: 'Arms',
      notes: 'Let's get big arms baby',
      exercises: [
        {
          'exerciseId': '65f1a2b3c4d5e6f7a8b90101',
          'name': 'Barbell Bench Press',
          'weight': 135,
          'sets': 3,
          'reps': 10,
          'intensity': 8
        }
      ];
    }
    */

    // need to call a service to clean the code
    const workout: Workout = {
      userId: userId,
      name: String(name),
      date: new Date(),
      duration: Number(duration),
      workoutType: String(workoutType),
      notes: String(notes || null),
      exercises: exercises
    }

    await createWorkout(workout);

    res.status(201).json('Workout logged successfully')
  } catch (err: Error) {
    if (err.code == 121) {
      return res.status(400).json('Failed to log workout')
    }
    res.status(500).json('An internal server error occurred.');
  }
})

// Get all workout logs for a user
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json('Invalid id requested');
  }

  // skip for now because there is no user in the database yet
  // const user = await getUserById(userId);

  // if (!user) {
  //   return res.status(400).json(`User ${userId} doesn't exist...`)
  // }

  try {
    const workouts = await getWorkoutsByUserId(userId);
    
    if (!workouts) {
      return res.status(400).json(`Fail to get workouts from user ${userId}`)
    }

    res.status(201).json(`Found workouts from user ${userId} successfully`)

  } catch (err) {
    res.status(500).json('An internal server error occurred.')
  }

})

// Update a workout log
router.put('/:workoutId', async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const updateData = req.body;
    const workouts = await getWorkoutById(workoutId);
    if (!workouts) {
      return res.status(400).json(`Workout ${workoutId} doesn't exist...`)
    }
    const result = await updateWorkout(workoutId, updateData);
    if (result.modifiedCount === 0) {
      return res.status(400).json(`Failed to update workout ${workoutId}...`)
    }
    res.status(201).json(`Updated workout successfully`)    
  } catch (err) {
    if (err) {
      return res.status(404).json(`Error: ${err}`)
    }
    res.status(500).json('An internal server error occurred.')
  }
})

router.delete('/:workoutId', async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const workouts = await getWorkoutById(workoutId);
    if (!workouts) {
      return res.status(400).json(`Workout ${workoutId} doesn't exist...`)
    }
    const result = await deleteWorkout(workoutId);
    if (result.deletedCount === 0) {
      return res.status(400).json(`Failed to delete workout ${workoutId}...`)
    }
    res.status(201).json(`Deleted workout successfully`)
  } catch (err) {
    if (err) {
      return res.status(404).json(`Error: ${err}`)
    }
    res.status(500).json('An internal server error occurred.')
  }
})



export default router;
