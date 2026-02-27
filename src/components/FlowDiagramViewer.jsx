import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Zap, Database, Terminal, Shield, List, RotateCw } from 'lucide-react';
import flowData from '../../flow_diagram.json';

const FlowDiagramViewer = ({ isOpen, onClose }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [isPortrait, setIsPortrait] = useState(false);
    const viewerRef = useRef(null);

    useEffect(() => {
        const checkOrientation = () => {
            const isMob = window.innerWidth <= 768;
            const isPort = window.innerHeight > window.innerWidth;
            setIsPortrait(isMob && isPort);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    if (!isOpen) return null;

    const steps = flowData.sequence;
    const currentStepData = steps.find(s => s.step === activeStep);

    // Dynamic sizing based on screen/orientation
    const titleSize = isPortrait ? '1.2rem' : '1.8rem';
    const subTitleSize = isPortrait ? '0.9rem' : '1.1rem';
    const bodySize = isPortrait ? '0.75rem' : '0.9rem';
    const paddingSize = isPortrait ? '1.5rem' : '2.5rem';

    return (
        <div className="arch-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 8, 12, 0.98)',
            backdropFilter: 'blur(15px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isPortrait ? '0' : '1.5rem',
            overflow: 'hidden'
        }}>
            {/* Rotation Hint for Mobile Portrait */}
            {isPortrait && (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1101,
                    background: 'var(--accent-purple)',
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    animation: 'bounce 2s infinite'
                }}>
                    <RotateCw size={12} /> Sequential Flow: Landscape recommended
                </div>
            )}

            <div className="terminal-window" style={{
                width: isPortrait ? '92vh' : '100%',
                maxWidth: '1100px',
                height: isPortrait ? '92vw' : '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
                border: '1px solid var(--border-color)',
                transform: isPortrait ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.3s ease',
                transformOrigin: 'center center'
            }}>
                {/* Header */}
                <div className="terminal-header" style={{ justifyContent: 'space-between', padding: isPortrait ? '8px 15px' : '10px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="terminal-controls">
                            <div className="control red" onClick={onClose} style={{ cursor: 'pointer' }} />
                            <div className="control yellow" />
                            <div className="control green" />
                        </div>
                        <span className="terminal-title" style={{ fontSize: isPortrait ? '0.65rem' : '0.8rem' }}>
                            ~/delivery-tracker/flow_diagram.json
                        </span>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center'
                    }}>
                        <X size={isPortrait ? 16 : 18} />
                    </button>
                </div>

                <div className="terminal-body" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    padding: 0,
                    background: 'rgba(8, 12, 16, 0.4)'
                }}>
                    {/* Progress Bar / Steps Navigation */}
                    <div style={{
                        padding: isPortrait ? '0.75rem' : '1.5rem',
                        borderBottom: '1px solid var(--border-color)',
                        background: 'rgba(12, 18, 24, 0.5)',
                        overflowX: 'auto',
                        display: 'flex',
                        gap: '0.4rem',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        {steps.map((step) => (
                            <button
                                key={step.step}
                                onClick={() => setActiveStep(step.step)}
                                style={{
                                    flex: `0 0 ${isPortrait ? '35px' : '45px'}`,
                                    height: isPortrait ? '35px' : '45px',
                                    borderRadius: '8px',
                                    border: `1px solid ${activeStep === step.step ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)'}`,
                                    background: activeStep === step.step ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255,255,255,0.03)',
                                    color: activeStep === step.step ? 'var(--accent-green)' : 'var(--text-muted)',
                                    fontSize: isPortrait ? '0.75rem' : '0.9rem',
                                    fontFamily: "'Fira Code', monospace",
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: activeStep === step.step ? 'bold' : 'normal'
                                }}
                            >
                                {step.step}
                            </button>
                        ))}
                    </div>

                    {/* Step Detail View */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: paddingSize }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: isPortrait ? '0.65rem' : '0.8rem', marginBottom: '0.75rem' }}>
                                STEP_{activeStep.toString().padStart(2, '0')} // EXECUTION
                            </div>

                            <h2 style={{ fontSize: titleSize, color: '#fff', marginBottom: isPortrait ? '1rem' : '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                {currentStepData.action || currentStepData.trigger}
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: isPortrait ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isPortrait ? '1.5rem' : '2rem' }}>
                                {/* Left Side: Context */}
                                <div>
                                    <div style={{ marginBottom: isPortrait ? '1rem' : '2rem' }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Terminal size={12} /> Source
                                        </div>
                                        <div style={{ color: 'var(--accent-blue)', fontSize: subTitleSize, fontWeight: 500 }}>
                                            {currentStepData.source}
                                        </div>
                                    </div>

                                    {currentStepData.target && (
                                        <div style={{ marginBottom: isPortrait ? '1rem' : '2rem' }}>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Database size={12} /> Sink
                                            </div>
                                            <div style={{ color: 'var(--accent-purple)', fontSize: bodySize, fontFamily: "'Fira Code', monospace", padding: '6px 10px', background: 'rgba(167, 139, 250, 0.05)', borderRadius: '6px', border: '1px solid rgba(167, 139, 250, 0.1)', wordBreak: 'break-all' }}>
                                                {currentStepData.target}
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.data && (
                                        <div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <ArrowRight size={12} /> Attributes
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {currentStepData.data.map((item, i) => (
                                                    <span key={i} style={{ fontSize: '0.65rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--text-body)' }}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Logic */}
                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: isPortrait ? '1rem' : '1.5rem' }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--accent-yellow)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Zap size={12} /> Implementation
                                    </div>
                                    {currentStepData.logic ? (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {currentStepData.logic.map((line, i) => (
                                                <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '10px' }}>
                                                    <span style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.8rem' }}>&gt;</span>
                                                    <span style={{ fontSize: bodySize, color: 'var(--text-body)', lineHeight: '1.4' }}>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                            Passive data transfer.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Nav */}
                    <div style={{
                        padding: isPortrait ? '0.75rem 1.5rem' : '1rem 2.5rem',
                        borderTop: '1px solid var(--border-color)',
                        background: 'rgba(248, 113, 113, 0.03)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: isPortrait ? 'none' : 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 600 }}>
                            <Shield size={14} /> Security Protocol Active
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                            {activeStep} / {steps.length}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                disabled={activeStep === 1}
                                onClick={() => setActiveStep(prev => prev - 1)}
                                style={{
                                    background: 'none', border: 'none', color: activeStep === 1 ? 'transparent' : 'var(--accent-blue)',
                                    cursor: 'pointer', fontSize: '0.7rem', fontFamily: "'Fira Code', monospace"
                                }}
                            >
                                [ PREV ]
                            </button>
                            <button
                                disabled={activeStep === steps.length}
                                onClick={() => setActiveStep(prev => prev + 1)}
                                style={{
                                    background: 'none', border: 'none', color: activeStep === steps.length ? 'transparent' : 'var(--accent-blue)',
                                    cursor: 'pointer', fontSize: '0.7rem', fontFamily: "'Fira Code', monospace"
                                }}
                            >
                                [ NEXT ]
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -5px); }
                }
            `}</style>
        </div>
    );
};

export default FlowDiagramViewer;