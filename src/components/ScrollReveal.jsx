import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal
 * Wraps any content. On scroll into view:
 *  1. The border of the box draws in from left → right (CSS clip-path animation)
 *  2. Children fade + slide up into view
 *
 * Props:
 *  delay  – ms before animation starts (default 0)
 *  className – extra class on wrapper
 */
const ScrollReveal = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`scroll-reveal ${visible ? 'scroll-reveal--visible' : ''} ${className}`}
            style={{ '--sr-delay': `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
