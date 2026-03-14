import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config/api";

export default function ExerciseSelector({
  workoutType,
  onSelectExercise,
  onBack,
}) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/exercises/${workoutType}`,
        );
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
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
