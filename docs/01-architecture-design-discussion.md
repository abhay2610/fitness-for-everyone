# Architecture & Design Discussion

**Date**: March 14, 2026
**Status**: Initial Planning Phase — No code written yet for new features

---

## 1. Product Vision

**Goal**: Build a personal AI fitness trainer app that replaces the need for a human trainer.

The agent should:
- Be a fitness expert — knows training, nutrition, recovery, form, programming deeply
- Be context-aware of the specific user — their stats, goals, workout history, health metrics
- Answer questions like a personal trainer would, tailored to the individual
- Eventually pull real health data from the phone (steps, heart rate, sleep) so the user doesn't have to manually enter everything

---

## 2. Core Features (Two Pillars)

### Pillar 1: Progress Tracker
- Log daily activities, meals, exercises
- Store user-specific data in a real database
- Later: auto-populate from phone health data (HealthKit / Google Fit)
- **Status**: Deferred — will build after the agent

### Pillar 2: LLM Agent (Primary Focus)
- Python-based fitness expert chatbot
- Uses chain-of-thought prompting (not complex tool-calling)
- Injects user context from the database into the system prompt
- Simple chat API endpoint via FastAPI
- **Status**: Building next

---

## 3. Architecture Decisions

### 3.1 Overall Architecture

```
Mobile/Web App (React + Vite)
        ↓ HTTP
Spring Boot (Java) — CRUD operations, port 7070
        ↓ proxy (forwards /api/chat/* to Python)
FastAPI (Python) — LLM Agent service
        ↓ reads user context
PostgreSQL — User data, workouts, meals, progress, chat history
```

**Why two backends?**
- Spring Boot (existing) handles structured CRUD well
- Python is the natural ecosystem for LLM/AI work
- Spring Boot proxies chat requests to FastAPI — frontend only knows one backend URL

### 3.2 Database

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| **Type** | PostgreSQL (relational) | Data has clear relationships (user → workouts, user → progress). Structured schemas, foreign keys. |
| **Migration from** | H2 in-memory | H2 loses data on restart. Not suitable for real use. |
| **Hosting** | Free tier (Neon / Supabase / Railway) | Zero cost constraint |

**Why not MongoDB?**
Fitness data has clear relational structure (users, workouts, meals, progress entries linked by user ID). No advantage from NoSQL here.

### 3.3 LLM Provider

| Option | Pros | Cons |
|--------|------|------|
| **Groq (free tier)** | Very fast, supports LLaMA 3 / Mixtral | Rate limits (~30 req/min). Risky at scale. |
| **Ollama (local)** | Zero cost, no rate limits, full privacy | Tied to local machine. Can't deploy publicly. |
| **HuggingFace Inference** | Free tier available | Slow, queue-based, unreliable for real-time chat |

**Decision**: TBD — to be finalized before building the agent.

### 3.4 Agent Approach

- **Chain-of-thought prompting** — no complex tool-calling or multi-agent orchestration
- System prompt makes the LLM a fitness expert
- User context (profile, recent workouts, health data) is injected into the prompt
- Conversation history: keep last 5-10 messages in context
- For long history: summarize rather than dump raw data (context window limits)

### 3.5 Frontend & Mobile Strategy

| Phase | Approach | Why |
|-------|----------|-----|
| **Now** | React + Vite web app | Focus on features, not platform concerns |
| **Soon** | Add PWA support (manifest.json + service worker) | Installable on phones via "Add to Home Screen". ~30 min of work. |
| **Later** | Wrap with Capacitor | Real native app (.apk / .ipa). Access to HealthKit, Google Fit, push notifications. |
| **If it explodes** | React Native rewrite | Only if Capacitor performance is insufficient |

**Why this order?**
- Zero throwaway work — each step builds on the previous
- Backend stays exactly the same regardless of frontend platform
- Capacitor conversion is ~15 minutes for basic working app, ~1-2 days to polish with native features

**PWA Capabilities (sufficient for initial launch):**
- Auth tokens, user sessions ✅
- Offline data cache ✅
- Full-screen app appearance ✅
- Push notifications on Android ✅
- Push notifications on iOS ⚠️ (added iOS 16.4, but unreliable)

**PWA Limitations (why Capacitor is needed later):**
- No HealthKit / Google Fit access ❌
- No background activity tracking ❌
- No App Store presence ❌
- Storage can be cleared by OS ❌

---

## 4. Hard Constraints

- **NO paid resources.** Everything must be free during development.
- LLM provider, database hosting, APIs — all free tier.
- HealthKit & Google Fit APIs are free (just need native app).
- Apple Developer ($99/year) and Google Play ($25 one-time) — deferred until ready to publish.

---

## 5. Cost Analysis

| Resource | Cost | When Needed |
|----------|------|-------------|
| LLM (Groq / Ollama / HuggingFace) | Free | Phase 2 (Agent) |
| PostgreSQL hosting (Neon / Supabase) | Free tier | Phase 1 (Foundation) |
| HealthKit API | Free | Phase 4 (Mobile) |
| Google Fit / Health Connect API | Free | Phase 4 (Mobile) |
| Apple Developer Account | $99/year | When publishing to App Store |
| Google Play Developer | $25 one-time | When publishing to Play Store |
| Capacitor | Free (open source) | Phase 4 (Mobile) |
| Netlify / Vercel (frontend hosting) | Free tier | Already configured |

---

## 6. Phased Build Plan

### Phase 1 — Foundation
- Replace H2 with PostgreSQL
- Migrate existing workout/progress CRUD
- Set up Python FastAPI service alongside Spring Boot
- Design database schema (users, workouts, meals, progress, health metrics, chat history)

### Phase 2 — Agent (Main Focus)
- Build LLM-powered fitness expert via FastAPI
- System prompt engineering
- Inject user context from DB into prompts
- Simple chat API endpoint
- Chat UI on frontend

### Phase 3 — Auth & User Profiles
- User registration / login
- User profiles (age, weight, goals, fitness level)
- Link all data to specific users

### Phase 4 — Mobile & Health Integration
- Wrap React app with Capacitor
- Add HealthKit (iOS) and Google Fit (Android) plugins
- Background health data sync
- Push notifications
- App Store / Play Store publishing

### Phase 5 — Polish & Scale
- Conversation memory / history
- Better progress tracking (meals, macros)
- Caching common Q&A for agent performance
- Rate limiting per user

---

## 7. Scalability Considerations (Discussed, Not Priority)

| Layer | Bottleneck | Mitigation |
|-------|-----------|------------|
| Frontend | Static files — scales trivially | CDN (Netlify/Vercel already does this) |
| Java backend (CRUD) | Lightweight — not a concern | Horizontal scaling (multiple instances) |
| Python agent (LLM) | **#1 bottleneck** — every chat = LLM API call | Cache common Q&A, rate-limit per user, smaller model for simple questions |
| Database | Connection limits, query performance | Connection pooling, read replicas, proper indexing |
| Context window | User with months of data can't fit in prompt | Summarize data before injection, vector DB for semantic retrieval (ChromaDB) |

---

## 8. Distribution Strategy

| Platform | Method | Cost |
|----------|--------|------|
| Web (any device) | Share a URL | Free |
| Android | Share `.apk` file directly (sideload) | Free |
| Android (official) | Google Play Store | $25 one-time |
| iOS | TestFlight (beta) or App Store | $99/year |

**Initial distribution**: Web URL + Android APK sideloading — both free.

---

## 9. Key Takeaways

1. **Build the brain first** (agent), then the body (native app).
2. **Backend architecture is platform-agnostic** — works for web, PWA, Capacitor, and React Native.
3. **PWA is a great interim step** — installable on phones with zero extra work, but cannot access health data.
4. **Capacitor is the bridge to native** — 15 min for basic conversion, 1-2 days for native features. Not a rewrite.
5. **LLM cost/capacity is the hardest scaling problem** — everything else is standard web app scaling.
6. **Database schema should be designed for the future** — include health metrics columns from day one, even if populated manually at first.
