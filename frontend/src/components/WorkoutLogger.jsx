import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config/api";
import WorkoutTypeSelector from "./WorkoutTypeSelector";
import ExerciseSelector from "./ExerciseSelector";
import ExerciseDetailForm from "./ExerciseDetailForm";

export default function WorkoutLogger({ onClose, onWorkoutSaved }) {
  const [step, setStep] = useState("selectType"); // selectType, selectExercise, enterDetails, review
  const [workoutType, setWorkoutType] = useState(null);
  const [selectedExerciseName, setSelectedExerciseName] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [duration, setDuration] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSelectType = (type) => {
    setWorkoutType(type);
    setStep("review");
  };

  const handleAddExercise = () => {
    setStep("selectExercise");
  };

  const handleSelectExercise = (exerciseName) => {
    setSelectedExerciseName(exerciseName);
    setStep("enterDetails");
  };

  const handleSaveExercise = (exerciseData) => {
    setExercises([...exercises, exerciseData]);
    setSelectedExerciseName(null);
    setStep("review");
  };

  const handleDeleteExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveWorkout = async () => {
    if (exercises.length === 0) {
      alert("Please add at least one exercise");
      return;
    }

    setSaving(true);

    try {
      const workoutData = {
        workoutType,
        date: new Date().toISOString().split("T")[0],
        durationMinutes: duration ? parseInt(duration) : null,
        notes: null,
        exercises,
      };

      await axios.post(`${API_BASE}/api/workout-sessions`, workoutData);

      if (onWorkoutSaved) {
        onWorkoutSaved();
      }
      onClose();
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Failed to save workout. Please try again.");
    } finally {
      setSaving(false);
    }
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

  if (step === "selectType") {
    return (
      <WorkoutTypeSelector onSelectType={handleSelectType} onBack={onClose} />
    );
  }

  if (step === "selectExercise") {
    return (
      <ExerciseSelector
        workoutType={workoutType}
        onSelectExercise={handleSelectExercise}
        onBack={() => setStep("review")}
      />
    );
  }

  if (step === "enterDetails") {
    return (
      <ExerciseDetailForm
        exerciseName={selectedExerciseName}
        onSave={handleSaveExercise}
        onCancel={() => setStep("selectExercise")}
      />
    );
  }

  // Review step
  return (
    <div className="min-h-screen bg-[#0a0f0c] px-5 md:px-8 pt-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setStep("selectType")}
            className="text-[#8fbc8f] hover:text-[#a0ccb0] transition-colors"
          >
            ← Back
          </button>
        </div>

        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {workoutTypeNames[workoutType]}
        </h1>
        <p className="text-[#6b8b6b] text-sm md:text-base mb-6">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>

        <div className="mb-6">
          <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5a8a5a] transition-colors"
            placeholder="45"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold mb-3">Exercises</h2>

          {exercises.length === 0 ? (
            <div className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-8 text-center">
              <p className="text-[#6b8b6b] text-sm">No exercises added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        {exercise.exerciseName}
                      </h3>
                      <p className="text-[#6b8b6b] text-sm">
                        {exercise.sets} sets • {exercise.maxWeightKg.toFixed(1)}
                        kg • {exercise.averageReps} reps
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteExercise(index)}
                      className="text-red-400 hover:text-red-300 transition-colors ml-3"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleAddExercise}
            className="w-full mt-3 bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-[#8fbc8f] hover:border-[#5a8a5a] hover:text-[#a0ccb0] transition-colors"
          >
            + Add Exercise
          </button>
        </div>

        <button
          onClick={handleSaveWorkout}
          disabled={saving || exercises.length === 0}
          className="w-full bg-[#3a5a3a] hover:bg-[#4a6a4a] disabled:bg-[#2a3a2a] text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Workout"}
        </button>
      </div>
    </div>
  );
}
