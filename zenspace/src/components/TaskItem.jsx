import { useTheme } from "../App";
import { Trash2, Check } from "lucide-react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        group flex items-center gap-3 px-3 py-2.5 rounded-xl border
        transition-all duration-200 animate-slide-up
        ${
          isDark
            ? `border-zen-700/40 hover:border-zen-700
             ${task.completed ? "bg-zen-800/30" : "bg-zen-800/50 hover:bg-zen-800/80"}`
            : `border-zen-200/80 hover:border-zen-200
             ${task.completed ? "bg-zen-50/60" : "bg-white hover:bg-zen-50"}`
        }
      `}
    >
      {/* Custom checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`
          shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center
          transition-all duration-200
          ${
            task.completed
              ? "bg-zen-emerald border-zen-emerald"
              : isDark
                ? "border-zen-600 hover:border-zen-emerald"
                : "border-zinc-300 hover:border-zen-emerald"
          }
        `}
      >
        {task.completed && (
          <Check size={11} strokeWidth={3} className="text-white" />
        )}
      </button>

      {/* Task text */}
      <span
        className={`
          flex-1 text-sm leading-snug transition-all duration-200 cursor-pointer select-none
          ${
            task.completed
              ? isDark
                ? "line-through text-zen-muted"
                : "line-through text-zinc-400"
              : isDark
                ? "text-zinc-200"
                : "text-zinc-700"
          }
        `}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>

      {/* Delete button — visible on hover */}
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className={`
          shrink-0 w-7 h-7 rounded-lg flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-all duration-150
          ${
            isDark
              ? "text-zen-muted hover:text-rose-400 hover:bg-rose-400/10"
              : "text-zinc-300 hover:text-rose-500 hover:bg-rose-50"
          }
        `}
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
};

export default TaskItem;
