import React, { useEffect, useState, useMemo } from "react";

export default function ExerciseSelector({
  workoutType,
  onSelectExercise,
  onBack,
}) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const exerciseMap = useMemo(
    () => ({
      CHEST: [
        { name: "Flat Barbell Bench Press", emoji: "💪" },
        { name: "Incline Dumbbell Press", emoji: "💪" },
        { name: "Decline Dumbbell Press", emoji: "💪" },
        { name: "Cable Fly", emoji: "💪" },
      ],
      BACK: [
        { name: "Deadlift", emoji: "🛠" },
        { name: "Lat Pulldown", emoji: "🏹" },
        { name: "Seated Cable Row", emoji: "🧲" },
      ],
      SHOULDER: [
        { name: "Dumbbell Shoulder Press", emoji: "🦾" },
        { name: "Lateral Raise", emoji: "🦾" },
        { name: "Front Raise", emoji: "🦾" },
      ],
      BICEP: [
        { name: "Barbell Curl", emoji: "💪" },
        { name: "Hammer Curl", emoji: "🔨" },
        { name: "Preacher Curl", emoji: "🙏" },
      ],
      TRICEP: [
        { name: "Close Grip Bench Press", emoji: "💪" },
        { name: "Tricep Pushdown", emoji: "⬇️" },
        { name: "Overhead Tricep Extension", emoji: "🎯" },
      ],
      LEG: [
        { name: "Barbell Squat", emoji: "🦵" },
        { name: "Leg Press", emoji: "🦿" },
        { name: "Romanian Deadlift", emoji: "🦵" },
        { name: "Lunge", emoji: "🚶" },
      ],
      CORE_ABS: [
        { name: "Cable Crunch", emoji: "🔥" },
        { name: "Plank", emoji: "🧱" },
        { name: "Russian Twist", emoji: "🌀" },
      ],
      CARDIO: [
        { name: "Treadmill Running", emoji: "🏃" },
        { name: "Cycling", emoji: "🚴" },
        { name: "Rowing", emoji: "🚣" },
      ],
    }),
    [],
  );

  useEffect(() => {
    const list = exerciseMap[workoutType] || [];
    setExercises(list);
    setLoading(false);
  }, [workoutType]);

  const workoutTypeNames = {
    CHEST: "Chest",
    BACK: "Back",
    SHOULDER: "Shoulder",
    BICEP: "Bicep",
    TRICEP: "Tricep",
    LEG: "Leg",
    CORE_ABS: "Core / Abs",
    CARDIO: "Cardio",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f0c] flex items-center justify-center">
        <div className="text-[#8fbc8f] text-lg">Loading exercises...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0c] px-5 md:px-8 pt-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="text-[#8fbc8f] hover:text-[#a0ccb0] transition-colors"
          >
            ← Back
          </button>
        </div>

        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {workoutTypeNames[workoutType]} Exercises
        </h1>
        <p className="text-[#6b8b6b] text-sm md:text-base mb-6">
          Select an exercise to add
        </p>

        <div className="space-y-2">
          {exercises.map((exercise, index) => (
            <button
              key={index}
              onClick={() => onSelectExercise(exercise.name)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 flex items-center gap-3 hover:border-[#5a8a5a] transition-colors group"
            >
              <span className="text-xl">{exercise.emoji}</span>
              <span className="text-white text-sm md:text-base group-hover:text-[#8fbc8f] transition-colors">
                {exercise.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
