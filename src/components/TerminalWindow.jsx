import React from 'react';

const TerminalWindow = ({ children, title = "guest@prakhar:~" }) => {
    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <div className="terminal-controls">
                    <div className="control red"></div>
                    <div className="control yellow"></div>
                    <div className="control green"></div>
                </div>
                <div className="terminal-title">{title}</div>
                <div style={{ width: '40px' }}></div> {/* Spacer */}
            </div>
            <div className="terminal-body">
                {children}
            </div>
        </div>
    );
};

export default TerminalWindow;
