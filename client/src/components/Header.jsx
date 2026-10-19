import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { TAGLINES, pickRandom } from '../messages';

function Header() {
    const [tagline, setTagline] = useState(() => pickRandom(TAGLINES));

    return (
        <header className="mb-4 text-center">
            <h1 className="text-3xl font-bold">Procrastino 😂</h1>
            <p className="inline-flex items-center gap-1.5 text-gray-600">
                {tagline}
                <button
                    type="button"
                    onClick={() => setTagline(pickRandom(TAGLINES, tagline))}
                    title="Another one"
                    aria-label="Show another tagline"
                    className="cursor-pointer rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-[#6c5ce7]"
                >
                    <Shuffle size={14} />
                </button>
            </p>
        </header>
    );
}

export default Header;
