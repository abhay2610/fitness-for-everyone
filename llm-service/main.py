import os
from typing import Optional, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

load_dotenv()

app = FastAPI(title="Fitness LLM Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Groq client ──────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "llama-3.1-8b-instant")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY env var is required. Get one free at https://console.groq.com/keys")

client = Groq(api_key=GROQ_API_KEY)


# ── Request / Response schemas ───────────────────────────────
class UserProfile(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    heightCm: Optional[float] = None
    weightKg: Optional[float] = None
    sex: Optional[str] = None
    bmi: Optional[float] = None
    bmr: Optional[float] = None


class WorkoutSummary(BaseModel):
    workoutType: Optional[str] = None
    date: Optional[str] = None
    durationMinutes: Optional[int] = None
    notes: Optional[str] = None


class ChatRequest(BaseModel):
    message: str
    lang: Optional[str] = "en"
    profile: Optional[UserProfile] = None
    recentWorkouts: Optional[List[WorkoutSummary]] = None


class ChatResponse(BaseModel):
    reply: str


# ── System prompt builder ────────────────────────────────────
def build_system_prompt(profile: Optional[UserProfile], workouts: Optional[List[WorkoutSummary]], lang: str) -> str:
    lang_instruction = "Respond in Hindi (Devanagari script)." if lang == "hi" else "Respond in English."

    profile_block = "No profile available."
    if profile:
        parts = []
        if profile.name:
            parts.append(f"Name: {profile.name}")
        if profile.age:
            parts.append(f"Age: {profile.age}")
        if profile.sex:
            parts.append(f"Sex: {profile.sex}")
        if profile.heightCm:
            parts.append(f"Height: {profile.heightCm} cm")
        if profile.weightKg:
            parts.append(f"Weight: {profile.weightKg} kg")
        if profile.bmi is not None:
            parts.append(f"BMI: {profile.bmi:.1f}")
        if profile.bmr is not None:
            parts.append(f"BMR: {profile.bmr:.0f} kcal/day")
        if parts:
            profile_block = "User profile: " + ", ".join(parts)

    workout_block = "No recent workouts logged."
    if workouts and len(workouts) > 0:
        lines = []
        for w in workouts[:5]:
            line = f"- {w.workoutType or 'Unknown'} on {w.date or '?'}"
            if w.durationMinutes:
                line += f" ({w.durationMinutes} min)"
            if w.notes:
                line += f" — {w.notes}"
            lines.append(line)
        workout_block = "Recent workouts:\n" + "\n".join(lines)

    return f"""You are Aura, a friendly and knowledgeable personal fitness coach.
{lang_instruction}

{profile_block}

{workout_block}

Rules:
- Keep answers concise (max 3-4 short bullet points unless the user asks for detail).
- Be encouraging but honest.
- If the user asks about their stats (BMI, BMR, weight), use the profile data above.
- If the user asks for a workout plan, tailor it to their profile and recent activity.
- If the user asks about nutrition, give practical calorie/macro guidance based on their BMR and goals.
- Never give medical diagnoses. If something sounds medical, suggest consulting a doctor.
- If profile data is missing, politely ask the user to update their profile in Settings.
"""


# ── Chat endpoint ────────────────────────────────────────────
@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        system_prompt = build_system_prompt(req.profile, req.recentWorkouts, req.lang or "en")

        completion = client.chat.completions.create(
            model=LLM_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": req.message},
            ],
            temperature=0.7,
            max_tokens=512,
        )

        reply = completion.choices[0].message.content.strip()
        return ChatResponse(reply=reply)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")


# ── Health check ─────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "UP", "model": LLM_MODEL}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
