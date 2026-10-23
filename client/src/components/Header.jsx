import { useState } from 'react';
import { TAGLINES, pickRandom } from '../messages';

function Header() {
    // Picked once per page load
    const [tagline] = useState(() => pickRandom(TAGLINES));

    return (
        <header className="mb-4 text-center">
            <h1 className="text-3xl font-bold">Procrastino 😂</h1>
            <p className="text-gray-600">{tagline}</p>
        </header>
    );
}

export default Header;
