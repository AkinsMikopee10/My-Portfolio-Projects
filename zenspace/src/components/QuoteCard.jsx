// QuoteCard.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const QuoteCard = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote("Take a deep breath and relax."));
  }, []);

  return (
    <motion.section
      className="glass-card p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-lg font-semibold mb-2">Daily Quote</h2>
      <p className="text-white/90 italic">{quote}</p>
    </motion.section>
  );
};

export default QuoteCard;
