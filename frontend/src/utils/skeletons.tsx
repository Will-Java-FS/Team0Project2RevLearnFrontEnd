import React from 'react';

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`flex w-full md:w-52 flex-col gap-4 ${className}`}>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
}