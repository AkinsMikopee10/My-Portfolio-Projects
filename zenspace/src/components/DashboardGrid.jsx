import { useState, useEffect, useCallback, memo } from "react";
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

// Memoised so they only re-render when their own props change
const MemoTaskList = memo(TaskList);
const MemoFocusTimer = memo(FocusTimer);
const MemoBreathing = memo(BreathingTimer);
const MemoMood = memo(MoodTracker);
const MemoQuote = memo(QuoteCard);
const MemoReflection = memo(ReflectionCard);
const MemoHabit = memo(HabitTracker);
const MemoStats = memo(StatsCard);

const DashboardGrid = () => {
  const { isDark } = useTheme();
  const [completedTasks, setCompletedTasks] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);

  // Load from localStorage once on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("zenspace-tasks");
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      setCompletedTasks(tasks.filter((t) => t.completed).length);
    }
    const savedFocus = localStorage.getItem("zenspace-focus-minutes");
    if (savedFocus) setFocusMinutes(parseInt(savedFocus));
  }, []);

  // Stable references — won't cause child re-renders on every DashboardGrid render
  const handleSetCompletedTasks = useCallback((count) => {
    setCompletedTasks(count);
  }, []);

  const handleFocusEnd = useCallback((minutesFocused) => {
    setFocusMinutes((prev) => {
      const newTotal = prev + minutesFocused;
      localStorage.setItem("zenspace-focus-minutes", newTotal);
      return newTotal;
    });
  }, []);

  const progressPct = Math.min((completedTasks / 5) * 100, 100);

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
          <p className="zen-label mb-1">
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
            ${isDark ? "bg-zen-800/60 border-zen-700/40" : "bg-white border-zen-200"}
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
          <MemoStats
            title="Tasks Completed"
            value={completedTasks}
            suffix="today"
            accent="emerald"
          />
          <MemoStats
            title="Focus Time"
            value={focusMinutes}
            suffix="min"
            accent="amber"
          />
          <MemoStats
            title="Current Streak"
            value="3"
            suffix="days 🔥"
            subtitle="Keep it going!"
            accent="emerald"
            className="col-span-2 lg:col-span-1"
          />
        </div>
      </section>

      {/* ── Productivity ── */}
      <section>
        <p className="zen-label mb-3">Productivity</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MemoTaskList setCompletedTasks={handleSetCompletedTasks} />
          <MemoFocusTimer onSessionEnd={handleFocusEnd} />
        </div>
      </section>

      {/* ── Habits ── */}
      <section>
        <p className="zen-label mb-3">Habits</p>
        <MemoHabit />
      </section>

      {/* ── Wellness ── */}
      <section>
        <p className="zen-label mb-3">Wellness</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MemoBreathing />
          <MemoMood />
          <MemoQuote />
          <MemoReflection />
        </div>
      </section>
    </div>
  );
};

export default DashboardGrid;
