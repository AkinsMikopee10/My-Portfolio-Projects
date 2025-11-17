// Header.jsx
// A calm, glassmorphism header showing app title and today's date.
// Later: add a theme toggle icon (Lucide) on the right.

const Header = () => {
  // Format date in a friendly way
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="glass-card p-4 flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/30 border border-white/40 flex items-center justify-center">
          {/* Simple dot logo for now (unique minimal vibe) */}
          <div className="w-3 h-3 rounded-full bg-white/90" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">ZenSpace</h1>
      </div>

      {/* Right side: date + placeholder for theme toggle */}
      <div className="flex items-center gap-3">
        <p className="text-white/90">{today}</p>
        {/* Placeholder toggle (we’ll replace with Lucide icon later) */}
        <button
          aria-label="Toggle theme"
          className="hidden md:inline-flex items-center justify-center px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
          // TODO: hook up dark mode in stretch goals
          title="Theme"
        >
          ◐
        </button>
      </div>
    </header>
  );
};

export default Header;
