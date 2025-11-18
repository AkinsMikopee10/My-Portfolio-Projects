const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg mb-2 shadow-sm">
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
  );
};

export default TaskItem;
