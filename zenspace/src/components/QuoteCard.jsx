import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { Quote, RefreshCw } from "lucide-react";

const FALLBACK_QUOTES = [
  {
    content:
      "The present moment is the only moment available to us, and it is the door to all moments.",
    author: "Thich Nhat Hanh",
  },
  {
    content:
      "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  {
    content:
      "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    content:
      "Within you, there is a stillness and a sanctuary to which you can retreat at any time.",
    author: "Hermann Hesse",
  },
  {
    content:
      "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
  },
];

const QuoteCard = () => {
  const { isDark } = useTheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.quotable.io/random?tags=wisdom|inspirational&maxLength=120",
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch {
      // Use a random fallback
      setQuote(
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)],
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="zen-card p-5 flex flex-col gap-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Quote size={16} className="text-zen-emerald" />
          <h2 className="zen-heading text-base">Daily Quote</h2>
        </div>
        <button
          onClick={fetchQuote}
          disabled={loading}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
            ${
              isDark
                ? "hover:bg-zen-700/50 text-zen-muted hover:text-zinc-300"
                : "hover:bg-zen-100 text-zinc-400 hover:text-zinc-600"
            }
            ${loading ? "animate-spin" : ""}
          `}
          aria-label="New quote"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Quote body */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        {/* Large decorative quote mark */}
        <span
          className={`font-display text-5xl leading-none -mb-2 select-none ${isDark ? "text-zen-emerald/20" : "text-zen-emerald/15"}`}
        >
          "
        </span>

        {loading || !quote ? (
          <div className="space-y-2">
            <div
              className={`h-3 rounded-full animate-pulse ${isDark ? "bg-zen-700" : "bg-zen-100"}`}
            />
            <div
              className={`h-3 rounded-full w-4/5 animate-pulse ${isDark ? "bg-zen-700" : "bg-zen-100"}`}
            />
            <div
              className={`h-3 rounded-full w-3/5 animate-pulse ${isDark ? "bg-zen-700" : "bg-zen-100"}`}
            />
          </div>
        ) : (
          <p
            className={`text-sm leading-relaxed font-light italic ${isDark ? "text-zinc-300" : "text-zinc-600"}`}
          >
            {quote.content}
          </p>
        )}

        {quote && !loading && (
          <p
            className={`text-xs font-medium ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            — {quote.author}
          </p>
        )}
      </div>

      {/* Decorative bottom bar */}
      <div className="h-px bg-gradient-to-r from-zen-emerald/30 via-zen-emerald/10 to-transparent" />
    </div>
  );
};

export default QuoteCard;
