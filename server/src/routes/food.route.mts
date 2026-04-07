import { Router } from 'express';
import type { Food } from '../models/types.ts';
import { addFood, getAllFood, buildFoodFilter } from '../models/food.model.mts';

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

router.get('/search', async (req, res) => {
  try {
    console.log('GET api/meals/search')
    console.log('Building Food Filter')
    const filter = buildFoodFilter(req.query);  
    console.log(`Filter: ${filter}`)
    // Apply additional filters in-memory since getMealsByUserId only filters by date
    const meals = await getAllFood(filter);
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error searching meals:', error);
    res.status(500).json({ error: 'Failed to search meals' });
  } 
});

export default router;