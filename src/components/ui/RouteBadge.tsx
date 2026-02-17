'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const RouteBadge = ({ route }: { route: string }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const [showLeftBlur, setShowLeftBlur] = React.useState(false);
    const [showRightBlur, setShowRightBlur] = React.useState(false);

    const handleScroll = React.useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftBlur(scrollLeft > 10);
        setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    React.useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            handleScroll();
            el.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);
            return () => {
                el.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleScroll);
            };
        }
    }, [handleScroll, route]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="mb-3 max-w-full group/route">
            <div className="inline-flex items-center bg-gray-100 rounded-lg px-3 py-1.5 max-w-full overflow-hidden align-top relative">
                {/* Left Fade Hint */}
                <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent z-10 transition-opacity duration-300 pointer-events-none ${showLeftBlur ? 'opacity-100' : 'opacity-0'}`} />

                <div
                    ref={scrollRef}
                    className={cn(
                        "w-full overflow-x-auto whitespace-nowrap cursor-grab active:cursor-grabbing select-none",
                        "scrollbar-hide"
                    )}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block px-4">
                        {route.replace(/(\s+-\s+|\s*->\s*|\s*>\s*)/g, ' → ')}
                    </span>
                </div>

                {/* Right Fade Hint */}
                <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent z-10 transition-opacity duration-300 pointer-events-none ${showRightBlur ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Scroll Hint for Desktop Users without Horizontal Wheel */}
            <div className="mt-1 opacity-0 group-hover/route:opacity-100 transition-opacity duration-300 hidden sm:block">
                <p className="text-[10px] text-gray-400 font-medium">Drag to scroll route →</p>
            </div>
        </div>
    );
};
