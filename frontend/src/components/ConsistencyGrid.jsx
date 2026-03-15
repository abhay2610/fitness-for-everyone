import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_BASE from "../config/api";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function ConsistencyGrid() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_BASE}/api/workout-sessions`)
      .then((res) => {
        if (!mounted) return;
        setWorkouts(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading workouts", err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const workoutDateSet = useMemo(() => {
    const set = new Set();
    workouts.forEach((w) => {
      if (w.date) set.add(w.date);
    });
    return set;
  }, [workouts]);

  const { days, todayKey } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, 0, 1); // Jan 1
    const end = new Date(year, 11, 31); // Dec 31
    const arr = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = formatDate(d);
      arr.push({ key, hasWorkout: workoutDateSet.has(key) });
    }
    return { days: arr, todayKey: formatDate(now) };
  }, [workoutDateSet]);

  const streak = useMemo(() => {
    let count = 0;
    const now = new Date();
    for (let i = 0; i < 400; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = formatDate(d);
      if (workoutDateSet.has(key)) count++;
      else break;
    }
    return count;
  }, [workoutDateSet]);

  const last7 = useMemo(() => {
    const last = days.slice(-7);
    return last.filter((d) => d.hasWorkout).length;
  }, [days]);

  return (
    <div className="bg-[#131a16] rounded-2xl p-5 md:p-6 border border-[#1f2a23]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-white font-semibold text-base md:text-lg">
            Consistency
          </h3>
          <p className="text-[#6b8b6b] text-xs md:text-sm">
            {new Date().getFullYear()} · Streak: {streak} · 7d: {last7}
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[#8fbc8f] text-xs border border-[#2a3a2a] rounded-full px-3 py-1 hover:border-[#5a8a5a] transition-colors"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>

      {loading ? (
        <div className="text-[#6b8b6b] text-sm">Loading consistency...</div>
      ) : open ? (
        <div className="space-y-3">
          <div className="grid grid-cols-14 sm:grid-cols-16 gap-1">
            {days.map((day, idx) => (
              <div
                key={day.key}
                className={`h-2.5 w-2.5 rounded-full mx-auto transition-colors duration-200 ${
                  day.hasWorkout
                    ? "bg-gradient-to-br from-[#48c78e] to-[#2f9c6b] shadow-[0_0_0_1px_#2f9c6b80]"
                    : "bg-[#1f2a23]"
                } ${day.key === todayKey ? "ring-2 ring-[#6b8b6b]" : ""}`}
                title={day.key}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#6b8b6b]">
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#48c78e] to-[#2f9c6b]" />
              <span>Workout day</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-[#1f2a23]" />
              <span>Rest day</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[#6b8b6b] text-sm">Collapsed</div>
      )}
    </div>
  );
}
