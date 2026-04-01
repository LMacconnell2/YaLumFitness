import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { addMeal, calTotalMacros, getMealsByUserId, getMealById, updateMeal } from '../models/meal.model.mts';
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

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    // Get userId from auth middleware (assuming it's set in req.user)
    const userId = new ObjectId('65df12341234123412341233'); // Placeholder, replace with actual userId from req.user 
    const meals = await getMealsByUserId(userId, date ? new Date(date as string) : undefined);
    if (!meals) {
      return res.status(404).json({ error: 'No meals found for user' });
    }
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

router.put('/:mealId', async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const updateData = req.body;

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    if (updateData.foodItems) {
      updateData.totalMacros = await calTotalMacros(updateData.foodItems);
    }
    
    console.log('Checking if meal exists')
    const meal = await getMealById(new ObjectId(mealId));
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    console.log('Meal exists, updating meal')
    const result = await updateMeal(mealId, updateData);
    console.log('Update result:', result);
    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: 'Failed to update meal' });
    }
    console.log('Meal updated successfully')
    res.status(200).json({ message: 'Meal updated successfully' });
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ error: 'Failed to update meal' });
  }
});


export default router;