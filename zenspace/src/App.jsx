import { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardGrid from "./components/DashboardGrid";

// ─── Dark Mode Context ───────────────────────────────────────────────────────
export const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

// ─── App ─────────────────────────────────────────────────────────────────────
const App = () => {
  // Default to dark mode; persist preference in localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("zenspace-theme");
    return saved ? saved === "dark" : true;
  });

  // Sync <html> class so Tailwind dark: variants + index.css light overrides work
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("zenspace-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`
          min-h-screen flex flex-col
          ${isDark ? "bg-zen-900 text-zinc-100" : "bg-zen-50 text-zinc-900"}
          transition-colors duration-300
        `}
      >
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <DashboardGrid />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
