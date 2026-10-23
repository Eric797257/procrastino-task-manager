import { useCallback, useState } from 'react';
import TaskForm from './components/TaskForm';
import './App.css';
import TaskList from './components/TaskList';
import ConfirmModal from './components/ConfirmModal';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';
import Header from './components/Header';
import Toast from './components/Toast';
import { ADD_TASK_MESSAGES, pickRandom } from './messages';
import { useLocalStorage } from './hooks/useLocalStorage';

const defaultFilters = { search: '', status: 'all', category: 'all', sort: 'newest' };

function App() {
    const [tasks, setTasks] = useLocalStorage('procrastino-tasks', []);
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [filters, setFilters] = useState(defaultFilters);
    const [confirmingClear, setConfirmingClear] = useState(false);
    const [toast, setToast] = useState(null);
    // Stable reference so Toast's timer isn't restarted on every render
    const closeToast = useCallback(() => setToast(null), []);
    const completedCount = tasks.filter((task) => task.completed).length;

    // Derived from tasks + filters; never stored, so localStorage always keeps every task
    const search = filters.search.trim().toLowerCase();
    const visibleTasks = tasks
        .filter((task) => {
            if (filters.status === 'pending' && task.completed) return false;
            if (filters.status === 'completed' && !task.completed) return false;
            if (filters.category !== 'all' && task.category !== filters.category) return false;
            return task.title.toLowerCase().includes(search);
        })
        .sort((a, b) =>
            // YYYY-MM-DD and ISO strings sort correctly as plain text
            filters.sort === 'deadline'
                ? a.deadline.localeCompare(b.deadline)
                : b.createdAt.localeCompare(a.createdAt)
        );

    // ADD
    const addTask = (data) => {
        const newTask = {
            id: crypto.randomUUID(),
            ...data, // title, category, deadline
            completed: false,
            createdAt: new Date().toISOString(),
        }
        setTasks((prev) => [newTask, ...prev]);
        setToast((current) => pickRandom(ADD_TASK_MESSAGES, current));
    }

    // EDIT (save changes)
    const updateTask = (id, updates) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
        )
        setEditingTask(null);
    }

    // DELETE
    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        if (editingTask?.id === id) setEditingTask(null);
    }

    const requestDelete = (id) => {
        setTaskToDelete(tasks.find((task) => task.id === id) ?? null);
    }
    const confirmDelete = () => {
        deleteTask(taskToDelete.id);
        setTaskToDelete(null);
    }

    // CLEAR all completed tasks
    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed));
        // editingTask is a snapshot, so check the current task's completed flag
        if (tasks.find((task) => task.id === editingTask?.id)?.completed) setEditingTask(null);
        setConfirmingClear(false);
    }

    // COMPLETE / PENDING toggle
    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
        )
    }

    return (
        <div className="min-h-screen bg-[#f4f5fb] text-gray-800">
            <div className="mx-auto max-w-3xl p-4">
                <Header />

                <main>
                    <TaskForm
                        key={editingTask?.id ?? 'new'}
                        tasks={tasks}
                        onAdd={addTask}
                        onUpdate={updateTask}
                        editingTask={editingTask}
                        onCancelEdit={() => setEditingTask(null)}
                    />

                    {tasks.length > 0 && (
                        <>
                            <TaskStats tasks={tasks} onClearCompleted={() => setConfirmingClear(true)} />
                            <TaskFilters filters={filters} onChange={setFilters} />
                        </>
                    )}

                    <TaskList
                        tasks={visibleTasks}
                        hasAnyTasks={tasks.length > 0}
                        onClearFilters={() => setFilters(defaultFilters)}
                        onToggle={toggleTask}
                        onDelete={requestDelete}
                        onEdit={setEditingTask}
                    />

                    <ConfirmModal
                        open={taskToDelete !== null}
                        title="Delete this task?"
                        message={<>“<span className="font-medium">{taskToDelete?.title}</span>” will be gone forever.</>}
                        note="Deleting it won't make the deadline disappear"
                        onConfirm={confirmDelete}
                        onCancel={() => setTaskToDelete(null)}
                    />

                    <ConfirmModal
                        open={confirmingClear}
                        title="Clear completed tasks?"
                        message={`${completedCount} completed task${completedCount === 1 ? '' : 's'} will be gone forever.`}
                        note="Enjoy the rare feeling of accomplishment"
                        confirmLabel="Yes, clear them"
                        onConfirm={clearCompleted}
                        onCancel={() => setConfirmingClear(false)}
                    />

                    <Toast message={toast} onClose={closeToast} />
                </main>
            </div>
        </div>
    );
}

export default App;