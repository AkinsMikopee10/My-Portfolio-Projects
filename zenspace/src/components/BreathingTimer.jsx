import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BreathingTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Basic timer for display; animation is handled by Framer Motion
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, [isActive]);

  // Format seconds as mm:ss
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <section className="glass-card p-4 text-center">
      <h2 className="text-lg font-semibold mb-3">Breathe with Me</h2>

      {/* Breathing orb: slow expand/contract */}
      <motion.div
        animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto w-32 h-32 rounded-full bg-white/40"
      />

      {/* Guidance and timer */}
      <p className="mt-3 text-white/80 text-sm">
        Inhale as it expands, exhale as it contracts.
      </p>
      <p className="mt-1 text-white/80 text-xs">
        Session time: {mm}:{ss}
      </p>
      <button
        onClick={() => {
          // Toggle and reset timer when stopping
          if (isActive) setSeconds(0);
          setIsActive((prev) => !prev);
        }}
        className="mt-4 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/40 transition"
      >
        {isActive ? "Stop" : "Start"}
      </button>
    </section>
  );
};

export default BreathingTimer;
