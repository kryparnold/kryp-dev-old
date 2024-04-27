"use client";

import clsx from "clsx";
import { ClassValue } from "clsx";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tw-merge";

interface TypeWriterProps extends React.ComponentProps<'div'> {
    text: string;
    duration: number;
    onWritingEnd: () => any;
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function TypeWriter({ text, duration, onWritingEnd, className, ...props }: TypeWriterProps) {
    const displayRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!displayRef.current || !trackerRef.current) return;

        const durationMs = duration * 1000;

        for (let i = 0; i < text.length; i++) {
            const charSpeed = (durationMs / text.length) * (i + 1);

            setTimeout(() => {
                if (!displayRef.current) return;

                if (i === 0) {
                    displayRef.current.innerText = text[i];
                } else {
                    displayRef.current.innerText += text[i];
                }

            }, charSpeed);
        }

        setTimeout(() => {
            if (!trackerRef.current) return;

            trackerRef.current.style.opacity = "0";
        }, durationMs + 1600)

        setTimeout(() => {
            onWritingEnd();
        }, duration * 1000);
    }, [text, duration])

    return (
        <div className={cn("whitespace-pre-wrap flex relative w-min", className)} {...props}>
            <div ref={displayRef}>
                {" "}
            </div>
            <div ref={trackerRef} className="animate-blink flex items-center transition-opacity absolute -right-8">
                |
            </div>
        </div>
    );
}