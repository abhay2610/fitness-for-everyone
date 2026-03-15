import React from "react";
import AgentCard from "./AgentCard";
import ConsistencyGrid from "./ConsistencyGrid";
import GitaVerseCard from "./GitaVerseCard";

export default function HomeScreen({ onOpenChat }) {
  // Mock data — will be replaced with real API data
  const completedDays = [true, true, true, true, true, false, false];

  return (
    <div className="px-5 md:px-8 lg:px-12 pt-6 md:pt-24 pb-24 space-y-5 md:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Good morning,
          </h1>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
            Alex.
          </h1>
        </div>
        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#3a5a3a] flex items-center justify-center cursor-pointer hover:bg-[#4a6a4a] transition-colors">
          <span className="text-[#8fbc8f] font-bold text-lg md:text-xl">A</span>
        </div>
      </div>

      {/* Agent Card — full width on all screens */}
      <AgentCard onOpenChat={onOpenChat} />

      <div className="space-y-5 md:space-y-6">
        <ConsistencyGrid />
        <GitaVerseCard />
      </div>

      {/* Floating AI Button */}
      <button
        onClick={() => onOpenChat("")}
        className="fixed bottom-20 right-5 md:bottom-24 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#3a5a3a] flex items-center justify-center shadow-lg shadow-[#3a5a3a]/30 hover:bg-[#4a6a4a] transition-all hover:scale-105 z-40"
      >
        <div className="relative">
          <span className="text-[#8fbc8f] font-bold text-lg md:text-xl">A</span>
          <span className="absolute -top-1 -right-2 text-[#8fbc8f] text-[8px]">
            ✦
          </span>
        </div>
      </button>
    </div>
  );
}
