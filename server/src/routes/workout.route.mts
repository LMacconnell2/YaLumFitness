import { Router } from 'express';
import type { Workout } from '../models/types.ts'
import { createWorkout } from '../models/workout.model.mts';

const router:Router = Router();

router.post('/', async (req, res) => {
  const {name, workoutType, notes, exercises} = req.body;
  // TODO: get the session and the user id in it
  const userId = Object(1234)
  // TODO: calculate workout time
  const time = 120;

  // TODO?: get exercise objects
  /*
  WORKOUT OBJECT EXAMPLE:
  {
    name: 'Give me Big Arms',
    duration: 90,   // Minutes
    workoutType: 'Arms',
    notes: 'Let's get big arms baby',
    exercises: [
      {
        "_id": XXXXXX,
        "name": "Barbell Curl",
        "category": "strength",
        "primaryMuscleGroup": "Biceps",
        "secondaryMuscles": ["Forearms"],
        "equipmentRequired": ["barbell"],
        "difficulty": "beginner",
        "instructions": [
          "Stand with feet shoulder-width apart, holding a barbell with an underhand grip.",
          "Keep your elbows tucked close to your torso.",
          "Curl the weights while contracting your biceps.",
          "Lower the barbell back to the starting position in a controlled motion."
        ]
      },
      {
        "_id": XXXXXX,
        "name": "Dumbbell Hammer Curl",
        "category": "strength",
        "primaryMuscleGroup": "Biceps",
        "secondaryMuscles": ["Brachialis", "Forearms"],
        "equipmentRequired": ["dumbbells"],
        "difficulty": "beginner",
        "instructions": [
          "Hold dumbbells with a neutral grip (palms facing your body).",
          "Keep the upper arms stationary and curl the weight forward.",
          "Focus on the squeeze at the top of the movement.",
          "Slowly lower the weights back down."
        ]
      },
      {
        "_id": XXXXXX,
        "name": "Tricep Rope Pushdown",
        "category": "strength",
        "primaryMuscleGroup": "Triceps",
        "secondaryMuscles": ["Shoulders"],
        "equipmentRequired": ["cable machine", "rope attachment"],
        "difficulty": "beginner",
        "instructions": [
          "Attach a rope to a high pulley.",
          "Grip the rope with palms facing each other.",
          "Extend your arms downward by contracting the triceps.",
          "Pull the ends of the rope apart at the bottom for maximum contraction."
        ]
      },
      {
        "_id": XXXXXX,
        "name": "Diamond Push-up",
        "category": "strength",
        "primaryMuscleGroup": "Triceps",
        "secondaryMuscles": ["Chest", "Core"],
        "equipmentRequired": ["bodyweight"],
        "difficulty": "intermediate",
        "instructions": [
          "Get into a plank position.",
          "Place your hands together under your chest so your thumbs and index fingers form a diamond.",
          "Lower your chest toward your hands while keeping your elbows tucked.",
          "Push back up to the starting position."
        ]
      },
      {
        "_id": XXXXXX,
        "name": "Farmer’s Carry",
        "category": "strength",
        "primaryMuscleGroup": "Forearms",
        "secondaryMuscles": ["Traps", "Core", "Grip"],
        "equipmentRequired": ["dumbbells", "kettlebells"],
        "difficulty": "beginner",
        "instructions": [
          "Pick up a heavy weight in each hand.",
          "Stand tall with your shoulders pulled back.",
          "Walk forward for a set distance or time while maintaining a tight grip and straight posture."
        ]
      }
    ];
  }
  */
  const workout: Workout = {
    _id: Object(12345),
    userId: userId,
    name: name,
    date: new Date(),
    duration: time,
    workoutType: workoutType,
    notes: notes,
    exercises: exercises
  }

  const result = await createWorkout(workout);
  console.log(result);
})

export default router;
