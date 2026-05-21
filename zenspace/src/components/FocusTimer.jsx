import { useState, useEffect, useRef } from "react";
import { useTheme } from "../App";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

const PRESETS = [
  { label: "Pomodoro", minutes: 25 },
  { label: "Short break", minutes: 5 },
  { label: "Long break", minutes: 15 },
];

const TOTAL_SECONDS = (m) => m * 60;

const FocusTimer = ({ onSessionEnd }) => {
  const { isDark } = useTheme();
  const [preset, setPreset] = useState(0); // index into PRESETS
  const [totalSecs, setTotalSecs] = useState(TOTAL_SECONDS(25));
  const [remaining, setRemaining] = useState(TOTAL_SECONDS(25));
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // tick
  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          if (onSessionEnd) onSessionEnd(PRESETS[preset].minutes);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isActive, onSessionEnd, preset]);

  const handlePreset = (idx) => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setPreset(idx);
    const secs = TOTAL_SECONDS(PRESETS[idx].minutes);
    setTotalSecs(secs);
    setRemaining(secs);
  };

  const handleStartPause = () => setIsActive((p) => !p);

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setRemaining(totalSecs);
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const fmt = (n) => String(n).padStart(2, "0");

  // SVG ring
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progress = remaining / totalSecs;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const ringColor =
    preset === 0
      ? "#10b981" // emerald — focus
      : preset === 1
        ? "#f59e0b" // amber — short break
        : "#6366f1"; // indigo — long break

  return (
    <div className={`zen-card p-5 flex flex-col gap-4 animate-slide-up`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Timer size={16} className="text-zen-emerald" />
        <h2 className="zen-heading text-base">Focus Timer</h2>
      </div>

      {/* Preset tabs */}
      <div
        className={`flex gap-1 p-1 rounded-xl ${isDark ? "bg-zen-850/60" : "bg-zen-100"}`}
      >
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => handlePreset(i)}
            className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all duration-200
              ${
                preset === i
                  ? isDark
                    ? "bg-zen-700 text-zinc-100 shadow-sm"
                    : "bg-white text-zinc-800 shadow-sm"
                  : isDark
                    ? "text-zen-muted hover:text-zinc-300"
                    : "text-zinc-400 hover:text-zinc-600"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Ring + time */}
      <div className="flex flex-col items-center gap-1 py-2">
        <div className="relative w-36 h-36">
          {/* Glow */}
          <div
            className="absolute inset-4 rounded-full blur-xl opacity-20 transition-colors duration-500"
            style={{ backgroundColor: ringColor }}
          />

          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Track */}
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-display text-3xl font-medium tabular-nums leading-none
              ${isDark ? "text-zinc-100" : "text-zinc-900"}`}
            >
              {fmt(mins)}:{fmt(secs)}
            </span>
            <span
              className={`text-[10px] mt-1 tracking-widest uppercase font-medium
              ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              {isActive
                ? "Focusing"
                : remaining === totalSecs
                  ? "Ready"
                  : "Paused"}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleReset}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            ${
              isDark
                ? "bg-zen-700/50 hover:bg-zen-700 text-zen-mutedLight hover:text-zinc-100"
                : "bg-zen-100 hover:bg-zen-200 text-zinc-400 hover:text-zinc-700"
            }`}
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={handleStartPause}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white
            transition-all duration-200 active:scale-95 shadow-lg"
          style={{
            backgroundColor: ringColor,
            boxShadow: `0 4px 16px ${ringColor}40`,
          }}
        >
          {isActive ? <Pause size={14} /> : <Play size={14} />}
          {isActive ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
