import React from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function WeeklyConsistency({
  completedDays = [true, true, true, true, false, false, false],
}) {
  return (
    <div className="bg-[#131a16] rounded-2xl p-5 md:p-6">
      <h3 className="text-white font-semibold text-base md:text-lg mb-4">
        Weekly Consistency
      </h3>
      <div className="flex justify-between items-center gap-2 md:gap-3">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                completedDays[index]
                  ? "bg-[#3a5a3a] border-[#5a8a5a] text-[#8fbc8f]"
                  : "bg-transparent border-[#2a3a2a] text-[#3a4a3a]"
              }`}
            >
              {completedDays[index] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span
              className={`text-xs md:text-sm font-medium ${
                completedDays[index] ? "text-[#8fbc8f]" : "text-[#4a5a4a]"
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
