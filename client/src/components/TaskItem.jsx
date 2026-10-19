import { Check, RotateCcw, Pencil, Trash2, CalendarDays, } from 'lucide-react';
import { getTodayDate } from '../utils/date';

const actionBtn = 'cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const today = getTodayDate();
    const isOverdue = !task.completed && task.deadline < today;
    const isDueToday = !task.completed && task.deadline === today;

    return (
        <li
            className={`flex flex-col items-start justify-between gap-4 rounded-xl border-l-4 bg-white p-4 shadow-md sm:flex-row sm:items-center ${
                isOverdue ? 'border-red-500' : isDueToday ? 'border-amber-400' : 'border-transparent'
            }`}
        >
            <div>
                <h3
                    className={`mb-1.5 font-semibold ${task.completed ? 'line-through opacity-50' : ''
                        }`}
                >
                    {task.title}
                </h3>
                <p className="flex flex-wrap gap-2.5 text-sm">
                    <span className="rounded-full bg-[#ece9ff] px-2 text-[#6c5ce7]">
                        {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <CalendarDays size={16} />
                        {task.deadline}
                    </span>
                    <span>{task.completed ? '✅ Completed' : '⏳ Pending'}</span>
                    {isOverdue && (
                        <span className="rounded-full bg-red-100 px-2 text-red-700">
                            ⚠️ Overdue — classic you
                        </span>
                    )}
                    {isDueToday && (
                        <span className="rounded-full bg-amber-100 px-2 text-amber-700">
                            🔥 Due today. No more excuses
                        </span>
                    )}
                </p>
            </div>

            <div className="flex gap-1.5">
                <button onClick={() => onToggle(task.id)} title="Toggle complete" className={actionBtn}>
                    {task.completed ? <RotateCcw size={18} /> : <Check size={18} />}
                </button>
                <button onClick={() => onEdit(task)} title="Edit" className={actionBtn}>
                    <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(task.id)} title="Delete" className={actionBtn}>
                    <Trash2 size={18} />
                </button>
            </div>
        </li>
    );
}

export default TaskItem;