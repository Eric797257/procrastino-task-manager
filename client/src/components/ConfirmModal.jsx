import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';

function ConfirmModal({ task, onConfirm, onCancel }) {
    // Close with the Escape key
    useEffect(() => {
        if (!task) return;
        const handleKey = (e) => e.key === 'Escape' && onCancel();
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [task, onCancel]);

    if (!task) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-3 flex items-center gap-2 text-red-600">
                    <Trash2 size={22} />
                    <h2 className="text-lg font-semibold">Delete this task?</h2>
                </div>

                <p className="mb-1 text-gray-700">
                    “<span className="font-medium">{task.title}</span>” will be gone forever.
                </p>
                <p className="mb-5 text-sm text-gray-500">
                    Deleting it won't make the deadline disappear 😏
                </p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;