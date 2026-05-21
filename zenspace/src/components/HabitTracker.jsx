import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Plus, Flame, X, Check, Trophy, Zap } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const todayKey = () => new Date().toISOString().split("T")[0]; // "2026-04-19"

const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
};

const getDayLabel = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
};

const calcStreak = (completions = {}) => {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split("T")[0];
    if (completions[key]) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

// ─── Preset habits ────────────────────────────────────────────────────────────
const PRESET_HABITS = [
  { label: "Meditate", emoji: "🧘", color: "#10b981" },
  { label: "Exercise", emoji: "💪", color: "#f59e0b" },
  { label: "Read", emoji: "📚", color: "#6366f1" },
  { label: "Hydrate", emoji: "💧", color: "#38bdf8" },
  { label: "No phone", emoji: "📵", color: "#a78bfa" },
  { label: "Sleep early", emoji: "🌙", color: "#fb7185" },
];

// ─── Single habit row ─────────────────────────────────────────────────────────
const HabitRow = ({ habit, onToggleDay, onDelete, isDark }) => {
  const days = getLast7Days();
  const today = todayKey();
  const streak = calcStreak(habit.completions);
  const completedToday = !!habit.completions?.[today];

  // completion rate this week
  const weekDone = days.filter((d) => habit.completions?.[d]).length;
  const weekRate = Math.round((weekDone / 7) * 100);

  return (
    <div
      className={`
        group flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200
        ${
          isDark
            ? "bg-zen-800/50 border-zen-700/40 hover:border-zen-700"
            : "bg-white border-zen-200/80 hover:border-zen-200"
        }
      `}
    >
      {/* Top row: emoji + name + streak + delete */}
      <div className="flex items-center gap-3">
        {/* Emoji + today toggle */}
        <button
          onClick={() => onToggleDay(habit.id, today)}
          aria-label={completedToday ? "Mark incomplete" : "Mark complete"}
          className="relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl
            transition-all duration-200 active:scale-90"
          style={{
            background: completedToday
              ? `${habit.color}22`
              : isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.04)",
            border: `2px solid ${completedToday ? habit.color : "transparent"}`,
            boxShadow: completedToday ? `0 0 12px ${habit.color}40` : "none",
          }}
        >
          {habit.emoji}
          {completedToday && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: habit.color }}
            >
              <Check size={9} strokeWidth={3} className="text-white" />
            </span>
          )}
        </button>

        {/* Name + week rate */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium leading-tight ${isDark ? "text-zinc-200" : "text-zinc-800"}`}
          >
            {habit.label}
          </p>
          <p
            className={`text-[11px] mt-0.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            {weekRate}% this week
          </p>
        </div>

        {/* Streak badge */}
        {streak > 0 && (
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ backgroundColor: `${habit.color}18` }}
          >
            <Flame size={11} style={{ color: habit.color }} />
            <span
              className="text-[11px] font-semibold"
              style={{ color: habit.color }}
            >
              {streak}
            </span>
          </div>
        )}

        {/* Delete — visible on hover */}
        <button
          onClick={() => onDelete(habit.id)}
          aria-label="Remove habit"
          className={`opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg flex items-center justify-center
            transition-all duration-150 shrink-0
            ${
              isDark
                ? "text-zen-muted hover:text-rose-400 hover:bg-rose-400/10"
                : "text-zinc-300 hover:text-rose-500 hover:bg-rose-50"
            }`}
        >
          <X size={12} />
        </button>
      </div>

      {/* 7-day dot grid */}
      <div className="flex items-center gap-1.5">
        {days.map((day) => {
          const done = !!habit.completions?.[day];
          const isToday = day === today;
          return (
            <button
              key={day}
              onClick={() => onToggleDay(habit.id, day)}
              aria-label={`Toggle ${day}`}
              title={day}
              className="flex-1 flex flex-col items-center gap-1 group/dot"
            >
              <div
                className={`w-full h-6 rounded-md transition-all duration-200
                  ${isToday ? "ring-1 ring-offset-1" : ""}
                `}
                style={{
                  backgroundColor: done
                    ? habit.color
                    : isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.06)",
                  ringColor: habit.color,
                  ringOffsetColor: isDark ? "#161d27" : "#f5f7f2",
                  opacity: done ? 1 : 0.7,
                  boxShadow: done ? `0 2px 8px ${habit.color}40` : "none",
                }}
              />
              <span
                className={`text-[9px] font-medium transition-colors
                ${
                  isToday
                    ? isDark
                      ? "text-zinc-300"
                      : "text-zinc-700"
                    : isDark
                      ? "text-zen-muted"
                      : "text-zinc-400"
                }`}
              >
                {getDayLabel(day)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const HabitTracker = () => {
  const { isDark } = useTheme();

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("zenspace-habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [showAdd, setShowAdd] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customEmoji, setCustomEmoji] = useState("⭐");
  const [customColor, setCustomColor] = useState("#10b981");

  useEffect(() => {
    localStorage.setItem("zenspace-habits", JSON.stringify(habits));
  }, [habits]);

  const addPreset = (preset) => {
    if (habits.find((h) => h.label === preset.label)) return;
    setHabits([...habits, { id: Date.now(), ...preset, completions: {} }]);
  };

  const addCustom = () => {
    if (!customLabel.trim()) return;
    setHabits([
      ...habits,
      {
        id: Date.now(),
        label: customLabel.trim(),
        emoji: customEmoji,
        color: customColor,
        completions: {},
      },
    ]);
    setCustomLabel("");
    setShowAdd(false);
  };

  const toggleDay = (id, dateKey) => {
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        const completions = { ...h.completions };
        if (completions[dateKey]) {
          delete completions[dateKey];
        } else {
          completions[dateKey] = true;
        }
        return { ...h, completions };
      }),
    );
  };

  const deleteHabit = (id) => setHabits(habits.filter((h) => h.id !== id));

  // Overall stats
  const today = todayKey();
  const completedToday = habits.filter((h) => h.completions?.[today]).length;
  const topStreak = Math.max(
    0,
    ...habits.map((h) => calcStreak(h.completions)),
  );

  return (
    <div className="zen-card p-5 flex flex-col gap-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-zen-emerald" />
          <h2 className="zen-heading text-base">Habit Tracker</h2>
        </div>

        {/* Summary pills */}
        <div className="flex items-center gap-2">
          {completedToday > 0 && (
            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-zen-emerald/15 text-zen-emerald font-medium">
              <Check size={10} strokeWidth={3} />
              {completedToday}/{habits.length} today
            </span>
          )}
          {topStreak > 1 && (
            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-amber-400/10 text-amber-400 font-medium">
              <Trophy size={10} />
              {topStreak} day streak
            </span>
          )}
        </div>
      </div>

      {/* Habit list */}
      {habits.length > 0 ? (
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onToggleDay={toggleDay}
              onDelete={deleteHabit}
              isDark={isDark}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center
            ${isDark ? "bg-zen-700/40" : "bg-zen-100"}`}
          >
            <Zap size={20} className="text-zen-muted" />
          </div>
          <div className="text-center">
            <p
              className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
            >
              No habits yet
            </p>
            <p
              className={`text-xs mt-1 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              Add one below to start building your streaks
            </p>
          </div>
        </div>
      )}

      {/* Add section */}
      {showAdd ? (
        <div
          className={`flex flex-col gap-3 p-4 rounded-2xl border transition-colors
          ${isDark ? "bg-zen-850/60 border-zen-700/50" : "bg-zen-50 border-zen-200"}`}
        >
          {/* Preset quick-add */}
          <p className="zen-label">Quick add</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_HABITS.filter(
              (p) => !habits.find((h) => h.label === p.label),
            ).map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  addPreset(p);
                  setShowAdd(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium
                  transition-all duration-150 hover:scale-105 active:scale-95
                  ${
                    isDark
                      ? "border-zen-700 hover:border-zen-600 text-zinc-300 hover:bg-zen-700/50"
                      : "border-zen-200 hover:border-zinc-300 text-zinc-600 hover:bg-white"
                  }`}
              >
                {p.emoji} {p.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            className={`flex items-center gap-2 text-xs ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            <div
              className={`flex-1 h-px ${isDark ? "bg-zen-700" : "bg-zen-200"}`}
            />
            or custom
            <div
              className={`flex-1 h-px ${isDark ? "bg-zen-700" : "bg-zen-200"}`}
            />
          </div>

          {/* Custom habit row */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Emoji"
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value)}
              maxLength={2}
              className={`w-12 text-center rounded-xl border px-2 py-2 text-sm outline-none transition-colors
                ${
                  isDark
                    ? "bg-zen-800 border-zen-700 text-zinc-100 focus:border-zen-emerald/40"
                    : "bg-white border-zen-200 text-zinc-800 focus:border-zen-emerald/50"
                }`}
            />
            <input
              type="text"
              placeholder="Habit name..."
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm outline-none transition-colors
                ${
                  isDark
                    ? "bg-zen-800 border-zen-700 text-zinc-100 placeholder:text-zen-muted focus:border-zen-emerald/40"
                    : "bg-white border-zen-200 text-zinc-800 placeholder:text-zinc-400 focus:border-zen-emerald/50"
                }`}
            />
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              title="Pick a color"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowAdd(false)}
              className={`zen-btn-ghost text-xs`}
            >
              Cancel
            </button>
            <button
              onClick={addCustom}
              disabled={!customLabel.trim()}
              className="zen-btn-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add habit
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed
            text-sm font-medium transition-all duration-200
            ${
              isDark
                ? "border-zen-700 text-zen-muted hover:border-zen-emerald/40 hover:text-zen-emerald hover:bg-zen-emerald/5"
                : "border-zen-200 text-zinc-400 hover:border-zen-emerald/40 hover:text-zen-emerald hover:bg-zen-emerald/5"
            }`}
        >
          <Plus size={15} />
          Add a habit
        </button>
      )}
    </div>
  );
};

export default HabitTracker;
