import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X, Network, Database, Server, Users, ArrowRight, Zap, Globe, Cog } from 'lucide-react';
import architectureData from '../../architecture.json';

const ICON_MAP = {
    actors: <Users size={16} />,
    frontend: <Globe size={16} />,
    firebase: <Database size={16} />,
    gcp: <Server size={16} />,
    functions: <Cog size={16} />,
    external: <Network size={16} />
};

const ArchitectureViewer = ({ isOpen, onClose }) => {
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [hoveredNodeId, setHoveredNodeId] = useState(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeNodeId = hoveredNodeId || selectedNodeId;
    const viewerRef = useRef(null);

    // Group nodes by their defined 'group' property
    const groupedNodes = useMemo(() => {
        return architectureData.nodes.reduce((acc, node) => {
            acc[node.group] = acc[node.group] || [];
            acc[node.group].push(node);
            return acc;
        }, {});
    }, []);

    // Columns for ordered display
    const columns = ['actors', 'frontend', 'firebase', 'functions', 'gcp', 'external'];

    if (!isOpen) return null;

    const handleNodeClick = (id) => {
        setSelectedNodeId(id === selectedNodeId ? null : id);
    };

    const isConnected = (id1, id2) => {
        return architectureData.edges.some(e =>
            (e.from === id1 && e.to === id2) || (e.from === id2 && e.to === id1)
        );
    };

    const getConnections = (nodeId) => {
        const outgoing = architectureData.edges.filter(e => e.from === nodeId);
        const incoming = architectureData.edges.filter(e => e.to === nodeId);
        return { outgoing, incoming };
    };

    // Find the selected node for the side panel
    const selectedNode = architectureData.nodes.find(n => n.id === selectedNodeId);
    const { outgoing, incoming } = selectedNodeId ? getConnections(selectedNodeId) : { outgoing: [], incoming: [] };

    return (
        <div className="arch-modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 8, 12, 0.98)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '0' : '2rem'
        }}>
            <div className="terminal-window" style={{
                width: '100%',
                maxWidth: '1200px',
                height: isMobile ? '100vh' : '85vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
                borderRadius: isMobile ? '0' : '10px',
                border: isMobile ? 'none' : '1px solid var(--border-color)'
            }}>
                {/* Terminal Header */}
                <div className="terminal-header" style={{
                    justifyContent: 'space-between',
                    padding: isMobile ? '0.75rem 1rem' : '0.6rem 1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {!isMobile && (
                            <div className="terminal-controls">
                                <div className="control red" onClick={onClose} style={{ cursor: 'pointer' }} />
                                <div className="control yellow" />
                                <div className="control green" />
                            </div>
                        )}
                        <span className="terminal-title" style={{ fontSize: isMobile ? '0.7rem' : '0.78rem' }}>
                            {isMobile ? 'architecture.json' : '~/delivery-tracker/architecture.json — Flow Viewer'}
                        </span>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'none', border: 'none', color: 'var(--text-muted)',
                        cursor: 'pointer', outline: 'none', display: 'flex', alignItems: 'center'
                    }}>
                        <X size={isMobile ? 20 : 18} />
                    </button>
                </div>

                {/* Viewer Body */}
                <div className="terminal-body" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    overflow: 'hidden',
                    padding: 0
                }}>
                    {/* Layout Area - Always keeps its horizontal scroll nature */}
                    <div className="arch-grid" ref={viewerRef} style={{
                        flex: isMobile && selectedNodeId ? '0 0 50%' : '1',
                        display: 'flex',
                        gap: '1.25rem',
                        padding: isMobile ? '1.5rem 1rem' : '2rem',
                        overflowX: 'auto',
                        overflowY: 'auto',
                        background: 'rgba(8, 12, 16, 0.5)',
                        scrollSnapType: isMobile ? 'x mandatory' : 'none'
                    }}>
                        {columns.map(colId => {
                            if (!groupedNodes[colId]) return null;
                            return (
                                <div key={colId} className="arch-col" style={{
                                    flex: isMobile ? '0 0 80%' : '0 0 220px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    scrollSnapAlign: 'start'
                                }}>
                                    <div style={{
                                        color: 'var(--text-muted)',
                                        fontSize: '0.7rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        fontWeight: 600,
                                        marginBottom: '0.4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        {ICON_MAP[colId]} {colId}
                                    </div>
                                    {groupedNodes[colId].map(node => {
                                        let nodeState = 'normal';
                                        if (activeNodeId) {
                                            if (node.id === activeNodeId) nodeState = 'active';
                                            else if (isConnected(activeNodeId, node.id)) nodeState = 'connected';
                                            else nodeState = 'dimmed';
                                        }

                                        return (
                                            <div
                                                key={node.id}
                                                className={`arch-node state-${nodeState}`}
                                                onMouseEnter={() => !isMobile && setHoveredNodeId(node.id)}
                                                onMouseLeave={() => !isMobile && setHoveredNodeId(null)}
                                                onClick={() => handleNodeClick(node.id)}
                                                style={{
                                                    background: nodeState === 'active' ? 'rgba(34, 211, 238, 0.15)' : 'rgba(8, 20, 28, 0.8)',
                                                    border: `1px solid ${nodeState === 'active' ? 'var(--accent-green)' : 'var(--border-color)'}`,
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    opacity: nodeState === 'dimmed' ? 0.3 : 1,
                                                    transform: nodeState === 'active' ? 'translateY(-2px)' : 'none',
                                                    boxShadow: nodeState === 'active' ? '0 0 15px rgba(34, 211, 238, 0.2)' : 'none'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.8rem', color: nodeState === 'active' ? '#fff' : 'var(--text-body)', fontWeight: 500 }}>
                                                    {node.label}
                                                </div>
                                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '2px', fontFamily: "'Fira Code', monospace" }}>
                                                    {node.id}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>

                    {/* Details Sidebar / Bottom Panel on Mobile */}
                    <div className="arch-sidebar" style={{
                        flex: isMobile ? (selectedNodeId ? '1' : '0') : '0 0 320px',
                        borderLeft: isMobile ? 'none' : '1px solid var(--border-color)',
                        borderTop: isMobile ? '1px solid var(--border-color)' : 'none',
                        background: 'var(--terminal-header-bg)',
                        padding: isMobile ? '1.5rem' : '2rem',
                        overflowY: 'auto',
                        display: isMobile && !selectedNodeId ? 'none' : 'block'
                    }}>
                        {selectedNode ? (
                            <div>
                                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                    {isMobile && (
                                        <button
                                            onClick={() => setSelectedNodeId(null)}
                                            style={{
                                                position: 'absolute', right: 0, top: 0, background: 'none', border: 'none', color: 'var(--text-muted)'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                    <div style={{ color: 'var(--accent-green)', fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', marginBottom: '6px' }}>
                                        $ inspect {selectedNode.id}
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '2px' }}>{selectedNode.label}</h3>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                                        {selectedNode.group}
                                    </div>
                                </div>

                                {outgoing.length > 0 && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <ArrowRight size={14} /> Outgoing
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {outgoing.map((edge, i) => {
                                                const targetNode = architectureData.nodes.find(n => n.id === edge.to);
                                                return (
                                                    <div key={i} style={{
                                                        background: 'rgba(34, 211, 238, 0.05)',
                                                        border: '1px solid rgba(34, 211, 238, 0.1)',
                                                        padding: '0.6rem',
                                                        borderRadius: '4px'
                                                    }}>
                                                        <div style={{ fontSize: '0.65rem', color: 'var(--accent-yellow)', marginBottom: '3px', fontFamily: "'Fira Code', monospace" }}>
                                                            {edge.label}
                                                        </div>
                                                        <div style={{ fontSize: '0.75rem', color: '#eee' }}>
                                                            → {targetNode?.label}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {incoming.length > 0 && (
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Zap size={14} /> Incoming
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {incoming.map((edge, i) => {
                                                const sourceNode = architectureData.nodes.find(n => n.id === edge.from);
                                                return (
                                                    <div key={i} style={{
                                                        background: 'rgba(167, 139, 250, 0.05)',
                                                        border: '1px solid rgba(167, 139, 250, 0.1)',
                                                        padding: '0.6rem',
                                                        borderRadius: '4px'
                                                    }}>
                                                        <div style={{ fontSize: '0.65rem', color: 'var(--accent-yellow)', marginBottom: '3px', fontFamily: "'Fira Code', monospace" }}>
                                                            {edge.label}
                                                        </div>
                                                        <div style={{ fontSize: '0.75rem', color: '#eee' }}>
                                                            ← {sourceNode?.label}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            !isMobile && (
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    textAlign: 'center'
                                }}>
                                    <Network size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <div style={{ fontSize: '0.85rem' }}>Select a node to view connections.</div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureViewer;
