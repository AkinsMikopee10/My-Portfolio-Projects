import { useTheme } from "../App";
import { TrendingUp } from "lucide-react";

const accentMap = {
  emerald: {
    bg: "bg-zen-emerald/10",
    text: "text-zen-emerald",
    glow: "shadow-zen-glow-emerald",
    bar: "bg-zen-emerald",
  },
  amber: {
    bg: "bg-amber-400/10",
    text: "text-amber-400",
    glow: "shadow-zen-glow-amber",
    bar: "bg-amber-400",
  },
};

const StatsCard = ({
  title,
  value,
  suffix,
  subtitle,
  accent = "emerald",
  className = "",
}) => {
  const { isDark } = useTheme();
  const a = accentMap[accent] ?? accentMap.emerald;

  return (
    <div
      className={`
        zen-card p-5 flex flex-col gap-3 animate-slide-up
        ${className}
      `}
    >
      {/* Icon badge */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.bg}`}
      >
        <TrendingUp size={14} className={a.text} />
      </div>

      {/* Value */}
      <div>
        <div className="flex items-end gap-1.5 leading-none">
          <span
            className={`font-display text-3xl font-medium tabular-nums
            ${isDark ? "text-zinc-100" : "text-zinc-900"}`}
          >
            {value}
          </span>
          {suffix && (
            <span
              className={`text-sm mb-0.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              {suffix}
            </span>
          )}
        </div>
        <p
          className={`text-xs mt-1.5 font-medium ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
        >
          {title}
        </p>
      </div>

      {/* Subtitle */}
      {subtitle && <p className={`text-xs ${a.text}`}>{subtitle}</p>}
    </div>
  );
};

export default StatsCard;
