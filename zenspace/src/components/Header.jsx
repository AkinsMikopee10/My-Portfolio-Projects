import { useTheme } from "../App";
import { Sun, Moon, Bell, Search } from "lucide-react";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`
        sticky top-0 z-50 w-full px-6 py-3
        flex items-center justify-between gap-4
        border-b backdrop-blur-xl transition-colors duration-300
        ${
          isDark
            ? "bg-zen-900/80 border-zen-700/50"
            : "bg-white/80 border-zen-200/60"
        }
      `}
    >
      {/* ── Brand ── */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Logo mark */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-lg bg-zen-emerald/20 blur-sm" />
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-zen-emerald to-emerald-400 flex items-center justify-center shadow-zen-glow-emerald">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white"
            >
              <path
                d="M8 2C8 2 3 5 3 9C3 11.76 5.24 14 8 14C10.76 14 13 11.76 13 9C13 5 8 2 8 2Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M8 6C8 6 6 7.5 6 9.5C6 10.88 6.9 12 8 12"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="leading-none">
          <span
            className={`font-display text-lg font-medium tracking-tight ${
              isDark ? "text-zinc-100" : "text-zinc-900"
            }`}
          >
            Zen
            <span className="text-zen-emerald">Space</span>
          </span>
          <p
            className={`text-[10px] tracking-widest uppercase font-medium mt-0.5 ${
              isDark ? "text-zen-muted" : "text-zinc-400"
            }`}
          >
            Wellness · Focus
          </p>
        </div>
      </div>

      {/* ── Search bar (center) ── */}
      <div
        className={`
          hidden md:flex items-center gap-2 flex-1 max-w-sm mx-auto
          px-3 py-2 rounded-xl border text-sm transition-colors
          ${
            isDark
              ? "bg-zen-800/60 border-zen-700/50 text-zen-muted placeholder:text-zen-muted focus-within:border-zen-emerald/40"
              : "bg-zen-100/80 border-zen-200 text-zinc-500 placeholder:text-zinc-400 focus-within:border-zen-emerald/50"
          }
        `}
      >
        <Search
          size={14}
          className={isDark ? "text-zen-muted" : "text-zinc-400"}
        />
        <input
          type="text"
          placeholder="Search tasks, notes..."
          className="bg-transparent outline-none w-full text-sm"
        />
        <kbd
          className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border ${
            isDark
              ? "bg-zen-700/60 border-zen-600 text-zen-muted"
              : "bg-white border-zinc-200 text-zinc-400"
          }`}
        >
          ⌘K
        </kbd>
      </div>

      {/* ── Right controls ── */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`
            relative w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-200 group
            ${
              isDark
                ? "hover:bg-zen-700/60 text-zen-mutedLight hover:text-amber-400"
                : "hover:bg-zen-100 text-zinc-400 hover:text-amber-500"
            }
          `}
        >
          <div className="transition-transform duration-300 group-hover:rotate-12">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </div>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className={`
            relative w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-200
            ${
              isDark
                ? "hover:bg-zen-700/60 text-zen-mutedLight hover:text-zinc-100"
                : "hover:bg-zen-100 text-zinc-400 hover:text-zinc-700"
            }
          `}
        >
          <Bell size={16} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zen-emerald shadow-zen-glow-emerald" />
        </button>

        {/* Divider */}
        <div
          className={`w-px h-6 mx-1 ${isDark ? "bg-zen-700" : "bg-zen-200"}`}
        />

        {/* Avatar */}
        <button className="flex items-center gap-2 group">
          <div className="relative">
            <img
              src="/Profile-image.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-zen-emerald/50 transition-all duration-200"
            />
            {/* Online indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-zen-emerald border-2 border-zen-900" />
          </div>
          <div className="hidden sm:block text-left leading-none">
            <p
              className={`text-sm font-medium ${
                isDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              Michael
            </p>
            <p
              className={`text-[10px] mt-0.5 ${
                isDark ? "text-zen-muted" : "text-zinc-400"
              }`}
            >
              Pro Plan
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
