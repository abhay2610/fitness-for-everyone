# Fitness for Everyone

A modern, accessible fitness app to help anyone build sustainable habits through workouts, nutrition tracking, and progress insights.

## Overview

Fitness for Everyone focuses on inclusive design, simple onboarding, and evidence-based guidance. The app supports personalized plans, flexible scheduling, and clear progress tracking. It is designed to work well on mobile and desktop, with offline-friendly features and seamless syncing.

## High-Level Design (HLD)

### Architecture Overview

The application follows a **3-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │   React Frontend (Vite)                            │    │
│  │   - Responsive UI (Mobile & Web)                   │    │
│  │   - State Management (React Hooks)                 │    │
│  │   - HTTP Client (Axios)                            │    │
│  │   Port: 5173                                       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │   Spring Boot Backend (Java 17)                    │    │
│  │   ┌──────────────┐  ┌──────────────┐              │    │
│  │   │ Controllers  │  │   Services   │              │    │
│  │   │ - REST APIs  │→ │ - Business   │              │    │
│  │   │ - CORS       │  │   Logic      │              │    │
│  │   └──────────────┘  └──────────────┘              │    │
│  │   Port: 8080                                       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ JPA/Hibernate
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │   H2 In-Memory Database                            │    │
│  │   - JPA Entities                                   │    │
│  │   - Spring Data Repositories                       │    │
│  │   - Auto DDL (create-drop)                         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Component Design

#### Frontend Components

```
App.jsx (Root Component)
├── Header
│   ├── Title
│   └── Description
├── TabNavigation
│   ├── Workouts Tab
│   └── Progress Tab
└── Content Area
    ├── Workout Module
    │   ├── WorkoutForm
    │   │   ├── Name Input
    │   │   ├── Type Select (Cardio/Strength/Yoga/HIIT)
    │   │   ├── Duration Input
    │   │   └── Calories Input
    │   └── WorkoutList
    │       └── WorkoutCard (with Delete)
    └── Progress Module
        ├── ProgressForm
        │   ├── Weight Input
        │   └── Notes Textarea
        └── ProgressList
            └── ProgressCard (with Delete)
```

#### Backend Components

```
Spring Boot Application
├── Controllers (REST Layer)
│   ├── WorkoutController
│   │   ├── GET /api/workouts
│   │   ├── GET /api/workouts/{id}
│   │   ├── POST /api/workouts
│   │   └── DELETE /api/workouts/{id}
│   └── ProgressController
│       ├── GET /api/progress
│       ├── GET /api/progress/{id}
│       ├── POST /api/progress
│       └── DELETE /api/progress/{id}
├── Services (Business Logic)
│   ├── WorkoutService
│   │   ├── getAllWorkouts()
│   │   ├── getWorkoutById()
│   │   ├── createWorkout()
│   │   └── deleteWorkout()
│   └── ProgressService
│       ├── getAllProgress()
│       ├── getProgressById()
│       ├── createProgress()
│       └── deleteProgress()
├── Repositories (Data Access)
│   ├── WorkoutRepository (JpaRepository)
│   └── ProgressRepository (JpaRepository)
└── Models (Entities)
    ├── Workout
    │   ├── id (Long)
    │   ├── name (String)
    │   ├── durationMinutes (Integer)
    │   ├── type (String)
    │   ├── caloriesBurned (Integer)
    │   └── date (LocalDate)
    └── Progress
        ├── id (Long)
        ├── weight (Double)
        ├── notes (String)
        └── date (LocalDate)
```

### Data Flow

#### Workout Creation Flow

```
1. User fills workout form in React UI
2. User clicks "Add Workout" button
3. Frontend validates form data
4. Axios sends POST request to /api/workouts
5. WorkoutController receives request
6. WorkoutService processes business logic
7. WorkoutRepository saves to H2 database
8. Response sent back to frontend
9. UI updates with new workout in list
```

#### Progress Tracking Flow

```
1. User enters weight and notes
2. User clicks "Log Progress" button
3. Frontend validates form data
4. Axios sends POST request to /api/progress
5. ProgressController receives request
6. ProgressService processes business logic
7. ProgressRepository saves to H2 database
8. Response sent back to frontend
9. UI updates with new progress entry
```

### Database Schema

#### Workouts Table

```sql
CREATE TABLE workouts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    calories_burned INTEGER,
    date DATE NOT NULL
);
```

#### Progress Table

```sql
CREATE TABLE progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    weight DOUBLE NOT NULL,
    notes TEXT,
    date DATE NOT NULL
);
```

### API Endpoints

#### Workout APIs

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/workouts` | Get all workouts | - | `Workout[]` |
| GET | `/api/workouts/{id}` | Get workout by ID | - | `Workout` |
| POST | `/api/workouts` | Create new workout | `Workout` | `Workout` |
| DELETE | `/api/workouts/{id}` | Delete workout | - | `204 No Content` |

#### Progress APIs

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/progress` | Get all progress entries | - | `Progress[]` |
| GET | `/api/progress/{id}` | Get progress by ID | - | `Progress` |
| POST | `/api/progress` | Create new progress entry | `Progress` | `Progress` |
| DELETE | `/api/progress/{id}` | Delete progress entry | - | `204 No Content` |

### Technology Stack Details

#### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.8
- **HTTP Client**: Axios 1.6.0
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks (useState, useEffect)

#### Backend
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 17
- **Build Tool**: Maven 3.x
- **ORM**: Hibernate (JPA)
- **Database**: H2 (in-memory)
- **Dependencies**:
  - spring-boot-starter-web
  - spring-boot-starter-data-jpa
  - lombok (for boilerplate reduction)
  - h2database

### Security Considerations

- **CORS**: Configured to allow requests from `localhost:5173` and `localhost:3000`
- **Input Validation**: Required fields enforced on both frontend and backend
- **Data Persistence**: In-memory database (resets on restart)
- **Future Enhancements**:
  - Add authentication/authorization
  - Implement user sessions
  - Add input sanitization
  - Use persistent database (MySQL/PostgreSQL)

### Scalability & Future Enhancements

1. **Database Migration**: Move from H2 to PostgreSQL/MySQL for persistence
2. **User Management**: Add user authentication and multi-user support
3. **Advanced Analytics**: Add charts and graphs for progress visualization
4. **Mobile App**: Create native mobile apps (React Native)
5. **Cloud Deployment**: Deploy to AWS/Azure/GCP
6. **Caching**: Implement Redis for performance
7. **File Upload**: Add profile pictures and workout images
8. **Social Features**: Share workouts with friends

## Key Features

- Accessible UX compliant with WCAG 2.1 AA
- Guided workouts with progressions and modifications
- Habit tracking (workouts, steps, hydration, sleep)
- Nutrition logging with macro goals and templates
- Smart plans that adapt to time and equipment
- Progress analytics (PRs, streaks, body metrics)
- Reminders and calendar integration
- Offline-first with background sync

## Tech Stack

- App: Pending (e.g., React Native/Next.js/Flutter)  
- API: Pending (e.g., Node/Express/NestJS/Rails/Django)  
- DB: Pending (e.g., Postgres + Prisma/TypeORM)  
- Auth: Pending (e.g., OAuth + JWT/Session)  
- Infra: Pending (e.g., Vercel/Netlify/Render + S3/Cloud Storage)

Update this section once the implementation choices are finalized.

## Getting Started

1. Prerequisites
   - Node.js 18+ (or your chosen runtime)
   - Package manager (npm, pnpm, or yarn)
   - Java 17+
   - Maven 3.9+
   - Postgres (if applicable) or Docker

2. Clone

```bash
git clone <repo-url>
cd fitness-for-everyone
```

3. Install dependencies (example using npm)

```bash
npm install
```

4. Environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Populate with values such as:

```
# App
APP_NAME="Fitness for Everyone"
APP_URL=http://localhost:3000
NODE_ENV=development

# Auth
AUTH_SECRET=replace-with-strong-secret
OAUTH_GOOGLE_CLIENT_ID=
OAUTH_GOOGLE_CLIENT_SECRET=

# Database
DATABASE_URL=postgres://user:password@localhost:5432/fitness_for_everyone

# Storage/CDN (optional)
STORAGE_BUCKET=
STORAGE_REGION=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
```

5. Database (optional)

```bash
# Start Postgres via Docker (example)
docker compose up -d db

# Run migrations (example)
npx prisma migrate dev
```

6. Run the app

Backend (Java):
```bash
cd backend
mvn spring-boot:run
```

Frontend (React + Vite):
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` (frontend). The frontend calls the backend on `http://localhost:8080`.

## Common Scripts

- `npm run dev`: Start local development server
- `npm run build`: Production build
- `npm run start`: Start production server
- `npm run lint`: Lint codebase
- `npm test`: Run tests

Adjust to match your chosen toolchain.

## Project Structure (proposed)

```
fitness-for-everyone/
  ├─ backend/            # Spring Boot app
  │   ├─ src/main/java/com/ffe/...
  │   ├─ src/main/resources/application.properties
  │   └─ pom.xml
  ├─ frontend/           # React + Vite app
  │   ├─ src/App.jsx
  │   ├─ src/main.jsx
  │   ├─ index.html
  │   └─ package.json
  ├─ app/                # Frontend app (pages/routes, UI, hooks)
  ├─ api/                # Backend (routes, services, models)
  ├─ prisma/             # Schema and migrations (if using Prisma)
  ├─ scripts/            # Automation and utilities
  ├─ tests/              # Unit/integration/e2e tests
  ├─ public/             # Static assets
  ├─ .env.example        # Example env vars
  └─ README.md           # This file
```

Update as the codebase evolves.

## Roadmap

- MVP
  - Auth, profile, onboarding
  - Workout library and basic planner
  - Habit tracking and streaks
  - Core analytics and progress screens
- v1.1–v1.3
  - Social sharing, coach mode, teams
  - Wearable integrations (Apple Health, Google Fit)
  - Enhanced nutrition and recipe builder
- v2.0
  - Programs marketplace and coaching tools
  - Advanced insights and recommendations

## Accessibility

- Color contrast targets: AA
- Keyboard navigation: full coverage
- Screen reader labels and landmarks
- Motion-reduced animations

## Security & Privacy

- Store only necessary personal data
- Hash passwords and rotate secrets
- Role-based access control
- GDPR/CCPA-friendly data export & deletion flows

## API (placeholder)

- Workouts: `GET /api/workouts` (list sample workouts)
- Workouts: `POST /api/workouts` (append a workout in-memory)
- Auth: `POST /api/auth/*` (future)
- Users: `GET/PUT /api/users/:id` (future)
- Logs: `GET/POST /api/logs` (future)
- Analytics: `GET /api/analytics/*` (future)

Document specifics once endpoints are implemented.

## Contributing

1. Fork and create a feature branch
2. Add or update tests
3. Ensure lint/test/build all pass
4. Open a PR with a clear description and screenshots if UI changes

Please follow conventional commits if possible.

## License

MIT © Contributors of Fitness for Everyone


