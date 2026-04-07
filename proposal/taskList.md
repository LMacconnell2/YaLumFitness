# Fitness Tracker - Sprint Task List

## Sprint 1: Foundation & Authentication (MVP Core)

### Backend Setup & Database

- [x] **Task 1.1** - Set up Node.js/Express project structure with TypeScript configuration (1.5h)
- [x] **Task 1.2** - Configure MongoDB connection and implement database utilities (1.5h)
- [ ] **Task 1.3** - Create User collection schema and models (1.5h)

### Authentication API

- [ ] **Task 1.4** - Implement user registration endpoint with better-auth (1.5h)
- [ ] **Task 1.5** - Implement user login endpoint with better-auth (1.5h)
- [ ] **Task 1.6** - Create authentication middleware for protected routes (1.5h)
- [ ] **Task 1.7** - Implement logout and token refresh endpoints (1.5h)

### Frontend Setup & Auth Pages

- [x] **Task 1.8** - Set up Astro project structure with Svelte 5 integration (1.5h)
- [x] **Task 1.9** - Create global CSS variables and base styling (1.5h)
- [x] **Task 1.10** - Build Registration page layout (Astro) with Svelte form component (1.5h)
- [x] **Task 1.11** - Build Login page layout (Astro) with Svelte form component (1.5h)
- [x] **Task 1.12** - Create Navigation component with authentication state management (1.5h)
- [x] **Task 1.13** - Build Landing/Home page with navigation (1.5h)

### Testing & Error Handling

- [ ] **Task 1.14** - Implement error handling middleware on backend (1.5h)
- [ ] **Task 1.15** - Implement Error handling on the fontend (1.5h)
- [ ] **Task 1.16** - Write unit tests for auth endpoints (1.5h) (Also use ThunderClient)

---

## Sprint 2: Survey, Plans & Activity Tracking

### Survey & Plan Generation

- [ ] **Task 2.1** - Create Survey collection schema and models (1.5h)
- [ ] **Task 2.2** - Implement survey submission endpoint (`POST /api/surveys`) (1.5h)
- [ ] **Task 2.3** - Implement survey retrieval endpoint (`GET /api/surveys/:userId`) (1.5h)
- [ ] **Task 2.4** - Create Fitness Plan collection schema and basic models (1.5h)
- [ ] **Task 2.5** - Implement fitness plan generation endpoint with mock AI logic (1.5h)
- [ ] **Task 2.6** - Implement fitness plan retrieval endpoint (`GET /api/plans/:userId`) (1.5h)

### Frontend Survey & Dashboard

- [x] **Task 2.7** - Create multi-step Survey form component (Svelte) (1.5h)
- [x] **Task 2.8** - Build Survey page layout (Astro) with form (1.5h)
- [ ] **Task 2.9** - Build Plan Details page showing generated plan (1.5h)
- [ ] **Task 2.10** - Create basic Dashboard page layout with today's summary (1.5h)

### Workout Tracking API

- [x] **Task 2.11** - Create Workout and Exercise collection schemas/models (1.5h)
- [x] **Task 2.12** - Implement workout logging endpoint (`POST /api/workouts`) (1.5h)
- [x] **Task 2.13** - Implement workout retrieval with filtering (`GET /api/workouts/:userId`) (1.5h)
- [x] **Task 2.14** - Implement exercise logging within workouts (`POST /api/exercises`) (1.5h)
- [x] **Task 2.15** - Implement workout update/delete endpoints (1.5h)

### Workout Tracking Frontend

- [x] **Task 2.16** - Create Workout logging form component (Svelte) (1.5h)
- [ ] **Task 2.17** - Build Workouts page with history list (1.5h)
- [ ] **Task 2.18** - Create exercise quick-add component (Svelte) (1.5h)

---

## Sprint 3: Nutrition, Analytics & Polish

### Nutrition Tracking API

- [x] **Task 3.1** - Create Meal and Food collection schemas/models (1.5h)
- [x] **Task 3.2** - Implement meal logging endpoint (`POST /api/meals`) (1.5h)
- [x] **Task 3.3** - Implement meal retrieval with date filtering (`GET /api/meals/:userId`) (1.5h)
- [x] **Task 3.4** - Implement meal update/delete endpoints (1.5h)
- [x] **Task 3.5** - Implement meal search functionality (1.5h)
- [x] **Task 3.6** - Implement food search endpoint (`GET /api/foods/search`) (1.5h)
- [x] **Task 3.7** - Implement custom food creation endpoint (1.5h)

### Nutrition Tracking Frontend

- [ ] **Task 3.8** - Create Meal logging form component (Svelte) (1.5h)
- [ ] **Task 3.9** - Create Meal search component with autocomplete (Svelte) (1.5h)
- [ ] **Task 3.10** - Build Nutrition page with daily/weekly summaries (1.5h)

### Analytics & Progress

- [ ] **Task 3.11** - Implement adherence metrics calculation service (1.5h)
- [ ] **Task 3.12** - Implement progress analytics endpoint (`GET /api/analytics/progress/:userId`) (1.5h)
- [ ] **Task 3.13** - Implement weekly report endpoint (`GET /api/analytics/weekly-report/:userId`) (1.5h)
- [ ] **Task 3.14** - Create progress chart components (Svelte) for visualization (1.5h)
- [ ] **Task 3.15** - Build Progress/Analytics page with charts and badges (1.5h)

### User Profile & Cleanup

- [ ] **Task 3.16** - Implement user profile endpoints (`GET/PUT /api/users/:userId`) (1.5h)
- [ ] **Task 3.17** - Build Profile Settings page (1.5h)
- [ ] **Task 3.18** - Create 404 error page (1.5h)
- [ ] **Task 3.19** - Implement password reset endpoints (1.5h)
- [ ] **Task 3.20** - Complete responsive design refinement and mobile optimizations (1.5h)
- [ ] **Task 3.21** - Write integration tests for complete user workflows (1.5h)
- [ ] **Task 3.22** - Deploy to staging and perform end-to-end testing (1.5h)

---

## Summary

- **Sprint 1:** 15 tasks (22.5 hours) - Authentication and foundational frontend/backend
- **Sprint 2:** 18 tasks (27 hours) - Survey, planning, and workout tracking
- **Sprint 3:** 22 tasks (33 hours) - Nutrition, analytics, and production polish

**Total:** 55 tasks across 3 sprints (~82.5 hours development time)