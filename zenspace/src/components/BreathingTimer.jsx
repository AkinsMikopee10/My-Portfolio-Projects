import { useState, useEffect, useRef } from "react";
import { useTheme } from "../App";
import { Wind } from "lucide-react";

// Breathing cycle: 4s inhale, 4s hold, 6s exhale
const CYCLE = [
  {
    label: "Inhale",
    duration: 4,
    scale: "scale-150",
    color: "rgba(16,185,129,0.25)",
  },
  {
    label: "Hold",
    duration: 4,
    scale: "scale-150",
    color: "rgba(16,185,129,0.15)",
  },
  {
    label: "Exhale",
    duration: 6,
    scale: "scale-100",
    color: "rgba(16,185,129,0.08)",
  },
];
const CYCLE_TOTAL = CYCLE.reduce((a, b) => a + b.duration, 0); // 14s

const BreathingTimer = () => {
  const { isDark } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds total
  const [phaseProgress, setPhaseProgress] = useState(0); // 0-1 within current phase
  const intervalRef = useRef(null);

  // Determine current phase from elapsed time
  const cyclePos = elapsed % CYCLE_TOTAL;
  let phaseIdx = 0;
  let acc = 0;
  for (let i = 0; i < CYCLE.length; i++) {
    if (cyclePos < acc + CYCLE[i].duration) {
      phaseIdx = i;
      break;
    }
    acc += CYCLE[i].duration;
  }
  const phase = CYCLE[phaseIdx];
  const phaseElapsed = cyclePos - acc;
  const phaseFraction = phaseElapsed / phase.duration;

  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(Math.floor(elapsed % 60)).padStart(2, "0");

  // Orb scale interpolation
  const fromScale = phaseIdx === 0 ? 1 : phaseIdx === 2 ? 1.5 : 1.5;
  const toScale = phaseIdx === 0 ? 1.5 : phaseIdx === 2 ? 1 : 1.5;
  const currentScale = fromScale + (toScale - fromScale) * phaseFraction;

  return (
    <div className="zen-card p-5 flex flex-col gap-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Wind size={16} className="text-zen-emerald" />
        <h2 className="zen-heading text-base">Breathe</h2>
      </div>

      {/* Orb */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer ring glow */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${phase.color} 0%, transparent 70%)`,
              transform: `scale(${isActive ? currentScale : 1})`,
              transition: "transform 0.4s ease, background 1s ease",
            }}
          />
          {/* Core orb */}
          <div
            className="relative rounded-full flex items-center justify-center transition-all ease-in-out"
            style={{
              width: "60px",
              height: "60px",
              background: isDark
                ? "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.6), rgba(16,185,129,0.2))"
                : "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.8), rgba(16,185,129,0.3))",
              transform: `scale(${isActive ? currentScale : 1})`,
              transition: `transform ${phase.duration}s ease-in-out`,
              boxShadow: "0 0 24px rgba(16,185,129,0.3)",
            }}
          />
        </div>

        {/* Phase label */}
        <div className="text-center min-h-[2.5rem]">
          {isActive ? (
            <>
              <p
                className={`text-sm font-semibold ${isDark ? "text-zinc-100" : "text-zinc-800"}`}
              >
                {phase.label}
              </p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
              >
                {Math.ceil(phase.duration - phaseElapsed)}s
              </p>
            </>
          ) : (
            <p
              className={`text-xs ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              {elapsed > 0 ? "Paused" : "Breathe with the orb"}
            </p>
          )}
        </div>

        {/* Phase progress dots */}
        {isActive && (
          <div className="flex gap-1.5">
            {CYCLE.map((c, i) => (
              <div
                key={c.label}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === phaseIdx
                    ? "w-4 bg-zen-emerald"
                    : `w-1.5 ${isDark ? "bg-zen-700" : "bg-zen-200"}`
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Timer + button */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs tabular-nums font-medium ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
        >
          {mm}:{ss}
        </span>
        <button
          onClick={() => {
            if (isActive) {
              setIsActive(false);
            } else {
              if (elapsed === 0 || !isActive) {
                setIsActive(true);
              }
            }
          }}
          className={`zen-btn-primary text-xs py-1.5 px-4
            ${isActive ? "!bg-amber-500 hover:!bg-amber-600" : ""}`}
        >
          {isActive ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
        </button>
        {elapsed > 0 && !isActive && (
          <button
            onClick={() => {
              setElapsed(0);
              setIsActive(false);
            }}
            className={`text-xs ${isDark ? "text-zen-muted hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"} transition-colors`}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default BreathingTimer;
