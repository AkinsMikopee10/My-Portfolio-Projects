import { useState, useEffect } from "react";

const EMOJIS = ["😊", "😐", "😞"];

const MoodTracker = () => {
  // Read from localStorage on first render
  const [mood, setMood] = useState(() => localStorage.getItem("mood") || "");

  // Persist whenever mood changes
  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  return (
    <section className="glass-card p-4 text-center">
      <h2 className="text-lg font-semibold mb-3">How are you feeling today?</h2>
      <div className="flex justify-center gap-4 text-3xl">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setMood(emoji)}
            className={`transition transform hover:scale-110 px-2 ${
              mood === emoji ? "opacity-100" : "opacity-60"
            }`}
            aria-pressed={mood === emoji}
            aria-label={`Set mood ${emoji}`}
            title={`Choose ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Subtle feedback */}
      <p className="mt-2 text-white/80 text-sm">
        {mood ? `Mood saved: ${mood}` : "Tap an emoji to save your mood"}
      </p>
    </section>
  );
};

export default MoodTracker;
