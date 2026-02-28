import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'education', 'contact', 'blog'];

export default function MobileNav({ isRecruiterView = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const MotionDiv = motion.div;
    const MotionA = motion.a;
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
    const palette = isRecruiterView
        ? {
            panelBg: '#ffffff',
            panelBorder: '#d4d4d4',
            text: '#000000',
            accent: '#000000',
            overlay: 'rgba(255, 255, 255, 0.97)',
            coreBg: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(255,255,255,1) 80%)',
            ring: 'rgba(0, 0, 0, 0.18)',
            ringGlow: 'none',
            pillBg: '#ffffff',
            pillBorder: '#c9c9c9',
            pillHoverBg: '#f3f3f3',
            pillShadow: 'none',
        }
        : {
            panelBg: 'var(--terminal-bg)',
            panelBorder: 'var(--border-color)',
            text: 'var(--text-color)',
            accent: 'var(--accent-green)',
            overlay: 'rgba(8, 12, 16, 0.85)',
            coreBg: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(12,18,24,0.95) 80%)',
            ring: 'rgba(34, 211, 238, 0.15)',
            ringGlow: '0 0 20px rgba(34, 211, 238, 0.1) inset, 0 0 20px rgba(34, 211, 238, 0.1)',
            pillBg: 'rgba(12, 18, 24, 0.95)',
            pillBorder: 'var(--accent-green)',
            pillHoverBg: 'rgba(34, 211, 238, 0.1)',
            pillShadow: '0 0 15px rgba(34, 211, 238, 0.2)',
        };

    return (
        <div className="mobile-nav">
            <button
                onClick={toggleMenu}
                className="mobile-nav-btn"
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: palette.panelBg,
                    border: `1px solid ${isOpen ? palette.accent : palette.panelBorder}`,
                    color: isOpen ? palette.accent : palette.text,
                    padding: 'var(--nav-control-padding, 0 10px)',
                    height: 'var(--nav-control-height, 30px)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 'var(--nav-control-font-size, 0.75rem)',
                    textTransform: 'uppercase',
                    boxShadow: 'none',
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
                    <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: palette.overlay,
                            backdropFilter: isRecruiterView ? 'none' : 'blur(8px)',
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
                            <MotionDiv
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                style={{
                                    position: 'absolute',
                                    top: '-40px', left: '-40px',
                                    width: '80px', height: '80px',
                                    borderRadius: '50%',
                                    background: palette.coreBg,
                                    border: `2px solid ${palette.accent}`,
                                    boxShadow: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: palette.accent
                                }}
                            >
                                <Cpu size={32} />
                            </MotionDiv>

                            {/* Glowing Ring Path */}
                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    position: 'absolute',
                                    top: -radius, left: -radius,
                                    width: radius * 2, height: radius * 2,
                                    borderRadius: '50%',
                                    border: `2px solid ${palette.ring}`,
                                    boxShadow: palette.ringGlow,
                                    pointerEvents: 'none'
                                }}
                            />

                            {/* Orbiting Section Options */}
                            {SECTIONS.map((section, idx) => {
                                // 0 degrees is 3 o'clock. We want 12 o'clock, which is -90 degrees.
                                const targetAngle = -90 + (idx * (360 / SECTIONS.length));

                                return (
                                    <MotionDiv
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
                                        <MotionA
                                            href={section === 'blog' ? '/blog' : `#${section}`}
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
                                                background: palette.pillBg,
                                                border: `1px solid ${palette.pillBorder}`,
                                                color: palette.accent,
                                                textDecoration: 'none',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                boxShadow: palette.pillShadow,
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
                                                background: palette.pillHoverBg,
                                                boxShadow: 'none'
                                            }}
                                        >
                                            {section}
                                        </MotionA>
                                    </MotionDiv>
                                );
                            })}
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </div>
    );
}
