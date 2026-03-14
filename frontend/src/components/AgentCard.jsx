import React, { useState } from "react";

export default function AgentCard({ onOpenChat }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onOpenChat(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="bg-[#131a16] rounded-2xl p-5 md:p-6 lg:p-8">
      {/* Agent message */}
      <div className="mb-4 md:mb-5">
        <p className="text-[#c8d8c8] text-sm md:text-base leading-relaxed">
          Hello Alex.
        </p>
        <p className="text-[#c8d8c8] text-sm md:text-base leading-relaxed mt-2">
          You're doing great this week. Based on your progress, you're on track
          to achieve your weight loss goal.
        </p>
        <p className="text-white text-sm md:text-base font-medium mt-3">
          What did you train today?
        </p>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 md:gap-3"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tell Aura..."
            className="w-full bg-[#0d1210] border border-[#2a3a2a] rounded-full px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={() => onOpenChat(inputValue.trim())}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0d1210] border border-[#2a3a2a] flex items-center justify-center text-[#6b8b6b] hover:border-[#5a8a5a] transition-colors shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
      </form>
    </div>
  );
}
