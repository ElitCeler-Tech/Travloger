import React from 'react';

interface HighlightedHeadingProps {
    text: string;
    className?: string; // Allow passing extra classes if needed
}

export const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({ text, className }) => {
    // If the text contains "Explore", highlight everything after it
    if (text.includes('Explore ')) {
        const parts = text.split('Explore ');
        return (
            <span className={className}>
                {parts[0]}Explore <span className="text-[#134956]">{parts[1]}</span>
            </span>
        );
    }

    // Basic fallback: highlight the last word if it looks like a destination heading
    // and has enough words (to avoid highlighting in very short phrases inappropriately)
    const words = text.split(' ');
    if (words.length > 2) { // Changed to > 2 (e.g. "Best of Ladakh")
        const lastWord = words.pop();
        return (
            <span className={className}>
                {words.join(' ')} <span className="text-[#134956]">{lastWord}</span>
            </span>
        );
    }

    // Return plain text if no pattern matches
    return <span className={className}>{text}</span>;
};
