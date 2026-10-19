import { useEffect } from 'react';

// Small popup at the bottom of the screen that hides itself after a few seconds
function Toast({ message, onClose, duration = 3000 }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, onClose, duration]);

    if (!message) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            onClick={onClose}
            className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 cursor-pointer rounded-xl bg-[#6c5ce7] px-4 py-3 text-center text-white shadow-lg"
        >
            {message}
        </div>
    );
}

export default Toast;
