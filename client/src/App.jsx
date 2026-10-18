import { useState } from 'react';
import TaskForm from './components/TaskForm';
import './App.css';
import TaskList from './components/TaskList';
import ConfirmModal from './components/ConfirmModal';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
    const [tasks, setTasks] = useLocalStorage('procrastino-tasks', []);
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // ADD
    const addTask = (data) => {
        const newTask = {
            id: crypto.randomUUID(),
            ...data, // title, category, deadline
            completed: false,
            createdAt: new Date().toISOString(),
        }
        setTasks((prev) => [newTask, ...prev]);
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

    // COMPLETE / PENDING toggle
    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)
        )
    }

    return (
        <div className="min-h-screen bg-[#f4f5fb] text-gray-800">
            <div className="mx-auto max-w-3xl p-4">
                <header className="mb-4 text-center">
                    <h1 className="text-3xl font-bold">Procrastino 😂</h1>
                    <p className="text-gray-600">
                        The Ultimate "I'll Do It Tomorrow" Task Manager
                    </p>
                </header>

                <main>
                    <TaskForm
                        tasks={tasks}
                        onAdd={addTask}
                        onUpdate={updateTask}
                        editingTask={editingTask}
                        onCancelEdit={() => setEditingTask(null)}
                    />

                    <TaskList
                        tasks={tasks}
                        onToggle={toggleTask}
                        onDelete={requestDelete}
                        onEdit={setEditingTask}
                    />

                    <ConfirmModal
                        task={taskToDelete}
                        onConfirm={confirmDelete}
                        onCancel={() => setTaskToDelete(null)}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;