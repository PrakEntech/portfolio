import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TypewriterText from './TypewriterText';
import SpaceWar from './SpaceWar';

const InteractiveTerminal = ({ resumeData, setProjectFilter }) => {
    const navigate = useNavigate();
    const { personalInfo, summary } = resumeData;
    const initialHistory = [
        {
            type: 'command',
            text: 'whoami'
        },
        {
            type: 'component',
            content: (
                <div style={{ marginBottom: '1rem' }}>
                    <div className="glitch-wrapper hero-name" data-text={personalInfo.name}>
                        {personalInfo.name}
                    </div>
                    <div className="hero-role">
                        ▸ <TypewriterText text={personalInfo.role} speed={5} className="inline-typewriter" />
                    </div>
                    <div className="hero-location">
                        <MapPin size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        <TypewriterText text={personalInfo.location} speed={5} className="inline-typewriter" />
                    </div>
                    <div className="status-badge" style={{ marginTop: '1rem' }}>
                        <span className="status-dot" />
                        Open to new opportunities
                    </div>
                    <div style={{ borderLeft: '2px solid rgba(34,211,238,0.3)', paddingLeft: '1rem', marginTop: '1.5rem', color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.8' }}>
                        <TypewriterText text={summary} speed={5} />
                    </div>
                    <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Type <span style={{ color: 'var(--accent-yellow)' }}>'help'</span> to see available commands.
                    </div>
                </div>
            )
        }
    ];

    const [history, setHistory] = useState(initialHistory);
    const [input, setInput] = useState('');
    const [activeApp, setActiveApp] = useState(null); // e.g. 'spacewar'
    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);
    const isFirstRun = useRef(true);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (terminalBodyRef.current) {
                terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }
        }, 0);
    };

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            if (terminalBodyRef.current) {
                terminalBodyRef.current.scrollTop = 0;
            }
            return;
        }
        scrollToBottom();
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            setInput('');

            if (!cmd) return;

            let output = null;

            if (cmd === 'clear') {
                setHistory([]);
                return;
            } else if (cmd === 'help') {
                output = (
                    <div style={{ color: 'var(--text-body)', lineHeight: '1.8' }}>
                        <div style={{ color: 'var(--accent-green)' }}>Available commands:</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>whoami</span> - Display detailed professional profile</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>ls</span> - List available portfolio directories (sections)</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>cd</span> - Navigate to a directory (e.g., 'cd experience')</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>projects</span> - Filter projects: --filter [Frontend|Backend|Mobile|Security]</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>blog</span> - Search blog: --search [query]</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>spacewar</span> - Play a retro terminal space game</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>clear</span> - Clear terminal history</div>
                        <div><span style={{ color: 'var(--accent-yellow)', width: '60px', display: 'inline-block' }}>sudo</span> - ???</div>
                    </div>
                );
            } else if (cmd === 'whoami' || cmd === 'about' || cmd === 'about/') {
                output = initialHistory[1].content;
            } else if (cmd === 'ls') {
                output = (
                    <div style={{ color: 'var(--accent-blue)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        <span>about/</span>
                        <span>skills/</span>
                        <span>experience/</span>
                        <span>projects/</span>
                        <span>education/</span>
                        <span>contact/</span>
                    </div>
                );
            } else if (cmd.startsWith('cd ')) {
                const dir = cmd.split(' ')[1];
                const validDirs = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
                if (validDirs.includes(dir)) {
                    setTimeout(() => {
                        document.getElementById(dir)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);

                    if (dir === 'about') {
                        setHistory([
                            { type: 'command', text: cmd },
                            { type: 'component', content: initialHistory[1].content }
                        ]);
                        return;
                    }

                    output = <div style={{ color: 'var(--accent-green)' }}>Navigating to ~/{dir}...</div>;
                } else {
                    output = <div style={{ color: 'var(--accent-red)' }}>cd: {dir}: No such file or directory</div>;
                }
            } else if (cmd.startsWith('projects')) {
                const parts = cmd.split(' ');
                const filterIdx = parts.indexOf('--filter');
                if (filterIdx !== -1 && parts[filterIdx + 1]) {
                    const category = parts[filterIdx + 1].charAt(0).toUpperCase() + parts[filterIdx + 1].slice(1).toLowerCase();
                    const validCats = ['All', 'Frontend', 'Backend', 'Mobile', 'Security'];
                    if (validCats.includes(category)) {
                        setProjectFilter(category);
                        setTimeout(() => {
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                        output = (
                            <div style={{ color: 'var(--accent-green)' }}>
                                <Filter size={14} style={{ display: 'inline', marginRight: '6px' }} />
                                Filtering projects by: {category}...
                            </div>
                        );
                    } else {
                        output = <div style={{ color: 'var(--accent-red)' }}>Error: Invalid category. Use: Frontend, Backend, Mobile, Security, or All.</div>;
                    }
                } else {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    output = <div style={{ color: 'var(--accent-green)' }}>Navigating to projects... Type 'projects --filter [category]' to filter.</div>;
                }
            } else if (cmd.startsWith('blog')) {
                const parts = cmd.split(' ');
                const searchIdx = parts.indexOf('--search');
                if (searchIdx !== -1 && parts[searchIdx + 1]) {
                    const query = parts.slice(searchIdx + 1).join(' ');
                    output = (
                        <div style={{ color: 'var(--accent-green)' }}>
                            <Search size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            Searching blog for: "{query}"...
                        </div>
                    );
                    setTimeout(() => {
                        navigate(`/blog?q=${encodeURIComponent(query)}`);
                    }, 500);
                } else {
                    output = <div style={{ color: 'var(--accent-green)' }}>Navigating to blog...</div>;
                    setTimeout(() => {
                        navigate('/blog');
                    }, 500);
                }
            } else if (cmd === 'spacewar') {
                setActiveApp('spacewar');
                output = <div style={{ color: 'var(--accent-green)' }}>Launching SpaceWar! Type 'Q' or 'ESC' to exit.</div>;
            } else if (cmd === 'sudo') {
                output = <div style={{ color: 'var(--accent-red)' }}>prakhar is not in the sudoers file. This incident will be reported.</div>;
            } else {
                output = <div style={{ color: 'var(--accent-red)' }}>Command not found: {cmd}. Type 'help' for available commands.</div>;
            }

            setHistory(prev => [
                ...prev,
                { type: 'command', text: cmd },
                output && { type: 'component', content: output }
            ].filter(Boolean));
        }
    };

    return (
        <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
            <div className="terminal-header">
                <div className="terminal-controls">
                    <div className="control red"></div>
                    <div className="control yellow"></div>
                    <div className="control green"></div>
                </div>
                <div className="terminal-title">visitor@prakhar:~ — bash</div>
                <div style={{ width: '40px' }}></div>
            </div>

            <div
                className={`terminal-body ${activeApp ? 'app-active' : ''}`}
                ref={terminalBodyRef}
                style={{
                    minHeight: activeApp ? '600px' : '300px',
                    maxHeight: activeApp ? '800px' : '500px',
                    overflowY: activeApp ? 'hidden' : 'auto',
                    transition: 'all 0.3s ease'
                }}
            >
                {activeApp === 'spacewar' ? (
                    <SpaceWar onExit={() => {
                        setActiveApp(null);
                        setHistory(prev => [
                            ...prev,
                            { type: 'component', content: <div style={{ color: 'var(--accent-yellow)' }}>Exited SpaceWar. Welcome back to terminal.</div> }
                        ]);
                    }} />
                ) : (
                    <>
                        {history.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: item.type === 'command' ? '8px' : '1.5rem' }}>
                                {item.type === 'command' ? (
                                    <div className="prompt-line" style={{ marginBottom: 0 }}>
                                        <span className="prompt">visitor@portfolio:~$</span>
                                        <span className="command">{item.text}</span>
                                    </div>
                                ) : (
                                    <div className="cmd-output">
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="prompt-line" style={{ marginTop: '8px' }}>
                            <span className="prompt">visitor@portfolio:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--accent-blue)',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    width: '60%',
                                    caretColor: 'var(--accent-green)'
                                }}
                                autoFocus={typeof window !== 'undefined' && window.matchMedia("(min-width: 768px)").matches}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InteractiveTerminal;
