import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const radius = 140; // Orbital radius in pixels

    return (
        <div className="mobile-nav" style={{ position: 'relative', zIndex: 1000 }}>
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
                    transition: 'all 0.3s ease'
                }}
            >
                {isOpen ? <X size={16} /> : <Cpu size={16} />}
                SECTIONS
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div style={{ position: 'absolute', top: '100%', right: '50%', pointerEvents: 'none' }}>
                        {SECTIONS.map((section, idx) => {
                            // Calculate quarter-circle arc from 90 (bottom) to 180 (left)
                            const angle = 90 + (idx * (90 / (SECTIONS.length - 1)));
                            const rad = angle * (Math.PI / 180);

                            // Center of origin is roughly bottom-center of the button
                            const targetX = radius * Math.cos(rad);
                            const targetY = radius * Math.sin(rad) + 10; // slightly pushed down

                            return (
                                <motion.a
                                    key={section}
                                    href={`#${section}`}
                                    onClick={() => setIsOpen(false)}
                                    // Pointer events must be re-enabled on the links themselves
                                    style={{
                                        pointerEvents: 'auto',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        // Center the links on the calculated (x, y) point
                                        marginTop: '-18px',
                                        marginLeft: '-45px',
                                        width: '90px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(12, 18, 24, 0.95)',
                                        border: '1px solid var(--accent-blue)',
                                        color: 'var(--accent-blue)',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 0 10px rgba(96, 165, 250, 0.15)',
                                        backdropFilter: 'blur(5px)',
                                        fontFamily: "'Fira Code', monospace"
                                    }}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                                    animate={{ opacity: 1, x: targetX, y: targetY, scale: 1 }}
                                    exit={{ opacity: 0, x: 0, y: 0, scale: 0.2 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: idx * 0.05,
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                                        borderColor: 'var(--accent-green)',
                                        color: 'var(--accent-green)',
                                        boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
                                    }}
                                >
                                    {section}
                                </motion.a>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
