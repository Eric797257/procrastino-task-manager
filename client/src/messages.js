export const TAGLINES = [
    `The Ultimate "I'll Do It Tomorrow" Task Manager`,
    'Where deadlines come to be ignored',
    "Why do today what you can stress about tomorrow?",
    'Organizing your guilt since today',
    'Your tasks miss you. Probably.',
    'Productivity is a state of mind. So is denial.',
    'Making lists is basically doing the work, right?',
    'Proudly powered by last-minute panic',
    'Future you will handle it. Future you is tired.',
    'Step 1: Write the task. Step 2: Admire the task.',
];

export const ADD_TASK_MESSAGES = [
    'Task added. Now ignore it like the others.',
    'Great, another thing to feel guilty about.',
    'Added! That counts as being productive, right?',
    "Saved. We'll remind you... eventually. Maybe.",
    'Task created. Future you is already sighing.',
    'Nice! Writing it down is 90% of the work. Not really.',
    'Added to the pile. The pile is growing.',
    'Bold of you to think you will do this.',
    'Task saved. Time for a well-earned break.',
    'Another task? Look at you pretending to be busy.',
];

// Random item from the list, never the same as `current` (so repeats feel fresh)
export function pickRandom(list, current) {
    const options = list.filter((item) => item !== current);
    return options[Math.floor(Math.random() * options.length)];
}
