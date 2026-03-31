import { Router } from 'express';
import workoutRouter from './workout.route.mts';
import exerciseRouter from './exercise.route.mts';
import authRouter from './auth.route.mts';
import surveyRouter from './surveyRoutes.ts';
// import userRouter from './userRoutes.ts';

const router: Router = Router();

router.use('/workouts', workoutRouter);
router.use('/exercises', exerciseRouter);
router.use('/auth', authRouter);
router.use('/survey', surveyRouter);
// router.use('/users', userRouter); // Uncomment this line when user routes are implemented

export default router;