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

export const EXCUSES = [
    'Mercury is in retrograde.',
    'I was waiting for the right vibe.',
    'My Wi-Fi was emotionally unavailable.',
    "I can't start until my desk is perfectly clean.",
    'I need a snack first. And then another snack.',
    'It is technically still "later".',
    'I work better under pressure. Way, way better.',
    "I'm letting the idea marinate.",
    'My cat sat on my keyboard. For three hours.',
    'I was researching how to be productive.',
    "It's not procrastination, it's strategic delay.",
    'The deadline is more of a suggestion.',
    'I had to reorganize my to-do list first.',
    'My horoscope said to avoid hard work today.',
    'I was about to start, then I looked at my phone.',
];

// Random item from the list, never the same as `current` (so clicking always changes it)
export function pickRandom(list, current) {
    const options = list.filter((item) => item !== current);
    return options[Math.floor(Math.random() * options.length)];
}
