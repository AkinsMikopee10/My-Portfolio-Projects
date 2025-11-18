import { motion } from "framer-motion";

const EMOJIS = ["😊", "😐", "😞"];

const MoodTracker = () => {
  // Read from localStorage on first render
  const [mood, setMood] = useState(() => localStorage.getItem("mood") || "");

  // Persist whenever mood changes
  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  return (
    <motion.section
      className="glass-card p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* content */}
    </motion.section>
  );
};

export default MoodTracker;
