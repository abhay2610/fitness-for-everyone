import React from "react";

export default function DailyActivity({
  steps = 12450,
  stepsGoal = 10000,
  workoutsDone = 4,
  workoutsGoal = 5,
  calories = 2180,
}) {
  const stepsPercent = Math.min((steps / stepsGoal) * 100, 100);
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (stepsPercent / 100) * circumference;

  return (
    <div className="bg-[#131a16] rounded-2xl p-5 md:p-6">
      <h3 className="text-white font-semibold text-base md:text-lg mb-4">
        Daily Activity
      </h3>
      <div className="flex flex-wrap justify-between items-center gap-4 md:gap-6">
        {/* Steps */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#1a2a1a"
                strokeWidth="3"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#5a8a5a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
          </div>
          <div>
            <p className="text-[#6b8b6b] text-xs font-medium">Steps</p>
            <p className="text-white text-sm font-semibold">
              {steps.toLocaleString()}{" "}
              <span className="text-[#4a5a4a] font-normal">
                / {stepsGoal / 1000}k
              </span>
            </p>
          </div>
        </div>

        {/* Workouts */}
        <div className="flex flex-col items-center">
          <p className="text-[#6b8b6b] text-xs font-medium mb-1">
            Workouts: {workoutsDone}/{workoutsGoal}
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: workoutsGoal }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < workoutsDone ? "bg-[#5a8a5a]" : "bg-[#1a2a1a]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Calories */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5a8a5a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <div>
            <p className="text-[#6b8b6b] text-xs font-medium">Calories</p>
            <p className="text-white text-sm font-semibold">
              {calories.toLocaleString()}{" "}
              <span className="text-[#4a5a4a] font-normal">kcal</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
