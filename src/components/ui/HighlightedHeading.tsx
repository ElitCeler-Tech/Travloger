import React from 'react';

interface HighlightedHeadingProps {
    text: string;
    highlightText?: string;
    className?: string;
}

export const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({ text, highlightText, className }) => {
    if (highlightText) {
        // Exact match
        if (text.includes(highlightText)) {
            const parts = text.split(highlightText);
            return (
                <span className={className}>
                    {parts[0]}<span className="text-[#134956]">{highlightText}</span>{parts[1] || ''}
                </span>
            );
        }
        // Partial match - highlight from first word of highlightText to end
        const firstWord = highlightText.split(' ')[0];
        if (firstWord && text.includes(firstWord)) {
            const idx = text.indexOf(firstWord);
            return (
                <span className={className}>
                    {text.slice(0, idx)}<span className="text-[#134956]">{text.slice(idx)}</span>
                </span>
            );
        }
    }

    if (text.includes('Explore ')) {
        const parts = text.split('Explore ');
        return (
            <span className={className}>
                {parts[0]}<span className="text-[#134956]">Explore {parts[1]}</span>
            </span>
        );
    }

    const words = text.split(' ');
    if (words.length > 2) {
        const lastWord = words.pop();
        return (
            <span className={className}>
                {words.join(' ')} <span className="text-[#134956]">{lastWord}</span>
            </span>
        );
    }

    return <span className={className}>{text}</span>;
};
