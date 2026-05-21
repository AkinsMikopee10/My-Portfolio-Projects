import { useState } from "react";
import { useTheme } from "../App";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart2,
  Wind,
  Smile,
  BookOpen,
  Quote,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { label: "Tasks", icon: CheckSquare, id: "tasks" },
      { label: "Focus Timer", icon: Timer, id: "focus" },
      { label: "Stats", icon: BarChart2, id: "stats" },
    ],
  },
  {
    section: "Wellness",
    items: [
      { label: "Breathing", icon: Wind, id: "breathing" },
      { label: "Mood Tracker", icon: Smile, id: "mood" },
      { label: "Reflection", icon: BookOpen, id: "reflection" },
      { label: "Daily Quote", icon: Quote, id: "quote" },
    ],
  },
];

const Sidebar = () => {
  const { isDark } = useTheme();
  const [active, setActive] = useState("dashboard");

  return (
    <aside
      className={`
        hidden md:flex flex-col w-56 shrink-0
        border-r transition-colors duration-300
        ${
          isDark
            ? "bg-zen-900/60 border-zen-700/50"
            : "bg-white/70 border-zen-200/60"
        }
      `}
    >
      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.section}>
            {/* Section label */}
            <p className={`zen-label px-2 mb-2`}>{group.section}</p>

            <ul className="space-y-0.5">
              {group.items.map(({ label, icon: Icon, id }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => setActive(id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        text-sm font-medium transition-all duration-150 group relative
                        ${
                          isActive
                            ? isDark
                              ? "bg-zen-emerald/15 text-zen-emerald"
                              : "bg-zen-emerald/10 text-zen-emeraldDim"
                            : isDark
                              ? "text-zen-mutedLight hover:bg-zen-700/40 hover:text-zinc-100"
                              : "text-zinc-500 hover:bg-zen-100 hover:text-zinc-800"
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-zen-emerald" />
                      )}

                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive ? "text-zen-emerald" : ""
                        }`}
                      />
                      <span className="flex-1 text-left">{label}</span>

                      {isActive && (
                        <ChevronRight
                          size={12}
                          className="text-zen-emerald opacity-60"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom: Today's Progress ── */}
      <div
        className={`
          mx-3 mb-4 p-4 rounded-2xl border transition-colors duration-300
          ${
            isDark
              ? "bg-zen-800/60 border-zen-700/40"
              : "bg-zen-50 border-zen-200/60"
          }
        `}
      >
        <p className="zen-label mb-3">Today's Focus</p>

        {/* Circular progress ring */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="87.96"
                strokeDashoffset="52.78" /* ~40% */
                className="transition-all duration-700"
              />
            </svg>
            <span
              className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold ${
                isDark ? "text-zinc-100" : "text-zinc-800"
              }`}
            >
              40%
            </span>
          </div>

          <div>
            <p
              className={`text-sm font-medium leading-tight ${
                isDark ? "text-zinc-200" : "text-zinc-700"
              }`}
            >
              2 of 5 tasks
            </p>
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              Keep going!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
