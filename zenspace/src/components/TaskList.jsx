import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useTheme } from "../App";
import { Plus, ClipboardList } from "lucide-react";

const TaskList = ({ setCompletedTasks }) => {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("zenspace-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("zenspace-tasks", JSON.stringify(tasks));
    if (setCompletedTasks) {
      setCompletedTasks(tasks.filter((t) => t.completed).length);
    }
  }, [tasks, setCompletedTasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      { id: Date.now(), text: input.trim(), completed: false },
      ...tasks,
    ]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const pending = tasks.filter((t) => !t.completed).length;
  const done = tasks.filter((t) => t.completed).length;

  return (
    <div
      className={`
        zen-card p-5 flex flex-col gap-4 animate-slide-up
        ${isDark ? "" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList size={16} className="text-zen-emerald" />
          <h2 className={`zen-heading text-base`}>Today's Tasks</h2>
        </div>
        <div className="flex items-center gap-2">
          {pending > 0 && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${isDark ? "bg-zen-700/60 text-zen-mutedLight" : "bg-zen-100 text-zinc-500"}`}
            >
              {pending} left
            </span>
          )}
          {done > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-zen-emerald/15 text-zen-emerald">
              {done} done
            </span>
          )}
        </div>
      </div>

      {/* Input */}
      <div
        className={`flex gap-2 p-1 rounded-xl border transition-colors
        ${
          isDark
            ? "bg-zen-850/60 border-zen-700/50 focus-within:border-zen-emerald/40"
            : "bg-zen-50 border-zen-200 focus-within:border-zen-emerald/50"
        }`}
      >
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className={`flex-1 bg-transparent px-3 py-2 text-sm outline-none
            ${isDark ? "text-zinc-100 placeholder:text-zen-muted" : "text-zinc-800 placeholder:text-zinc-400"}`}
        />
        <button
          onClick={addTask}
          disabled={!input.trim()}
          className="zen-btn-primary flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-0.5">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center
              ${isDark ? "bg-zen-700/40" : "bg-zen-100"}`}
            >
              <ClipboardList size={18} className="text-zen-muted" />
            </div>
            <p
              className={`text-sm ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
            >
              No tasks yet — add one above
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div>
          <div
            className={`h-1 rounded-full overflow-hidden ${isDark ? "bg-zen-700" : "bg-zen-100"}`}
          >
            <div
              className="h-full rounded-full bg-zen-emerald transition-all duration-700"
              style={{
                width: `${tasks.length ? (done / tasks.length) * 100 : 0}%`,
              }}
            />
          </div>
          <p
            className={`text-xs mt-1.5 ${isDark ? "text-zen-muted" : "text-zinc-400"}`}
          >
            {done} of {tasks.length} tasks complete
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
