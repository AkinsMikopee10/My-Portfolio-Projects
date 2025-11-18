import { useState, useEffect } from "react";

const EMOJIS = ["😊", "😐", "😞"];

const MoodTracker = () => {
  const [mood, setMood] = useState(() => localStorage.getItem("mood") || "");

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 text-center">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        How are you feeling today?
      </h2>
      <div className="flex justify-center gap-4 text-3xl mb-3">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setMood(emoji)}
            className={`transition transform hover:scale-110 px-2 ${
              mood === emoji ? "opacity-100" : "opacity-60"
            }`}
            aria-pressed={mood === emoji}
            aria-label={`Set mood ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p className="text-gray-400 text-sm">
        {mood ? `Mood saved: ${mood}` : "Tap an emoji to save your mood"}
      </p>
    </section>
  );
};

export default MoodTracker;
