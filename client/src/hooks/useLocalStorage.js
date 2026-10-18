import { useEffect, useState } from 'react';

function load(key, fallback) {
    try {
        const saved = localStorage.getItem(key);

        if (saved === null) return fallback;

        const parsed = JSON.parse(saved);
        // Ignore bad saved data (e.g. "null" or an old format) so a list never crashes
        if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;
        return parsed;
    } catch {
        return fallback;
    }
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => load(key, initialValue));

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or blocked (e.g. private mode) — the app still works in memory.
        }
    }, [key, value]);

    return [value, setValue];
}
