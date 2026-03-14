import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../config/api";
import WorkoutLogger from "./WorkoutLogger";

export default function ActivityScreen() {
  const [showLogger, setShowLogger] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/workout-sessions`);
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleWorkoutSaved = () => {
    fetchWorkouts();
  };

  const workoutTypeNames = {
    CHEST: "Chest Day",
    BACK: "Back Day",
    SHOULDER: "Shoulder Day",
    BICEP: "Bicep Day",
    TRICEP: "Tricep Day",
    LEG: "Leg Day",
    CORE_ABS: "Core / Abs",
    CARDIO: "Cardio",
  };

  const workoutEmojis = {
    CHEST: "💪",
    BACK: "🔙",
    SHOULDER: "🦾",
    BICEP: "💪",
    TRICEP: "💪",
    LEG: "🦵",
    CORE_ABS: "🔥",
    CARDIO: "🏃",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (showLogger) {
    return (
      <WorkoutLogger
        onClose={() => setShowLogger(false)}
        onWorkoutSaved={handleWorkoutSaved}
      />
    );
  }

  return (
    <div className="px-5 md:px-8 lg:px-12 pt-6 md:pt-24 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
          Activity
        </h1>

        <button
          onClick={() => setShowLogger(true)}
          className="w-full mb-6 bg-[#3a5a3a] hover:bg-[#4a6a4a] text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          <span>Log Workout</span>
        </button>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-[#6b8b6b]">Loading workouts...</div>
          </div>
        ) : workouts.length === 0 ? (
          <div className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-6 py-12 text-center">
            <p className="text-[#6b8b6b] mb-2">No workouts logged yet</p>
            <p className="text-[#6b8b6b] text-sm">
              Tap "Log Workout" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-white text-lg font-semibold mb-3">
              Recent Workouts
            </h2>
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-5 py-4 hover:border-[#3a4a3a] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {workoutEmojis[workout.workoutType]}
                    </span>
                    <div>
                      <h3 className="text-white font-medium">
                        {workoutTypeNames[workout.workoutType]}
                      </h3>
                      <p className="text-[#6b8b6b] text-sm">
                        {formatDate(workout.date)}
                      </p>
                    </div>
                  </div>
                  {workout.durationMinutes && (
                    <span className="text-[#6b8b6b] text-sm">
                      {workout.durationMinutes} min
                    </span>
                  )}
                </div>
                {workout.exercises && workout.exercises.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#2a3a2a]">
                    <p className="text-[#6b8b6b] text-sm mb-2">
                      {workout.exercises.length} exercise
                      {workout.exercises.length !== 1 ? "s" : ""}
                    </p>
                    <div className="space-y-1">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <p key={index} className="text-[#8fbc8f] text-sm">
                          • {exercise.exerciseName}
                        </p>
                      ))}
                      {workout.exercises.length > 3 && (
                        <p className="text-[#6b8b6b] text-sm">
                          + {workout.exercises.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
