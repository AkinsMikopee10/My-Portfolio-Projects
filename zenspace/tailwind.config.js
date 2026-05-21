/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // enables dark mode via class
  theme: {
    extend: {
      fontFamily: {
        // Rounded, modern look
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      // Soft, calm gradient tokens we’ll reuse
      colors: {
        zen: {
          // Dark mode base palette
          950: "#080c10",
          900: "#0d1117",
          850: "#111820",
          800: "#161d27",
          700: "#1e2a38",
          600: "#263345",

          // Light mode base palette
          50: "#f5f7f2",
          100: "#eaede6",
          200: "#d4daca",

          // Accent — emerald (calm, growth)
          emerald: "#10b981",
          emeraldDim: "#0d9e6e",
          emeraldGlow: "rgba(16, 185, 129, 0.15)",

          // Accent — amber (energy, warmth)
          amber: "#f59e0b",
          amberDim: "#d97706",
          amberGlow: "rgba(245, 158, 11, 0.15)",

          // Muted text
          muted: "#6b7a8d",
          mutedLight: "#9aa5b4",
        },
      },
      backgroundImage: {
        "zen-dark":
          "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.05) 0%, transparent 60%)",
        "zen-light":
          "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 60%)",
      },
      boxShadow: {
        "zen-card": "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "zen-card-light":
          "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        "zen-glow-emerald": "0 0 24px rgba(16,185,129,0.2)",
        "zen-glow-amber": "0 0 24px rgba(245,158,11,0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
