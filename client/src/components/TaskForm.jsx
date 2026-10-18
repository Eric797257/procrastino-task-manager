import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';

const CATEGORIES = ['Assignment', 'Study', 'Personal', 'Other'];
const emptyForm = { title: '', category: 'Assignment', deadline: '' };

const inputClass =
    'w-full rounded-lg border border-gray-300 p-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]';

const labelClass = "text-sm font-medium text-gray-400";

const btnClass =
    'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2.5 hover:bg-gray-50';
const btnPrimaryClass =
    'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[-#6c5ce7] bg-[#6c5ce7] px-4 py-2.5 text-white hover:bg-[#5b4bd6]';

function TaskForm({ tasks, onAdd, onUpdate, editingTask, onCancelEdit }) {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    // When the user clicks "edit", fill the form with that task
    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title,
                category: editingTask.category,
                deadline: editingTask.deadline,
            })
        } else {
            setForm(emptyForm)
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) return setError('Task title is required 😤');
        if (!form.deadline) return setError('Pick a deadline (yes, even you)');

        if (form.deadline < getTodayDate()) {
            return setError("Deadline can't be earlier than today!");
        }
        const title = form.title.trim();
        const isDuplicate = tasks.some(
            (task) =>
                task.title.toLowerCase() === title.toLowerCase() &&
                task.id !== editingTask?.id
        );
        if (isDuplicate) return setError('You already have this task. Procrastinating twice? 😏');

        const data = { ...form, title };

        if (editingTask) {
            onUpdate(editingTask.id, data);
        } else {
            onAdd(data)
        }
        setForm(emptyForm);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md">
            <h2 className="text-xl font-semibold">
                {editingTask ? 'Edit Task ✏️' : 'Add a Task'}
            </h2>

            <label htmlFor="title" className={labelClass}>
                Task Title
            </label>

            <input
                type="text"
                name="title"
                placeholder="What are you avoiding today?"
                value={form.title}
                onChange={handleChange}
                className={inputClass}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="title" className={labelClass}>
                        Task Title
                    </label>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={`${inputClass} sm:flex-1`}
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                    <label htmlFor="deadline" className={labelClass}>
                        Deadline
                    </label>

                    <input
                        id="deadline"
                        type="date"
                        name="deadline"
                        min={getTodayDate()}
                        value={form.deadline}
                        onChange={handleChange}
                        className={`${inputClass} sm:flex-1`}
                    />
                </div>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <div className="flex gap-2">
                <button type="submit" className={btnPrimaryClass}>
                    {editingTask ? <Save size={16} /> : <Plus size={16} />}
                    {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
                {editingTask && (
                    <button type="button" className={btnClass} onClick={onCancelEdit}>
                        <X size={16} /> Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;