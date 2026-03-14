import React from 'react';

const workoutTypes = [
  { type: 'CHEST', name: 'Chest Day', emoji: '💪' },
  { type: 'BACK', name: 'Back Day', emoji: '🔙' },
  { type: 'SHOULDER', name: 'Shoulder Day', emoji: '🦾' },
  { type: 'BICEP', name: 'Bicep Day', emoji: '💪' },
  { type: 'TRICEP', name: 'Tricep Day', emoji: '💪' },
  { type: 'LEG', name: 'Leg Day', emoji: '🦵' },
  { type: 'CORE_ABS', name: 'Core / Abs', emoji: '🔥' },
  { type: 'CARDIO', name: 'Cardio', emoji: '🏃' },
];

export default function WorkoutTypeSelector({ onSelectType, onBack }) {
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
          Log Workout
        </h1>
        <p className="text-[#6b8b6b] text-sm md:text-base mb-6">
          Select your workout type
        </p>

        <div className="space-y-3">
          {workoutTypes.map((workout) => (
            <button
              key={workout.type}
              onClick={() => onSelectType(workout.type)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-5 py-4 flex items-center justify-between hover:border-[#5a8a5a] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{workout.emoji}</span>
                <span className="text-white font-medium group-hover:text-[#8fbc8f] transition-colors">
                  {workout.name}
                </span>
              </div>
              <span className="text-[#6b8b6b] group-hover:text-[#8fbc8f] transition-colors">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
