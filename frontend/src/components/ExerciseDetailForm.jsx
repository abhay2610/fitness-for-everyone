import React, { useState } from "react";

export default function ExerciseDetailForm({ exerciseName, onSave, onCancel }) {
  const [sets, setSets] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState("kg");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sets || !weight || !reps) {
      alert("Please fill in all fields");
      return;
    }

    const exerciseData = {
      exerciseName,
      sets: parseInt(sets),
      maxWeightKg:
        unit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592,
      averageReps: parseInt(reps),
    };

    onSave(exerciseData);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0c] px-5 md:px-8 pt-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onCancel}
            className="text-[#8fbc8f] hover:text-[#a0ccb0] transition-colors"
          >
            ← Back
          </button>
        </div>

        <h1 className="text-white text-xl md:text-2xl font-bold mb-6">
          {exerciseName}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Sets
            </label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="1"
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Max Weight
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
                step="0.5"
                className="flex-1 bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#5a8a5a] transition-colors"
                placeholder="60"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5a8a5a] transition-colors"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Average Reps
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="10"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3a5a3a] hover:bg-[#4a6a4a] text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
}
