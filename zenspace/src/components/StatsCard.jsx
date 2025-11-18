import { motion } from "framer-motion";

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-4"
    >
      <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center justify-center text-center">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default StatsCard;
