import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, speed = 30, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const complete = displayedText.length >= text.length;

    useEffect(() => {
        if (!isInView) return undefined;

        let rafId = 0;
        let startTime = 0;
        let frameStart = 0;

        const animate = (timestamp) => {
            if (!startTime) {
                startTime = timestamp + delay;
            }
            if (timestamp < startTime) {
                rafId = requestAnimationFrame(animate);
                return;
            }

            if (!frameStart) {
                frameStart = timestamp;
            }

            const elapsed = timestamp - frameStart;
            const nextIndex = Math.min(text.length, Math.floor(elapsed / Math.max(speed, 1)));
            setDisplayedText(prev => {
                const prevLen = prev.length;
                if (nextIndex === prevLen) return prev;
                return text.slice(0, nextIndex);
            });

            if (nextIndex >= text.length) {
                return;
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, [isInView, text, speed, delay]);

    return (
        <div ref={ref} className={`typewriter-line ${className}`} style={{ position: 'relative' }}>
            {/* Hidden text establishes exact layout height/width to prevent scroll jank */}
            <span style={{ visibility: 'hidden' }}>{text}</span>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <span>{displayedText}</span>
                {!complete && isInView && <span className="cursor" />}
            </div>
        </div>
    );
};

export default React.memo(TypewriterText);
