import { Router } from 'express';
import type { Workout } from '../models/types.ts'
import { createWorkout } from '../models/workout.model.mts';
import { ObjectId } from 'mongodb';

interface exercisesReport {
  exerciseId: ObjectId;
  name: String;
  weight: Number | null;
  set: Number;
  reps: Number;
  intensity: Number;
}

const router:Router = Router();

router.post('/', async (req, res) => {
  try {
    const {name, duration, workoutType, notes, exercises} = req.body;
    // TODO: get the session and the user id in it
    const userId = new ObjectId("65df12341234123412341234")

    /*
    WORKOUT OBJECT EXAMPLE:
    {
      name: 'Get a Big Arm',
      duration: 90,   // Minutes
      workoutType: 'Arms',
      notes: 'Let's get big arms baby',
      exercises: [
        {
          "exerciseId": "65f1a2b3c4d5e6f7a8b90101",
          "name": "Barbell Bench Press",
          "weight": 135,
          "sets": 3,
          "reps": 10,
          "intensity": 8
        }
      ];
    }
    */

    // need to call a service to clean the code
    const workout = {
      userId: userId,
      name: String(name),
      date: new Date(),
      duration: Number(duration),
      workoutType: String(workoutType),
      notes: String(notes || null),
      exercises: exercises
    }

    await createWorkout(workout);

    res.status(201).json("Workout logged successfully")
  } catch (err: Error) {
    if (err.code == 121) {
      return res.status(400).json("Failed to log workout")
    }
    res.status(500).json("An internal server error occurred.");
  }
})

export default router;
