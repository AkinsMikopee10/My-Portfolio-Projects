import { useState, useEffect } from "react";
import { useTheme } from "../App";
import TaskList from "./TaskList";
import FocusTimer from "./FocusTimer";
import StatsCard from "./StatsCard";
import BreathingTimer from "./BreathingTimer";
import MoodTracker from "./MoodTracker";
import QuoteCard from "./QuoteCard";
import ReflectionCard from "./ReflectionCard";
import HabitTracker from "./HabitTracker";
import { Sparkles } from "lucide-react";

const DashboardGrid = () => {
  const { isDark } = useTheme();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("zenspace-tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      setCompletedTasks(tasks.filter((t) => t.completed).length);
    }
    const savedFocus = localStorage.getItem("zenspace-focus-minutes");
    if (savedFocus) setFocusMinutes(parseInt(savedFocus));
  }, []);

  const handleFocusEnd = (minutesFocused) => {
    const newTotal = focusMinutes + minutesFocused;
    setFocusMinutes(newTotal);
    localStorage.setItem("zenspace-focus-minutes", newTotal);
  };

  // Daily progress (out of 5 tasks)
  const progressPct = Math.min((completedTasks / 5) * 100, 100);

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      className={`p-6 space-y-8 min-h-full transition-colors duration-300 ${
        isDark ? "text-zinc-100" : "text-zinc-900"
      }`}
    >
      {/* ── Page header ── */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className={`zen-label mb-1`}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1
            className={`font-display text-2xl font-medium ${isDark ? "text-zinc-100" : "text-zinc-900"}`}
          >
            {greeting}, Michael 👋
          </h1>
          <p
            className={`text-sm mt-1 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            Here's your wellness & productivity overview
          </p>
        </div>

        {/* Daily progress pill */}
        <div
          className={`
            flex items-center gap-3 px-4 py-2.5 rounded-2xl border
            transition-colors duration-300 shrink-0
            ${
              isDark
                ? "bg-zen-800/60 border-zen-700/40"
                : "bg-white border-zen-200"
            }
          `}
        >
          <Sparkles size={14} className="text-zen-emerald" />
          <div>
            <p
              className={`text-xs font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Daily Progress
            </p>
            <p
              className={`text-[11px] ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              {completedTasks}/5 tasks done
            </p>
          </div>
          {/* Mini progress bar */}
          <div
            className={`w-20 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-zen-700" : "bg-zen-100"}`}
          >
            <div
              className="h-full rounded-full bg-zen-emerald transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-zen-emerald">
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <section>
        <p className="zen-label mb-3">Overview</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Tasks Completed"
            value={completedTasks}
            suffix="today"
            accent="emerald"
          />
          <StatsCard
            title="Focus Time"
            value={focusMinutes}
            suffix="min"
            accent="amber"
          />
          <StatsCard
            title="Current Streak"
            value="3"
            suffix="days 🔥"
            subtitle="Keep it going!"
            accent="emerald"
            className="col-span-2 lg:col-span-1"
          />
        </div>
      </section>

      {/* ── Productivity tools ── */}
      <section>
        <p className="zen-label mb-3">Productivity</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskList setCompletedTasks={setCompletedTasks} />
          <FocusTimer onSessionEnd={handleFocusEnd} />
        </div>
      </section>

      {/* ── Habit Tracker ── */}
      <section>
        <p className="zen-label mb-3">Habits</p>
        <HabitTracker />
      </section>

      {/* ── Wellness tools ── */}
      <section>
        <p className="zen-label mb-3">Wellness</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BreathingTimer />
          <MoodTracker />
          <QuoteCard />
          <ReflectionCard />
        </div>
      </section>
    </div>
  );
};

export default DashboardGrid;
