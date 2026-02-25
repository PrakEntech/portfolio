import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Prevent body scroll when the full-screen menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const radius = 130; // Radius of the circular orbit

    return (
        <div className="mobile-nav">
            <button
                onClick={toggleMenu}
                className="mobile-nav-btn"
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'var(--terminal-bg)',
                    border: `1px solid ${isOpen ? 'var(--accent-green)' : 'var(--border-color)'}`,
                    color: isOpen ? 'var(--accent-green)' : 'var(--text-color)',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    boxShadow: isOpen ? '0 0 15px rgba(34, 211, 238, 0.2)' : 'none',
                    transition: 'all 0.3s ease',
                    zIndex: 1001,
                    position: 'relative'
                }}
            >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
                SECTIONS
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(8, 12, 16, 0.85)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            willChange: 'opacity'
                        }}
                        onClick={toggleMenu}
                    >
                        {/* The Omni-Ring Container */}
                        <div style={{ position: 'relative', width: '2px', height: '2px' }}>

                            {/* Central Core */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                style={{
                                    position: 'absolute',
                                    top: '-40px', left: '-40px',
                                    width: '80px', height: '80px',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(12,18,24,0.95) 80%)',
                                    border: '2px solid var(--accent-green)',
                                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent-green)'
                                }}
                            >
                                <Cpu size={32} />
                            </motion.div>

                            {/* Glowing Ring Path */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    position: 'absolute',
                                    top: -radius, left: -radius,
                                    width: radius * 2, height: radius * 2,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(34, 211, 238, 0.15)',
                                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.1) inset, 0 0 20px rgba(34, 211, 238, 0.1)',
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Orbiting Section Options */}
                            {SECTIONS.map((section, idx) => {
                                // 0 degrees is 3 o'clock. We want 12 o'clock, which is -90 degrees.
                                const targetAngle = -90 + (idx * (360 / SECTIONS.length));

                                return (
                                    <motion.div
                                        key={section}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: targetAngle, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: idx * 0.05,
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 20
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: -radius, left: -radius,
                                            width: radius * 2, height: radius * 2,
                                            pointerEvents: 'none',
                                            willChange: 'transform, opacity'
                                        }}
                                    >
                                        <motion.a
                                            href={`#${section}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpen(false);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '50%', right: 0,
                                                marginTop: '-20px', marginRight: '-45px', // Center the 90x40 element on the arc
                                                width: '90px', height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(12, 18, 24, 0.95)',
                                                border: '1px solid var(--accent-green)',
                                                color: 'var(--accent-green)',
                                                textDecoration: 'none',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)',
                                                fontFamily: "'Fira Code', monospace",
                                                pointerEvents: 'auto',
                                                willChange: 'transform'
                                            }}
                                            initial={{ rotate: 90 }} // counter-rotate initial -90
                                            animate={{ rotate: -targetAngle }}
                                            exit={{ rotate: 90 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: idx * 0.05,
                                                type: "spring",
                                                stiffness: 120,
                                                damping: 20
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                background: 'rgba(34, 211, 238, 0.1)',
                                                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                                            }}
                                        >
                                            {section}
                                        </motion.a>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
