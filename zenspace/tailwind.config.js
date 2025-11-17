/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Rounded, modern look
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      // Soft, calm gradient tokens we’ll reuse
      colors: {
        indigoGlass: "rgba(99, 102, 241, 0.25)", // indigo-500 glass
        whiteGlass: "rgba(255, 255, 255, 0.25)",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
