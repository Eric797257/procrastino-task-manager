import { Trash2 } from 'lucide-react';
import { getTodayDate } from '../utils/date';

function getMessage(percent) {
    if (percent === 100) return 'All done?! Who are you and what did you do with the real you?';
    if (percent >= 50) return 'Over halfway. Dangerously close to being productive';
    if (percent > 0) return 'A start is a start. Barely, but still';
    return "Nothing done yet. Tomorrow, right?";
}

function TaskStats({ tasks, onClearCompleted }) {
    const today = getTodayDate();
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const overdue = tasks.filter((task) => !task.completed && task.deadline < today).length;
    const percent = Math.round((completed / total) * 100);

    return (
        <section className="mb-4 rounded-xl bg-white p-4 shadow-md" aria-label="Task progress">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                    {completed} of {total} done
                    {overdue > 0 && (
                        <span className="ml-2 text-sm font-normal text-red-600">· {overdue} overdue</span>
                    )}
                </p>
                {completed > 0 && (
                    <button
                        type="button"
                        onClick={onClearCompleted}
                        className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 hover:text-red-600"
                    >
                        <Trash2 size={14} /> Clear completed
                    </button>
                )}
            </div>

            <div
                className="h-2.5 overflow-hidden rounded-full bg-gray-200"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="h-full rounded-full bg-[#6c5ce7] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="mt-2 text-sm text-gray-500">{getMessage(percent)}</p>
        </section>
    );
}

export default TaskStats;
