import Header from "./components/Header";
import MoodTracker from "./components/MoodTracker";
import BreathingTimer from "./components/BreathingTimer";
import QuoteCard from "./components/QuoteCard";
import ReflectionCard from "./components/ReflectionCard";

const App = () => {
  return (
    <div>
      <div>
        <Header />
        <main>
          <MoodTracker />
          <BreathingTimer />
          <QuoteCard />
        </main>
        <div className="mt-6">
          <ReflectionCard />
        </div>
      </div>
    </div>
  );
};

export default App;
