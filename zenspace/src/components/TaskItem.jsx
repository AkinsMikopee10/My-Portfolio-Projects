import { motion } from "framer-motion";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl mb-2 transition-shadow duration-300">
        <div
          onClick={() => onToggle(task.id)}
          className={`flex items-center gap-2 cursor-pointer ${
            task.completed ? "opacity-60 line-through" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="accent-indigo-500"
          />
          <span className="text-gray-700">{task.text}</span>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
