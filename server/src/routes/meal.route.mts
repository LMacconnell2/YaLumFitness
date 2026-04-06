import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { addMeal, calTotalMacros, getMealsByUserId, getMealById, updateMeal, deleteMeal, buildMealFilter, getAllMeals } from '../models/meal.model.mts';
import { requireAuth } from '../middleware/authMiddleware.mts';
import type { Meal } from '../models/types.ts';

const router: Router = Router();

// Protect all meal routes
router.use(requireAuth);

router.post('/', async (req, res) => {
  try {
    const { date, time, foodItems } = req.body;

    if (!date || !time || !foodItems?.length) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const userId = new ObjectId(res.locals.user.id);

    // Convert foodId strings to ObjectIds for the model
    const normalizedItems = foodItems.map((item: { foodId: string; servingNum: number }) => ({
      foodId: new ObjectId(item.foodId),
      servingNum: item.servingNum
    }));

    const totalMacros = await calTotalMacros(normalizedItems);

    const newMeal: Meal = {
      userId,
      date: new Date(date),
      time,
      totalMacros,
      foodItems: normalizedItems
    };

    await addMeal(newMeal);
    res.status(201).json(newMeal);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(500).json({ error: 'Failed to create meal' });
  }
});


router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const userId = res.locals.user.id; // already a string, model handles it

    const meals = await getMealsByUserId(userId, date ? new Date(date as string) : undefined);
    res.status(200).json(meals ?? []);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

router.put('/:mealId', async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const updateData = req.body;

    const meal = await getMealById(mealId);
    if (!meal) return res.status(404).json({ error: 'Meal not found' });

    // Prevent users from editing someone else's meal
    if (meal.userId.toString() !== res.locals.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.foodItems) updateData.totalMacros = await calTotalMacros(updateData.foodItems);

    const result = await updateMeal(mealId, updateData);
    if (result.modifiedCount === 0) return res.status(400).json({ error: 'Failed to update meal' });

    res.status(200).json({ message: 'Meal updated successfully' });
  } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ error: 'Failed to update meal' });
  }
});

router.delete('/:mealId', async (req, res) => {
  try {
    const mealId = req.params.mealId;

    const meal = await getMealById(mealId);
    if (!meal) return res.status(404).json({ error: 'Meal not found' });

    // Prevent users from deleting someone else's meal
    if (meal.userId.toString() !== res.locals.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const result = await deleteMeal(mealId);
    if (result.deletedCount === 0) return res.status(400).json({ error: 'Failed to delete meal' });

    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const filter = buildMealFilter(req.query);  

    // Apply additional filters in-memory since getMealsByUserId only filters by date
    const meals = await getAllMeals(filter);
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error searching meals:', error);
    res.status(500).json({ error: 'Failed to search meals' });
  } 
});


export default router;