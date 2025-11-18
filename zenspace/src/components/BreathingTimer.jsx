import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BreathingTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, [isActive]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <motion.section
      className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Breathe with Me
      </h2>

      {/* Breathing orb */}
      <motion.div
        animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-indigo-100/40 mb-4"
      />

      <p className="text-gray-500 text-sm mb-1">
        Inhale as it expands, exhale as it contracts.
      </p>
      <p className="text-gray-400 text-xs mb-3">
        Session time: {mm}:{ss}
      </p>

      <button
        onClick={() => {
          if (isActive) setSeconds(0);
          setIsActive((prev) => !prev);
        }}
        className={`px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        }`}
      >
        {isActive ? "Stop" : "Start"}
      </button>
    </motion.section>
  );
};

export default BreathingTimer;
