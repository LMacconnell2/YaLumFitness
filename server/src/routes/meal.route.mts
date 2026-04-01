import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { addMeal, calTotalMacros } from '../models/meal.model.mts';
import type { Meal } from '../models/types.ts';

const router: Router = Router();


router.post('/', async (req, res) => {
  try {
    const { date, time, foodItems } = req.body;

    // validate input
    if (!date || !time || !foodItems) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Get userId from auth middleware (assuming it's set in req.user)
    const userId = new ObjectId('65df12341234123412341233'); // Placeholder, replace with actual userId from req.user

    const totalMacros = await calTotalMacros(foodItems);

    const newMeal: Meal = {
      userId: userId,
      date: new Date(date),
      time,
      totalMacros,
      foodItems
    };

    const result = await addMeal(newMeal);

    res.status(201).json(newMeal);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(500).json({ error: 'Failed to create meal' });
  }
});


export default router;