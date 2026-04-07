import { Router } from 'express';
import { ObjectId } from 'mongodb';
import type { Food } from '../models/types.ts';
import { addFood, getAllFood, getFoodByName, getFoodById, buildFoodFilter } from '../models/food.model.mts';

const router: Router = Router();

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const foods = await getFoodByName(search as string);
      return res.status(200).json(foods);
    }
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

router.get('/:foodId', async (req, res) => {
  try {
    const food = await getFoodById(new ObjectId(req.params.foodId));
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, servingSize, servingUnit, calories, protein, carbs, fats } = req.body;
    if (!name || !servingSize || !servingUnit || calories === undefined || protein === undefined || carbs === undefined || fats === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const food: Food = { name, servingSize, servingUnit, calories, protein, carbs, fats };
    await addFood(food);
    res.status(201).json({ message: 'Food item added' });
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