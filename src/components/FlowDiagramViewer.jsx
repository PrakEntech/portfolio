import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Zap, Database, Terminal, Shield, List } from 'lucide-react';
import flowData from '../../flow_diagram.json';

const FlowDiagramViewer = ({ isOpen, onClose, isRecruiterView = false }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isOpen) return null;

    const steps = flowData.sequence;
    const currentStepData = steps.find(s => s.step === activeStep);

    return (
        <div className={`arch-modal-overlay ${isRecruiterView ? 'recruiter-flow' : ''}`} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: isRecruiterView ? '#ffffff' : 'rgba(5, 8, 12, 0.98)',
            backdropFilter: isRecruiterView ? 'none' : 'blur(15px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0.5rem' : '1.5rem',
            overflow: 'hidden'
        }}>
            <div className="terminal-window" style={{
                width: '100%',
                maxWidth: '1100px',
                height: isMobile ? '95vh' : '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isRecruiterView ? 'none' : '0 25px 80px rgba(0,0,0,0.8)',
                border: isRecruiterView ? '1px solid #d4d4d4' : '1px solid var(--border-color)',
                borderRadius: isMobile ? '8px' : '12px',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div className="terminal-header" style={{
                    justifyContent: 'space-between',
                    padding: isMobile ? '8px 12px' : '12px 18px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="terminal-controls" style={{ display: isMobile ? 'none' : 'flex' }}>
                            <div className="control red" onClick={onClose} style={{ cursor: 'pointer' }} />
                            <div className="control yellow" />
                            <div className="control green" />
                        </div>
                        <span className="terminal-title" style={{ fontSize: isMobile ? '0.7rem' : '0.85rem' }}>
                            {isMobile ? '~/flow_diagram.json' : '~/delivery-tracker/flow_diagram.json — Sequence Flow'}
                        </span>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center'
                    }}>
                        <X size={isMobile ? 16 : 18} />
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
                        padding: isMobile ? '1rem' : '1.5rem',
                        borderBottom: '1px solid var(--border-color)',
                        background: 'rgba(12, 18, 24, 0.5)',
                        overflowX: 'auto',
                        display: 'flex',
                        gap: isMobile ? '0.35rem' : '0.5rem',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {steps.map((step) => (
                            <button
                                key={step.step}
                                onClick={() => setActiveStep(step.step)}
                                style={{
                                    flex: `0 0 ${isMobile ? '35px' : '45px'}`,
                                    height: isMobile ? '35px' : '45px',
                                    borderRadius: '6px',
                                    border: `1px solid ${activeStep === step.step ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)'}`,
                                    background: activeStep === step.step ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255,255,255,0.03)',
                                    color: activeStep === step.step ? 'var(--accent-green)' : 'var(--text-muted)',
                                    fontSize: isMobile ? '0.75rem' : '0.9rem',
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
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: isMobile ? '1.25rem' : '2.5rem',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: isMobile ? '0.65rem' : '0.8rem', marginBottom: isMobile ? '0.5rem' : '1rem' }}>
                                STEP_{activeStep.toString().padStart(2, '0')} // SEQUENCE_EXECUTION
                            </div>

                            <h2 style={{
                                fontSize: isMobile ? '1.2rem' : '1.8rem',
                                color: '#fff',
                                marginBottom: isMobile ? '1.25rem' : '1.5rem',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2
                            }}>
                                {currentStepData.action || currentStepData.trigger}
                            </h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: isMobile ? '1.5rem' : '2rem'
                            }}>
                                {/* Context Information */}
                                <div>
                                    <div style={{ marginBottom: isMobile ? '1.25rem' : '2rem' }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Terminal size={12} /> Source Entity
                                        </div>
                                        <div style={{ color: 'var(--accent-blue)', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 500 }}>
                                            {currentStepData.source}
                                        </div>
                                    </div>

                                    {currentStepData.target && (
                                        <div style={{ marginBottom: isMobile ? '1.25rem' : '2rem' }}>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Database size={12} /> Target Sink
                                            </div>
                                            <div style={{
                                                color: 'var(--accent-purple)',
                                                fontSize: isMobile ? '0.75rem' : '1rem',
                                                fontFamily: "'Fira Code', monospace",
                                                padding: '6px 10px',
                                                background: 'rgba(167, 139, 250, 0.05)',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(167, 139, 250, 0.1)',
                                                wordBreak: 'break-all'
                                            }}>
                                                {currentStepData.target}
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.data && (
                                        <div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <ArrowRight size={12} /> Data Payload
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {currentStepData.data.map((item, i) => (
                                                    <span key={i} style={{
                                                        fontSize: isMobile ? '0.65rem' : '0.75rem',
                                                        padding: '3px 8px',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '4px',
                                                        color: 'var(--text-body)'
                                                    }}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Processing Logic */}
                                <div style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '12px',
                                    padding: isMobile ? '1.25rem' : '1.5rem'
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--accent-yellow)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Zap size={12} /> Processing Logic
                                    </div>
                                    {currentStepData.logic ? (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {currentStepData.logic.map((line, i) => (
                                                <li key={i} style={{ marginBottom: isMobile ? '0.75rem' : '1rem', display: 'flex', gap: '10px' }}>
                                                    <span style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.8rem' }}>&gt;</span>
                                                    <span style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: 'var(--text-body)', lineHeight: '1.4' }}>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                            Passive data transfer or direct user action.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: isMobile ? '0.75rem 1.25rem' : '1rem 2.5rem',
                        borderTop: '1px solid var(--border-color)',
                        background: 'rgba(248, 113, 113, 0.03)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        {!isMobile && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 600 }}>
                                <Shield size={14} /> Security Protocol Active
                            </div>
                        )}
                        <div style={{ fontSize: isMobile ? '0.65rem' : '0.7rem', color: 'var(--text-muted)' }}>
                            {isMobile ? `Step ${activeStep}/${steps.length}` : `Step ${activeStep} of ${steps.length}`}
                        </div>
                        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1rem' }}>
                            <button
                                disabled={activeStep === 1}
                                onClick={() => setActiveStep(prev => prev - 1)}
                                style={{
                                    background: 'none', border: 'none', color: activeStep === 1 ? 'transparent' : 'var(--accent-blue)',
                                    cursor: 'pointer', fontSize: isMobile ? '0.65rem' : '0.75rem', fontFamily: "'Fira Code', monospace",
                                    padding: '8px'
                                }}
                            >
                                [ PREV ]
                            </button>
                            <button
                                disabled={activeStep === steps.length}
                                onClick={() => setActiveStep(prev => prev + 1)}
                                style={{
                                    background: 'none', border: 'none', color: activeStep === steps.length ? 'transparent' : 'var(--accent-blue)',
                                    cursor: 'pointer', fontSize: isMobile ? '0.65rem' : '0.75rem', fontFamily: "'Fira Code', monospace",
                                    padding: '8px'
                                }}
                            >
                                [ NEXT ]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowDiagramViewer;
