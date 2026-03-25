interface User {
  _id: Object;
  email: string;        // Index: Unique
  passwordHash: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Survey {
  _id: Object;
  userId: Object;     // Index: Secondary
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  availableTimePerWeek: number;
  equipmentAccess: 'home' | 'gym' | 'minimal';
  dietaryRestrictions: string[];
  healthConditions: string[];
  age: number;
  experienceLevel: string;
  createdAt: Date;
}

interface Plan {
  _id: Object;
  userId: Object;     // Index: Secondary
  surveyId: Object;
  status: 'active' | 'archived';
  weeklySchedule: {
    day: string;        // "Monday", "Tuesday"
    activityType: string;
    exercises: Exercise[]; // Names of suggested exercises
  }[];
  targetMetrics: {
    dailyCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
  };
  expiresAt: Date;      // Optional: For plan regeneration logic
}

interface Exercise {
  _id: Object;
  name: string;           // e.g., "Barbell Bench Press"
  category: 'strength' | 'cardio' | 'flexibility';
  primaryMuscleGroup: string; 
  secondaryMuscles: string[];
  equipmentRequired: string[]; // matches Survey.equipmentAccess
  instructions: string[];      // Step-by-step guide
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Workout {
  _id: Object;
  userId: Object;     // Index: Compound { userId: 1, date: -1 }
  name: string;
  date: Date;
  duration: number;     // Minutes
  workoutType: string;
  notes: string;
  exercises: Exercise[];
}

interface Meal {
  _id: Object;
  userId: Object;     // Index: Compound { userId: 1, date: -1 }
  date: Date;
  time: string;         // e.g., "14:30"
  totalMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  foodItems: {
    foodId?: string;    // Reference to common food DB
    name: string;
    servingSize: string;
    calories: number;
  }[];
}

