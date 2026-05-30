import React from 'react';

interface HighlightedHeadingProps {
    text: string;
    highlightText?: string;
    className?: string;
}

const brushStyle = {backgroundImage: 'url(/brush-underline.svg)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'} as React.CSSProperties;

const HighlightSpan: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative text-[#134956]">
        {children}
        <span className="absolute left-0 right-0 -bottom-2 h-[18px] w-full" style={brushStyle} />
    </span>
);

const clean = (s: string) => s.replace(/[?!.,]/g, '').trim();

export const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({ text, highlightText, className }) => {
    if (highlightText) {
        const cleanHL = clean(highlightText);
        const idx = clean(text).indexOf(cleanHL);
        if (idx !== -1) {
            let origStart = 0, count = 0;
            for (let i = 0; i < text.length && count < idx; i++) {
                if (!/[?!.,]/.test(text[i])) count++;
                origStart = i + 1;
            }
            let origEnd = origStart, matched = 0;
            for (let i = origStart; i < text.length && matched < cleanHL.length; i++) {
                if (!/[?!.,]/.test(text[i])) matched++;
                origEnd = i + 1;
            }
            return (
                <span className={className}>
                    {text.slice(0, origStart)}<HighlightSpan>{text.slice(origStart, origEnd)}</HighlightSpan>{text.slice(origEnd)}
                </span>
            );
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

    return <span className={className}>{text}</span>;
};
