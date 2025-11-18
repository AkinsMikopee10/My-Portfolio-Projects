import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import FocusTimer from "./FocusTimer";
import StatsCard from "./StatsCard";

const DashboardGrid = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  // Sync completed tasks count from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("zenspace-tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      const done = tasks.filter((t) => t.completed).length;
      setCompletedTasks(done);
    }
    const savedFocus = localStorage.getItem("zenspace-focus-minutes");
    if (savedFocus) setFocusMinutes(parseInt(savedFocus));
  }, []);

  const handleFocusEnd = (minutesFocused) => {
    const newTotal = focusMinutes + minutesFocused;
    setFocusMinutes(newTotal);
    localStorage.setItem("zenspace-focus-minutes", newTotal);
  };

  return (
    <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TaskList setCompletedTasks={setCompletedTasks} />

      <FocusTimer onSessionEnd={handleFocusEnd} />

      <div className="bg-white rounded-xl shadow-sm p-4 col-span-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Stats Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatsCard title="Tasks Completed" value={completedTasks} />
          <StatsCard title="Focus Time" value={`${focusMinutes} min`} />
          <StatsCard
            title="Streak"
            value="🔥 3 days"
            subtitle="Keep it going!"
          />
        </div>

        <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((completedTasks / 5) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Daily Progress ({completedTasks}/5 tasks completed)
        </p>
      </div>
    </main>
  );
};

export default DashboardGrid;
