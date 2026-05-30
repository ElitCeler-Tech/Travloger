import React from 'react';

interface HighlightedHeadingProps {
    text: string;
    highlightText?: string;
    className?: string;
}

const HighlightSpan: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative text-[#134956]">
        {children}
        <span className="absolute left-0 right-0 -bottom-1 h-[10px] w-full" style={{ backgroundImage: 'url(/brush-underline.svg)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} />
    </span>
);

export const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({ text, highlightText, className }) => {
    if (highlightText) {
        // Exact match
        if (text.includes(highlightText)) {
            const parts = text.split(highlightText);
            return (
                <span className={className}>
                    {parts[0]}<HighlightSpan>{highlightText}</HighlightSpan>{parts[1] || ''}
                </span>
            );
        }
        // Partial match - find last significant word from highlightText in the heading
        const words = highlightText.replace(/[?!.]/, '').split(' ').filter(w => w.length > 2);
        for (let i = words.length - 1; i >= 0; i--) {
            if (text.includes(words[i])) {
                const idx = text.indexOf(words[i]);
                return (
                    <span className={className}>
                        {text.slice(0, idx)}<HighlightSpan>{text.slice(idx)}</HighlightSpan>
                    </span>
                );
            }
        }
    }

    if (text.includes('Explore ')) {
        const parts = text.split('Explore ');
        return (
            <span className={className}>
                {parts[0]}<HighlightSpan>Explore {parts[1]}</HighlightSpan>
            </span>
        );
    }

    const words = text.split(' ');
    if (words.length > 2) {
        const lastWord = words.pop();
        return (
            <span className={className}>
                {words.join(' ')} <HighlightSpan>{lastWord}</HighlightSpan>
            </span>
        );
    }

    return <span className={className}>{text}</span>;
};
