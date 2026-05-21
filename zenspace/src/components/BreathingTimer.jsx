import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../App";
import { Wind } from "lucide-react";

// Breathing cycle: 4s inhale, 4s hold, 6s exhale
const CYCLE = [
  { label: "Inhale", duration: 4 },
  { label: "Hold", duration: 4 },
  { label: "Exhale", duration: 6 },
];
const CYCLE_TOTAL = CYCLE.reduce((a, b) => a + b.duration, 0); // 14s

// Derive phase from elapsed seconds (no sub-second precision needed)
const getPhase = (elapsed) => {
  const cyclePos = elapsed % CYCLE_TOTAL;
  let acc = 0;
  for (let i = 0; i < CYCLE.length; i++) {
    acc += CYCLE[i].duration;
    if (cyclePos < acc) {
      const phaseStart = acc - CYCLE[i].duration;
      return {
        index: i,
        phase: CYCLE[i],
        remaining: Math.ceil(acc - cyclePos),
        fraction: (cyclePos - phaseStart) / CYCLE[i].duration,
      };
    }
  }
  return {
    index: 0,
    phase: CYCLE[0],
    remaining: CYCLE[0].duration,
    fraction: 0,
  };
};

const BreathingTimer = () => {
  const { isDark } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [elapsed, setElapsed] = useState(0); // whole seconds only
  const intervalRef = useRef(null);

  // Tick once per second — was 10x/sec before
  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handleToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsActive(false);
    setElapsed(0);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const { index: phaseIdx, phase, remaining, fraction } = getPhase(elapsed);

  // Orb scale: inhale 1→1.5, hold stays 1.5, exhale 1.5→1
  const fromScale = phaseIdx === 0 ? 1 : 1.5;
  const toScale = phaseIdx === 2 ? 1 : 1.5;
  const orbScale = isActive ? fromScale + (toScale - fromScale) * fraction : 1;

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
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
              opacity: isActive ? 1 : 0.3,
              transform: `scale(${orbScale})`,
              transition: `transform ${phase.duration}s ease-in-out, opacity 1s ease`,
            }}
          />
          {/* Core orb */}
          <div
            className="relative rounded-full"
            style={{
              width: "56px",
              height: "56px",
              background: isDark
                ? "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.7), rgba(16,185,129,0.25))"
                : "radial-gradient(circle at 35% 35%, rgba(16,185,129,0.9), rgba(16,185,129,0.4))",
              transform: `scale(${orbScale})`,
              transition: `transform ${phase.duration}s ease-in-out`,
              boxShadow: "0 0 20px rgba(16,185,129,0.3)",
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
                {remaining}s
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

        {/* Phase dots */}
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

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs tabular-nums font-medium ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
        >
          {mm}:{ss}
        </span>
        <button
          onClick={handleToggle}
          className={`zen-btn-primary text-xs py-1.5 px-4
            ${isActive ? "!bg-amber-500 hover:!bg-amber-600" : ""}`}
        >
          {isActive ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
        </button>
        {elapsed > 0 && !isActive && (
          <button
            onClick={handleReset}
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
