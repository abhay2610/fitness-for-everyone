import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import API_BASE from "../config/api";
import WorkoutLogger from "./WorkoutLogger";

export default function ActivityScreen() {
  const [showLogger, setShowLogger] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [collapsedMonths, setCollapsedMonths] = useState({});
  const [useDemoData, setUseDemoData] = useState(false);
  const sentinelRef = useRef(null);

  const demoWorkouts = useMemo(
    () => [
      {
        id: "demo-1",
        workoutType: "CHEST",
        date: new Date().toISOString().split("T")[0],
        durationMinutes: 45,
        exercises: [
          { exerciseName: "Flat Barbell Bench Press" },
          { exerciseName: "Incline Dumbbell Press" },
          { exerciseName: "Cable Fly" },
        ],
      },
      {
        id: "demo-2",
        workoutType: "BACK",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 50,
        exercises: [
          { exerciseName: "Deadlift" },
          { exerciseName: "Lat Pulldown" },
        ],
      },
      {
        id: "demo-3",
        workoutType: "LEG",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 55,
        exercises: [
          { exerciseName: "Barbell Squat" },
          { exerciseName: "Leg Press" },
        ],
      },
      {
        id: "demo-4",
        workoutType: "SHOULDER",
        date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 40,
        exercises: [
          { exerciseName: "Dumbbell Shoulder Press" },
          { exerciseName: "Lateral Raise" },
        ],
      },
      {
        id: "demo-5",
        workoutType: "BICEP",
        date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 35,
        exercises: [
          { exerciseName: "Barbell Curl" },
          { exerciseName: "Hammer Curl" },
        ],
      },
      {
        id: "demo-6",
        workoutType: "TRICEP",
        date: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 35,
        exercises: [
          { exerciseName: "Close Grip Bench Press" },
          { exerciseName: "Tricep Pushdown" },
        ],
      },
      {
        id: "demo-7",
        workoutType: "CORE_ABS",
        date: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 25,
        exercises: [
          { exerciseName: "Cable Crunch" },
          { exerciseName: "Plank" },
        ],
      },
      {
        id: "demo-8",
        workoutType: "CARDIO",
        date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        durationMinutes: 30,
        exercises: [{ exerciseName: "Treadmill Running" }],
      },
    ],
    [],
  );

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/workout-sessions`);
      setWorkouts(response.data);
      if (!response.data || response.data.length === 0) {
        setUseDemoData(true);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setWorkouts([]);
      setUseDemoData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prev) => prev + 8);
          }
        });
      },
      { rootMargin: "200px" },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const sortedWorkouts = useMemo(() => {
    const source = useDemoData ? demoWorkouts : workouts;
    return [...source].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [workouts, useDemoData]);

  const limitedWorkouts = sortedWorkouts.slice(0, visibleCount);

  const groupedByMonth = useMemo(() => {
    const groups = {};
    limitedWorkouts.forEach((w) => {
      const d = new Date(w.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const label = d.toLocaleDateString("en-US", { month: "long" });
      if (!groups[key]) {
        groups[key] = { label, items: [] };
      }
      groups[key].items.push(w);
    });

    return Object.entries(groups)
      .sort((a, b) => {
        const [ay, am] = a[0].split("-").map(Number);
        const [by, bm] = b[0].split("-").map(Number);
        return by - ay || bm - am;
      })
      .map(([key, value]) => ({ key, ...value }));
  }, [limitedWorkouts]);

  const toggleMonth = (key) => {
    setCollapsedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <div className="flex items-center justify-between mb-4 text-sm text-[#6b8b6b]">
          <span>
            {useDemoData ? "Showing demo workouts" : "Showing your workouts"}
          </span>
          <button
            onClick={() => setUseDemoData((prev) => !prev)}
            className="text-[#8fbc8f] hover:text-[#a0ccb0] transition-colors"
          >
            {useDemoData ? "Use my data" : "Use demo data"}
          </button>
        </div>

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
            {groupedByMonth.map((group) => {
              const isCollapsed = collapsedMonths[group.key];
              return (
                <div key={group.key} className="space-y-2">
                  <button
                    onClick={() => toggleMonth(group.key)}
                    className="w-full flex items-center justify-between bg-transparent text-left text-white font-semibold"
                  >
                    <span className="text-sm uppercase tracking-wide text-[#8fbc8f]">
                      {group.label}
                    </span>
                    <span className="text-[#6b8b6b] text-xs">
                      {isCollapsed ? "Show" : "Hide"}
                    </span>
                  </button>
                  {!isCollapsed && (
                    <div className="space-y-4">
                      {group.items.map((workout) => (
                        <div key={workout.id} className="space-y-2">
                          <div className="text-[#6b8b6b] text-xs uppercase tracking-wide px-1">
                            {formatDate(workout.date)}
                          </div>
                          <div className="bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 hover:border-[#3a4a3a] transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">
                                  {workoutEmojis[workout.workoutType]}
                                </span>
                                <h3 className="text-white font-medium text-base">
                                  {workoutTypeNames[workout.workoutType]}
                                </h3>
                              </div>
                              {workout.durationMinutes && (
                                <span className="text-[#6b8b6b] text-xs">
                                  {workout.durationMinutes} min
                                </span>
                              )}
                            </div>
                            {workout.exercises &&
                              workout.exercises.length > 0 && (
                                <div className="pt-2 border-t border-[#2a3a2a]">
                                  <p className="text-[#6b8b6b] text-xs mb-1">
                                    {workout.exercises.length} exercise
                                    {workout.exercises.length !== 1 ? "s" : ""}
                                  </p>
                                  <div className="space-y-0.5">
                                    {workout.exercises
                                      .slice(0, 3)
                                      .map((exercise, index) => (
                                        <p
                                          key={index}
                                          className="text-[#8fbc8f] text-sm"
                                        >
                                          • {exercise.exerciseName}
                                        </p>
                                      ))}
                                    {workout.exercises.length > 3 && (
                                      <p className="text-[#6b8b6b] text-xs">
                                        + {workout.exercises.length - 3} more
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={sentinelRef} className="h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
