import { useState } from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import { EXCUSES, pickRandom } from '../messages';

function ExcuseGenerator() {
    const [excuse, setExcuse] = useState(null);

    return (
        <section className="mb-6 flex flex-col items-center gap-3 rounded-xl bg-white p-4 text-center shadow-md sm:flex-row sm:text-left">
            <button
                type="button"
                onClick={() => setExcuse(pickRandom(EXCUSES, excuse))}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-[#ece9ff] px-4 py-2.5 font-medium text-[#6c5ce7] hover:bg-[#ddd8ff]"
            >
                <MessageCircleQuestion size={16} />
                {excuse ? 'Another excuse' : 'Give me an excuse'}
            </button>
            <p className="text-gray-600 italic" aria-live="polite">
                {excuse ? `"${excuse}"` : "Need a reason not to do your tasks? We've got plenty."}
            </p>
        </section>
    );
}

export default ExcuseGenerator;
