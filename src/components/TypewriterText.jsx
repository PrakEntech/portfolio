import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const TypewriterText = ({ text, delay = 0, speed = 30, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [complete, setComplete] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            let timeout;
            let currentIndex = 0;

            const type = () => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                    timeout = setTimeout(type, speed);
                } else {
                    setComplete(true);
                }
            };

            const startTimeout = setTimeout(type, delay);
            return () => {
                clearTimeout(startTimeout);
                clearTimeout(timeout);
            };
        }
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

export default TypewriterText;
