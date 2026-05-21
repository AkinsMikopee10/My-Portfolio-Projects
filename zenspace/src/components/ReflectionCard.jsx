import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { BookOpen, Shuffle, CheckCircle2 } from "lucide-react";

const PROMPTS = [
  "What's one thing you're grateful for today?",
  "What challenged you today, and what did you learn?",
  "What's one small win you had today?",
  "What would make tomorrow even better?",
  "How did you take care of yourself today?",
  "What's something you want to let go of?",
  "Who or what brought you joy today?",
];

const ReflectionCard = () => {
  const { isDark } = useTheme();
  const [reflection, setReflection] = useState(
    () => localStorage.getItem("zenspace-reflection") || "",
  );
  const [promptIdx, setPromptIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false); // reset saved indicator when text changes
  }, [reflection]);

  const handleSave = () => {
    localStorage.setItem("zenspace-reflection", reflection);
    setSaved(true);
  };

  const shufflePrompt = () => setPromptIdx((i) => (i + 1) % PROMPTS.length);

  const MAX = 500;

  return (
    <div className="zen-card p-5 flex flex-col gap-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-zen-emerald" />
          <h2 className="zen-heading text-base">Reflection</h2>
        </div>
        <button
          onClick={shufflePrompt}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-all duration-200
            ${
              isDark
                ? "hover:bg-zen-700/50 text-zen-muted hover:text-zinc-300"
                : "hover:bg-zen-100 text-zinc-400 hover:text-zinc-600"
            }`}
        >
          <Shuffle size={11} />
          New prompt
        </button>
      </div>

      {/* Prompt pill */}
      <div
        className={`px-3 py-2.5 rounded-xl border text-xs leading-relaxed transition-colors
        ${
          isDark
            ? "bg-zen-emerald/5 border-zen-emerald/20 text-zen-mutedLight"
            : "bg-zen-emerald/5 border-zen-emerald/20 text-zinc-600"
        }`}
      >
        💭 {PROMPTS[promptIdx]}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value.slice(0, MAX))}
          placeholder="Write freely — this is your space..."
          rows={4}
          className={`w-full resize-none text-sm rounded-xl p-3 outline-none transition-colors
            border leading-relaxed
            ${
              isDark
                ? "bg-zen-850/60 border-zen-700/50 text-zinc-200 placeholder:text-zen-muted focus:border-zen-emerald/40"
                : "bg-zen-50 border-zen-200 text-zinc-700 placeholder:text-zinc-400 focus:border-zen-emerald/50"
            }`}
        />
        <span
          className={`absolute bottom-3 right-3 text-[10px] tabular-nums
          ${
            reflection.length > MAX * 0.9
              ? "text-amber-400"
              : isDark
                ? "text-zen-muted"
                : "text-zinc-400"
          }`}
        >
          {reflection.length}/{MAX}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {saved ? (
          <div className="flex items-center gap-1.5 text-xs text-zen-emerald">
            <CheckCircle2 size={13} />
            Saved!
          </div>
        ) : (
          <p
            className={`text-xs ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            {reflection.length > 0 ? "Unsaved changes" : "Start writing..."}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={!reflection.trim() || saved}
          className="zen-btn-primary text-xs py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save reflection
        </button>
      </div>
    </div>
  );
};

export default ReflectionCard;
