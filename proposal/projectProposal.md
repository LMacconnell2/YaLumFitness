# Fitness Tracker Application - Requirements Document

## 1. Project Overview

**Project Name:** Fitness Tracker  
**Purpose:** A comprehensive web application that enables users to track their fitness activities, nutrition, and progress against AI-generated fitness plans personalized to their goals and capabilities.

**Technology Stack:**

- **Frontend:** Astro with Svelte 5 components (multi-page site with Svelte islands for interactivity)
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (native driver - no Mongoose)
- **Styling:** CSS modules and plain CSS (no Tailwind)
- **Language:** TypeScript across the stack

### 1.1 Team Members

- Logan MacConnell
- Hyrum Bullock
- Yat Lam

---

## 2. Target Audience

- General audience interested in physical health
- Fitness enthusiasts and gym-goers
- Individuals seeking structured fitness guidance
- Users wanting to track nutrition and exercise habits
- People looking for data-driven fitness insights

---

## 3. Core Features & Functional Requirements

### 3.1 User Management

- **FR-1.1:** User registration and account creation
- **FR-1.2:** User authentication and session management
- **FR-1.3:** User profile management (name, email, basic info)
- **FR-1.4:** Password reset functionality
- **FR-1.5:** Account deletion option

### 3.2 Initial Assessment Survey

- **FR-2.1:** Multi-step survey to gather user fitness information:
  - Current fitness level (beginner, intermediate, advanced)
  - Fitness goals (weight loss, muscle gain, endurance, general health)
  - Available time for fitness (hours per week)
  - Equipment access (home gym, commercial gym, minimal)
  - Dietary preferences and restrictions
  - Health conditions or physical limitations
  - Age and experience level
- **FR-2.2:** Survey responses stored in user profile
- **FR-2.3:** Ability to retake survey to update AI plan

### 3.3 AI-Generated Fitness Plans

- **FR-3.1:** Generate personalized fitness plan based on survey responses
- **FR-3.2:** Display plan with weekly schedule and exercise recommendations
- **FR-3.3:** Include target metrics (reps, sets, duration, intensity)
- **FR-3.4:** Ability to view plan details and modify preferences for regeneration

### 3.4 Gym Activity Tracking

- **FR-4.1:** Log gym visits with:
  - Date and time
  - Duration of workout
  - Type of workout (cardio, strength, flexibility, mixed)
- **FR-4.2:** Track individual exercises with:
  - Exercise name/type
  - Weight used (if applicable)
  - Number of sets and reps completed
  - Duration
  - Intensity level (1-10 scale)
  - Notes/comments
- **FR-4.3:** Quick-add feature for common exercises
- **FR-4.4:** Edit or delete logged activities
- **FR-4.5:** View workout history (daily, weekly, monthly views)

### 3.5 Nutrition Tracking

- **FR-5.1:** Log meals and snacks with:
  - Food item name
  - Serving size
  - Estimated calories
  - Macro breakdown (protein, carbs, fats)
  - Time eaten
- **FR-5.2:** Search common foods database for quick entry
- **FR-5.3:** Create custom food entries
- **FR-5.4:** View daily and weekly nutrition summaries
- **FR-5.5:** Track nutritional goals (daily calorie target, macro targets)
- **FR-5.6:** Edit or delete logged meals

### 3.6 Progress Comparison & Analytics

- **FR-6.1:** Compare actual activities to AI-generated plan
- **FR-6.2:** Display adherence metrics:
  - % of planned workouts completed
  - % of planned exercises executed
  - Average workout duration vs. planned
  - Nutritional goals met (% of target)
- **FR-6.3:** Generate weekly progress report
- **FR-6.4:** Visual representations (charts, graphs) of:
  - Weekly activity volume
  - Exercise frequency
  - Calorie intake trends
  - Weight/body metrics over time (if user provides)
- **FR-6.5:** Achievement badges or milestones

### 3.7 Dashboard & Overview

- **FR-7.1:** Main dashboard displaying:
  - Today's planned workouts
  - Today's logged activities
  - Today's nutrition summary
  - Progress toward weekly goals
  - Quick-access activity logging
- **FR-7.2:** Responsive layout for mobile and desktop

---

## 4. Technical Requirements

### 4.1 Frontend (Astro + Svelte 5)

#### Pages

- Landing/Home page
- Authentication page (login/register)
- Survey page (initial assessment)
- Dashboard page
- Workouts page (history and logging)
- Nutrition page (tracking and logging)
- Plan details page
- Progress/Analytics page
- Profile settings page
- 404 Not Found page

#### Components

- **Svelte Interactive Islands:**
  - Workout form (add/edit activity)
  - Meal logging form (add/edit meal)
  - Survey form (multi-step)
  - Exercise search and quick-add component
  - Food search component
  - Progress charts and graphs
  - Activity history list with filters
  - Navigation menu with state management

- **Astro Static Components:**
  - Page layouts and headers
  - Navigation sidebar
  - Footer
  - Static information sections

#### Styling

- CSS modules for component-scoped styles
- Global CSS for shared styles and layout
- CSS custom properties for consistent colors, spacing, typography
- Mobile-first responsive design

### 4.2 Backend (Node.js + Express)

#### API Endpoints

**Authentication:**

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Token refresh
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation

**Users:**

- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile
- `DELETE /api/users/:userId` - Delete user account

**Survey & Plans:**

- `POST /api/surveys` - Submit initial survey
- `GET /api/surveys/:userId` - Get user's survey responses
- `PUT /api/surveys/:userId` - Update survey responses
- `POST /api/plans/generate` - Generate AI fitness plan
- `GET /api/plans/:userId` - Get user's current plan
- `PUT /api/plans/:userId` - Update plan preferences

**Workouts:**

- `POST /api/workouts` - Log a new workout
- `GET /api/workouts/:userId` - Get user's workouts (with filtering)
- `GET /api/workouts/:userId/:workoutId` - Get specific workout details
- `PUT /api/workouts/:userId/:workoutId` - Update workout
- `DELETE /api/workouts/:userId/:workoutId` - Delete workout

**Exercises:**

- `POST /api/exercises` - Log an exercise (within a workout)
- `GET /api/exercises/:userId` - Get exercise history
- `GET /api/exercises/common` - Get common exercise templates
- `PUT /api/exercises/:exerciseId` - Update exercise log
- `DELETE /api/exercises/:exerciseId` - Delete exercise log

**Nutrition:**

- `POST /api/meals` - Log a meal
- `GET /api/meals/:userId` - Get user's meals (with date filtering)
- `GET /api/meals/:userId/:mealId` - Get specific meal
- `PUT /api/meals/:userId/:mealId` - Update meal
- `DELETE /api/meals/:userId/:mealId` - Delete meal
- `GET /api/foods/search` - Search food database
- `POST /api/foods/custom` - Create custom food entry

**Analytics:**

- `GET /api/analytics/progress/:userId` - Get adherence metrics
- `GET /api/analytics/weekly-report/:userId` - Get weekly report
- `GET /api/analytics/streaks/:userId` - Get activity streaks

---

## 5. Data Model

### 5.1 Collections

#### Users

```JSON
{
  _id: ObjectId,
  email: string (unique),
  hashedPassword: string,
  firstName: string,
  lastName: string,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
```

#### Surveys

```JSON
{
  _id: ObjectId,
  userId: ObjectId (reference to Users),
  fitnessLevel: enum ['beginner', 'intermediate', 'advanced'],
  goal: string,
  availableTimePerWeek: number,
  equipmentAccess: enum ['home', 'gym', 'minimal'],
  dietaryRestrictions: string[],
  healthConditions: string[],
  age: number,
  experienceLevel: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Plans

```JSON
{
  _id: ObjectId,
  userId: ObjectId (reference to Users),
  surveyId: ObjectId (reference to Surveys),
  planContent: object,
  weeklySchedule: array,
  targetMetrics: object,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date
}
```

#### Workouts

```JSON
{
  _id: ObjectId,
  userId: ObjectId (reference to Users),
  date: Date,
  duration: number (minutes),
  workoutType: enum ['cardio', 'strength', 'flexibility', 'mixed'],
  exercises: ObjectId[] (references to Exercises),
  notes: string,
  plannedWorkoutId: ObjectId | null,
  createdAt: Date,
  updatedAt: Date
}
```

#### Exercises

```JSON
{
  _id: ObjectId,
  workoutId: ObjectId (reference to Workouts),
  userId: ObjectId (reference to Users),
  name: string,
  weight: number | null,
  sets: number,
  reps: number,
  duration: number | null (seconds),
  intensity: number (1-10),
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Meals

```JSON
{
  _id: ObjectId,
  userId: ObjectId (reference to Users),
  date: Date,
  time: string (HH:MM),
  foodItems: array [{
    foodId: string,
    name: string,
    servingSize: string,
    calories: number,
    protein: number (g),
    carbs: number (g),
    fats: number (g)
  }],
  totalCalories: number,
  totalProtein: number,
  totalCarbs: number,
  totalFats: number,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Foods (Common Database)

```JSON
{
  _id: ObjectId,
  name: string,
  servingSize: string,
  calories: number,
  protein: number,
  carbs: number,
  fats: number,
  category: string
}
```

---

## 6. User Stories

### Authentication

- **US-1.1:** As a new user, I want to register an account so I can start tracking my fitness
- **US-1.2:** As a registered user, I want to log in securely so I can access my personal data

### Survey & Planning

- **US-2.1:** As a new user, I want to complete a survey about my fitness level so an AI can create a personalized plan
- **US-2.2:** As a user, I want to view my personalized fitness plan so I know what exercises to do

### Activity Tracking

- **US-3.1:** As a user, I want to log my gym workouts so I can track my exercise history
- **US-3.2:** As a user, I want to quickly add exercises to my workout so I don't have to fill out long forms
- **US-3.3:** As a user, I want to view my workout history so I can see my progress over time

### Nutrition Tracking

- **US-4.1:** As a user, I want to log my meals so I can track my daily nutrition
- **US-4.2:** As a user, I want to search for foods in a database so I can quickly log common meals
- **US-4.3:** As a user, I want to see my daily calorie and macro totals so I know if I'm hitting my targets

### Analytics & Comparison

- **US-5.1:** As a user, I want to compare my actual workouts to my planned workouts so I can see my adherence
- **US-5.2:** As a user, I want to see visual reports of my progress so I can understand my fitness journey
- **US-5.3:** As a user, I want to receive achievement badges so I stay motivated

### Dashboard

- **US-6.1:** As a user, I want a dashboard that shows today's plan and my logged activities so I can quickly see my status

---

## 7. Non-Functional Requirements

### Performance

- **NFR-1.1:** Page load time < 2 seconds on 4G connection
- **NFR-1.2:** API response time < 500ms for 95th percentile
- **NFR-1.3:** Application should handle 1000+ concurrent users

### Security

- **NFR-2.1:** All passwords hashed using bcrypt or similar
- **NFR-2.2:** Authentication via JWT tokens
- **NFR-2.3:** HTTPS/TLS for all communication
- **NFR-2.4:** User data isolated and not accessible cross-user
- **NFR-2.5:** Input validation on all API endpoints

### Scalability

- **NFR-3.1:** Database indexed on frequently queried fields (userId, date, email)
- **NFR-3.2:** Backend stateless for horizontal scaling
- **NFR-3.3:** CDN for static assets

### Maintainability

- **NFR-4.1:** Code follows TypeScript best practices
- **NFR-4.2:** Consistent code style and naming conventions
- **NFR-4.3:** Clear separation of concerns (routes, controllers, services)
- **NFR-4.4:** Comprehensive error handling

### Usability

- **NFR-5.1:** Mobile-responsive design (works on phones, tablets, desktops)
- **NFR-5.2:** Clear and intuitive UI
- **NFR-5.3:** Accessibility compliance (WCAG 2.1 AA)

---

## 8. Success Metrics

- Users complete registration and survey within first session
- 80% of users log at least one workout within first week
- User retention rate > 50% at 30 days
- Average session duration > 5 minutes
- API uptime > 99%
- Zero critical security issues in penetration testing

---

## 9. Future Enhancements (Out of Scope)

- Social features (sharing workouts, friend comparisons)
- Wearable device integration (Fitbit, Apple Watch sync)
- Video tutorials for exercises
- Coaching or personal trainer features
- Mobile native apps (iOS/Android)
- Advanced ML recommendations
- Integration with nutrition APIs for real-time data
- Export reports (PDF, CSV)
