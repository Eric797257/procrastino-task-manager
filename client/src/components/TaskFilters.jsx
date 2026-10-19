import { Search } from 'lucide-react';
import { CATEGORIES } from '../constants';

const STATUSES = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
];

const inputClass =
    'rounded-lg border border-gray-300 bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]';

function TaskFilters({ filters, onChange }) {
    const update = (field, value) => onChange({ ...filters, [field]: value });

    return (
        <div className="mb-4 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md">
            <div className="relative">
                <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                <input
                    type="search"
                    aria-label="Search tasks"
                    placeholder="Search tasks you're ignoring..."
                    value={filters.search}
                    onChange={(e) => update('search', e.target.value)}
                    className={`${inputClass} w-full pl-9`}
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-1 rounded-lg bg-gray-100 p-1" role="group" aria-label="Filter by status">
                    {STATUSES.map((s) => (
                        <button
                            key={s.value}
                            type="button"
                            aria-pressed={filters.status === s.value}
                            onClick={() => update('status', s.value)}
                            className={`flex-1 cursor-pointer rounded-md px-3 py-1.5 text-sm ${
                                filters.status === s.value
                                    ? 'bg-[#6c5ce7] text-white'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <select
                    aria-label="Filter by category"
                    value={filters.category}
                    onChange={(e) => update('category', e.target.value)}
                    className={inputClass}
                >
                    <option value="all">All categories</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default TaskFilters;
