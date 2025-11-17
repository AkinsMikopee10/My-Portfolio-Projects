import Header from "./components/Header";
import MoodTracker from "./components/MoodTracker";
import BreathingTimer from "./components/BreathingTimer";
import QuoteCard from "./components/QuoteCard";
import ReflectionCard from "./components/ReflectionCard";

const App = () => {
  return (
    <div>
      <div>
        {/* Page shell with max width for a dashboard feel */}
        <Header />

        {/* Top grid: mood, breathing, quotes */}
        <main>
          <MoodTracker />
          <BreathingTimer />
          <QuoteCard />
        </main>

        {/* Reflection area spans full width */}
        <div className="mt-6">
          <ReflectionCard />
        </div>
      </div>
    </div>
  );
};

export default App;
