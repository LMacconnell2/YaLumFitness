import { Router } from 'express';
import type { Food } from '../models/types.ts';
import { addFood } from '../models/food.model.mts';

const router: Router = Router();

// Placeholder for food routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all food items' });
});

router.post('/', async (req, res) => {
  try {
    // Get food details from request body
    const {name, servingSize, servingUnit, calories, protein, carbs, fats} = req.body;
    // Validate input
    if (!name || !servingSize || !servingUnit || calories === undefined || protein === undefined || carbs === undefined || fats === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const food: Food = {
      name,
      servingSize,
      servingUnit,
      calories,
      protein,
      carbs,
      fats
    }
    await addFood(food);

    res.status(201).json({ message: 'Add a new food item' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;