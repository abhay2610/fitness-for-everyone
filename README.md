# Fitness for Everyone

A modern, accessible fitness app to help anyone build sustainable habits through workouts, nutrition tracking, and progress insights.

## Overview

Fitness for Everyone focuses on inclusive design, simple onboarding, and evidence-based guidance. The app supports personalized plans, flexible scheduling, and clear progress tracking. It is designed to work well on mobile and desktop, with offline-friendly features and seamless syncing.

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


