import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Smile } from "lucide-react";

const MOODS = [
  {
    emoji: "😄",
    label: "Great",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  {
    emoji: "😊",
    label: "Good",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
  },
  {
    emoji: "😐",
    label: "Okay",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
  {
    emoji: "😔",
    label: "Low",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
  },
  {
    emoji: "😞",
    label: "Rough",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/30",
  },
];

const MoodTracker = () => {
  const { isDark } = useTheme();
  const [mood, setMood] = useState(() => {
    const saved = localStorage.getItem("zenspace-mood");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (mood) localStorage.setItem("zenspace-mood", JSON.stringify(mood));
  }, [mood]);

  const selected = MOODS.find((m) => m.label === mood?.label);

  return (
    <div className="zen-card p-5 flex flex-col gap-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Smile size={16} className="text-zen-emerald" />
        <h2 className="zen-heading text-base">Mood Check-in</h2>
      </div>

      {/* Mood buttons */}
      <div className="flex justify-between gap-1">
        {MOODS.map((m) => {
          const isSelected = mood?.label === m.label;
          return (
            <button
              key={m.label}
              onClick={() =>
                setMood({
                  label: m.label,
                  emoji: m.emoji,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                })
              }
              aria-pressed={isSelected}
              aria-label={m.label}
              className={`
                flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl border
                transition-all duration-200
                ${
                  isSelected
                    ? `${m.bg} ${m.border}`
                    : isDark
                      ? "border-zen-700/40 hover:bg-zen-700/30 hover:border-zen-600"
                      : "border-zen-200 hover:bg-zen-100"
                }
              `}
            >
              <span
                className={`text-xl transition-transform duration-200 ${isSelected ? "scale-125" : "scale-100"}`}
              >
                {m.emoji}
              </span>
              <span
                className={`text-[10px] font-medium ${isSelected ? m.color : isDark ? "text-zen-muted" : "text-zinc-400"}`}
              >
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result */}
      {mood ? (
        <div
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border
          ${selected ? `${selected.bg} ${selected.border}` : ""}
        `}
        >
          <span className="text-lg">{mood.emoji}</span>
          <div>
            <p className={`text-xs font-medium ${selected?.color}`}>
              Feeling {mood.label.toLowerCase()} today
            </p>
            <p
              className={`text-[10px] mt-0.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              Logged at {mood.time}
            </p>
          </div>
        </div>
      ) : (
        <p
          className={`text-xs text-center ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
        >
          How are you feeling right now?
        </p>
      )}
    </div>
  );
};

export default MoodTracker;
