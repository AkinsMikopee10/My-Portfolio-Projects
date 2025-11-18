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
      className="bg-white rounded-xl shadow-sm p-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Daily Quote</h2>
      <p className="text-gray-600 italic">{quote}</p>
    </motion.section>
  );
};

export default QuoteCard;
