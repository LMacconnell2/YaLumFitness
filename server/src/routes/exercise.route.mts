import { Router } from 'express';
import type { Exercise } from '../models/types.ts';
import { createExercise } from '../models/excercise.model.mts';

const router: Router = Router();


router.post('/', async (req, res) => {
  const {name, category, primaryMuscleGroup, secondaryMuscles, equipmentRequired, instructions, difficulty} = req.body;

  const newExercise = {
    name: name,
    category: category,
    primaryMuscleGroup: primaryMuscleGroup,
    secondaryMuscles: secondaryMuscles,
    equipmentRequired: equipmentRequired,
    instructions: instructions,
    difficulty: difficulty
  }

  try {
    await createExercise(newExercise)

    res.status(201).json("Exercise logged successfully")
  } catch (err: Error) {
    if (err.code == 121) {
      return res.status(400).json('Failed to log exercise')
    }
    res.status(500).json('An internal server error occurred.');
  }
})






export default router;