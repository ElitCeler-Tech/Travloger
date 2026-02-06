'use client';

import React from 'react';

export const RouteBadge = ({ route }: { route: string }) => {
    return (
        <div className="mb-3 max-w-full">
            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            <div className="inline-block bg-gray-100 rounded-lg px-3 py-1.5 max-w-full overflow-hidden align-top">
                <div className="w-full overflow-x-auto no-scrollbar whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block">
                        {route.replace(/(\s+-\s+|\s*->\s*|\s*>\s*)/g, ' → ')}
                    </span>
                </div>
            </div>
        </div>
    );
};
