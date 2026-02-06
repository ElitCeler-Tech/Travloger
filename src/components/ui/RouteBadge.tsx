'use client';

import React, { useEffect, useRef, useState } from 'react';


export const RouteBadge = ({ route }: { route: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current && textRef.current) {
                // We use a temporary tolerance to avoid jitter
                setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
            }
        };

        // Check immediately and after a short delay to ensure fonts loaded/layout settled
        checkOverflow();
        const timer = setTimeout(checkOverflow, 100);

        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
            clearTimeout(timer);
        };
    }, [route]);

    return (
        <div className="mb-3 max-w-full">
            {/* Keyframes for the marquee animation */}
            <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div
                ref={containerRef}
                className="inline-block bg-gray-100 rounded-lg px-3 py-1.5 max-w-full overflow-hidden relative align-top"
            >
                {isOverflowing ? (
                    <div className="flex whitespace-nowrap animate-marquee w-fit">
                        <span
                            ref={textRef}
                            className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap block mr-8"
                        >
                            {route}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap block mr-8">
                            {route}
                        </span>
                    </div>
                ) : (
                    <div className="w-full">
                        <span
                            ref={textRef}
                            className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap block"
                        >
                            {route}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
