import React, { useEffect, useRef, useState } from 'react';

const SpaceWar = ({ onExit }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null); // 'Needle', 'Wedge', or 'Draw'
    const [gameStarted, setGameStarted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Game constants
    const CANVAS_SIZE = 600;
    const STAR_X = CANVAS_SIZE / 2;
    const STAR_Y = CANVAS_SIZE / 2;
    const G = 800; // Gravitational constant (adjusted for feel)
    const MAX_FUEL = 1000;
    const MAX_TORPEDOES = 20;

    const gameState = useRef({
        p1: {
            name: 'Needle', type: 'needle', color: '#0f0',
            x: 100, y: CANVAS_SIZE / 2, vx: 0, vy: -1.5, angle: -Math.PI / 2,
            alive: true, fuel: MAX_FUEL, torpedoes: MAX_TORPEDOES, cooldown: 0
        },
        p2: {
            name: 'Wedge', type: 'wedge', color: '#0cf',
            x: CANVAS_SIZE - 100, y: CANVAS_SIZE / 2, vx: 0, vy: 1.5, angle: Math.PI / 2,
            alive: true, fuel: MAX_FUEL, torpedoes: MAX_TORPEDOES, cooldown: 0
        },
        torpedoes: [],
        keys: {}
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent default scrolling for game keys
            const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Enter', 'ShiftLeft', 'ShiftRight', 'KeyW', 'KeyA', 'KeyD', 'KeyS'];
            if (gameKeys.includes(e.code) && document.activeElement === canvasRef.current) {
                e.preventDefault();
            }

            gameState.current.keys[e.code] = true;
            if (e.code === 'Space' && !gameStarted) {
                setGameStarted(true);
            }
            if (e.code === 'KeyR' && gameOver) {
                resetGame();
            }
            if (e.code === 'Escape' || e.code === 'KeyQ' || (e.ctrlKey && e.code === 'KeyC')) {
                if (onExit) onExit();
            }
        };
        const handleKeyUp = (e) => {
            gameState.current.keys[e.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameStarted, gameOver]);

    const resetGame = () => {
        gameState.current = {
            p1: {
                name: 'Needle', type: 'needle', color: '#0f0',
                x: 100, y: CANVAS_SIZE / 2, vx: 0, vy: -1.5, angle: -Math.PI / 2,
                alive: true, fuel: MAX_FUEL, torpedoes: MAX_TORPEDOES, cooldown: 0
            },
            p2: {
                name: 'Wedge', type: 'wedge', color: '#0cf',
                x: CANVAS_SIZE - 100, y: CANVAS_SIZE / 2, vx: 0, vy: 1.5, angle: Math.PI / 2,
                alive: true, fuel: MAX_FUEL, torpedoes: MAX_TORPEDOES, cooldown: 0
            },
            torpedoes: [],
            keys: {}
        };
        setGameOver(false);
        setWinner(null);
        setGameStarted(true);
    };

    const triggerHyperspace = (player) => {
        if (!player.alive) return;

        // 15% chance of destruction on hyperspace re-entry
        if (Math.random() < 0.15) {
            player.alive = false;
        } else {
            player.x = Math.random() * CANVAS_SIZE;
            player.y = Math.random() * CANVAS_SIZE;
            player.vx = 0;
            player.vy = 0;
        }
    };

    const fireTorpedo = (player) => {
        if (player.alive && player.torpedoes > 0 && player.cooldown <= 0) {
            player.torpedoes--;
            player.cooldown = 20; // frames before next shot

            // Torpedoes inherit ship velocity plus shot velocity
            const speed = 4;
            gameState.current.torpedoes.push({
                x: player.x + Math.cos(player.angle) * 15,
                y: player.y + Math.sin(player.angle) * 15,
                vx: player.vx + Math.cos(player.angle) * speed,
                vy: player.vy + Math.sin(player.angle) * speed,
                life: 180, // Time to live (frames)
                owner: player.name
            });
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const checkGameOver = (state) => {
            if (!state.p1.alive && !state.p2.alive && !gameOver) {
                setWinner('Draw');
                setGameOver(true);
            } else if (!state.p1.alive && !gameOver) {
                setWinner('Wedge');
                setGameOver(true);
            } else if (!state.p2.alive && !gameOver) {
                setWinner('Needle');
                setGameOver(true);
            }
        };

        const updatePhysics = (player, state) => {
            if (!player.alive) return;

            // Gravity Calculation: F = G / r^2
            let dx = STAR_X - player.x;
            let dy = STAR_Y - player.y;
            let distSq = dx * dx + dy * dy;
            let dist = Math.sqrt(distSq);

            if (dist < 15) {
                player.alive = false; // Collided with star
                return;
            }

            let force = G / distSq;
            player.vx += (dx / dist) * force;
            player.vy += (dy / dist) * force;

            // Movement and Toroidal Wrap-around
            player.x = (player.x + player.vx + CANVAS_SIZE) % CANVAS_SIZE;
            player.y = (player.y + player.vy + CANVAS_SIZE) % CANVAS_SIZE;

            if (player.cooldown > 0) player.cooldown--;
        };

        const checkCollisions = (state) => {
            // Ship vs Ship collision
            if (state.p1.alive && state.p2.alive) {
                let dx = state.p1.x - state.p2.x;
                let dy = state.p1.y - state.p2.y;
                if (dx * dx + dy * dy < 400) { // roughly 20px radius
                    state.p1.alive = false;
                    state.p2.alive = false;
                }
            }

            // Torpedo vs Ship collision
            state.torpedoes.forEach(t => {
                let dx1 = t.x - state.p1.x;
                let dy1 = t.y - state.p1.y;
                if (state.p1.alive && dx1 * dx1 + dy1 * dy1 < 100) { // 10px radius
                    state.p1.alive = false;
                    t.life = 0; // Destroy torpedo
                }

                let dx2 = t.x - state.p2.x;
                let dy2 = t.y - state.p2.y;
                if (state.p2.alive && dx2 * dx2 + dy2 * dy2 < 100) {
                    state.p2.alive = false;
                    t.life = 0;
                }

                // Torpedo vs Sun
                let sdX = t.x - STAR_X;
                let sdY = t.y - STAR_Y;
                if (sdX * sdX + sdY * sdY < 225) { // 15px radius 
                    t.life = 0;
                }
            });
        };

        const update = () => {
            if (!gameStarted || gameOver) return;
            const state = gameState.current;

            // P1 Input (Needle) - W(Thrust), A/D(Rotate), Space(Shoot), ShiftLeft(Hyperspace)
            if (state.p1.alive) {
                if (state.keys['KeyA']) state.p1.angle -= 0.07;
                if (state.keys['KeyD']) state.p1.angle += 0.07;
                if (state.keys['KeyW'] && state.p1.fuel > 0) {
                    state.p1.vx += Math.cos(state.p1.angle) * 0.1;
                    state.p1.vy += Math.sin(state.p1.angle) * 0.1;
                    state.p1.fuel -= 1;
                }

                // Using a flag in the state object to prevent rapid-fire/multiple triggers per key hold
                if (state.keys['Space'] && !state.p1.spaceHeld) {
                    fireTorpedo(state.p1);
                    state.p1.spaceHeld = true;
                } else if (!state.keys['Space']) {
                    state.p1.spaceHeld = false;
                }

                if (state.keys['ShiftLeft'] && !state.p1.shiftHeld && state.p1.fuel > 50) {
                    triggerHyperspace(state.p1);
                    state.p1.fuel -= 50;
                    state.p1.shiftHeld = true;
                } else if (!state.keys['ShiftLeft']) {
                    state.p1.shiftHeld = false;
                }
            }

            // P2 Input (Wedge) - Up(Thrust), Left/Right(Rotate), Enter(Shoot), ShiftRight(Hyperspace)
            if (state.p2.alive) {
                if (state.keys['ArrowLeft']) state.p2.angle -= 0.07;
                if (state.keys['ArrowRight']) state.p2.angle += 0.07;
                if (state.keys['ArrowUp'] && state.p2.fuel > 0) {
                    state.p2.vx += Math.cos(state.p2.angle) * 0.1;
                    state.p2.vy += Math.sin(state.p2.angle) * 0.1;
                    state.p2.fuel -= 1;
                }

                if (state.keys['Enter'] && !state.p2.enterHeld) {
                    fireTorpedo(state.p2);
                    state.p2.enterHeld = true;
                } else if (!state.keys['Enter']) {
                    state.p2.enterHeld = false;
                }

                if (state.keys['ShiftRight'] && !state.p2.shiftHeld && state.p2.fuel > 50) {
                    triggerHyperspace(state.p2);
                    state.p2.fuel -= 50;
                    state.p2.shiftHeld = true;
                } else if (!state.keys['ShiftRight']) {
                    state.p2.shiftHeld = false;
                }
            }

            // Physics Update
            updatePhysics(state.p1, state);
            updatePhysics(state.p2, state);

            // Update Torpedoes
            state.torpedoes.forEach(t => {
                // Gravity applies to torpedoes too
                let dx = STAR_X - t.x;
                let dy = STAR_Y - t.y;
                let distSq = dx * dx + dy * dy;
                let dist = Math.sqrt(distSq);
                if (dist > 15) {
                    let force = G / distSq;
                    t.vx += (dx / dist) * force;
                    t.vy += (dy / dist) * force;
                }

                t.x = (t.x + t.vx + CANVAS_SIZE) % CANVAS_SIZE;
                t.y = (t.y + t.vy + CANVAS_SIZE) % CANVAS_SIZE;
                t.life -= 1;
            });
            state.torpedoes = state.torpedoes.filter(t => t.life > 0);

            checkCollisions(state);
            checkGameOver(state);
        };

        const drawShip = (player) => {
            if (!player.alive) return;

            ctx.strokeStyle = player.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();

            if (player.type === 'needle') {
                // Needle: Long and thin
                ctx.moveTo(player.x + Math.cos(player.angle) * 20, player.y + Math.sin(player.angle) * 20);
                ctx.lineTo(player.x + Math.cos(player.angle + 2.8) * 10, player.y + Math.sin(player.angle + 2.8) * 10);
                // Engine base line
                ctx.lineTo(player.x + Math.cos(player.angle - 2.8) * 10, player.y + Math.sin(player.angle - 2.8) * 10);
            } else {
                // Wedge: Short and wide
                ctx.moveTo(player.x + Math.cos(player.angle) * 12, player.y + Math.sin(player.angle) * 12);
                ctx.lineTo(player.x + Math.cos(player.angle + 2.4) * 12, player.y + Math.sin(player.angle + 2.4) * 12);
                ctx.lineTo(player.x - Math.cos(player.angle) * 5, player.y - Math.sin(player.angle) * 5); // inner notch
                ctx.lineTo(player.x + Math.cos(player.angle - 2.4) * 12, player.y + Math.sin(player.angle - 2.4) * 12);
            }
            ctx.closePath();
            ctx.stroke();

            // Thrust flame
            if ((player === gameState.current.p1 && gameState.current.keys['KeyW']) ||
                (player === gameState.current.p2 && gameState.current.keys['ArrowUp'])) {
                if (player.fuel > 0 && Math.random() > 0.3) {
                    ctx.beginPath();
                    let backX = player.x; let backY = player.y;
                    if (player.type === 'needle') {
                        backX = player.x + Math.cos(player.angle + Math.PI) * 10;
                        backY = player.y + Math.sin(player.angle + Math.PI) * 10;
                    } else {
                        backX = player.x - Math.cos(player.angle) * 5;
                        backY = player.y - Math.sin(player.angle) * 5;
                    }
                    ctx.moveTo(backX, backY);
                    ctx.lineTo(backX + Math.cos(player.angle + Math.PI) * (10 + Math.random() * 8),
                        backY + Math.sin(player.angle + Math.PI) * (10 + Math.random() * 8));
                    ctx.stroke();
                }
            }
        };

        const draw = () => {
            // Authentic phosphor fade effect using rgba
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

            const state = gameState.current;

            // Draw Central Star
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(STAR_X, STAR_Y, 4, 0, Math.PI * 2);
            ctx.fill();
            // Star Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#fff';
            ctx.beginPath();
            ctx.arc(STAR_X, STAR_Y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Players
            drawShip(state.p1);
            drawShip(state.p2);

            // Draw Torpedoes ("Blink" Squares)
            ctx.fillStyle = '#fff';
            state.torpedoes.forEach(t => {
                if (Math.random() > 0.2) { // Flickering effect
                    ctx.fillRect(t.x, t.y, 2, 2);
                }
            });

            // Draw UI HUD (Vector Style)
            ctx.fillStyle = '#0f0';
            ctx.font = '12px "Courier New", monospace';
            ctx.fillText(`P1 FUEL:${Math.floor(state.p1.fuel)}  TORP:${state.p1.torpedoes}`, 15, 20);

            ctx.fillStyle = '#0cf';
            ctx.textAlign = 'right';
            ctx.fillText(`P2 FUEL:${Math.floor(state.p2.fuel)}  TORP:${state.p2.torpedoes}`, CANVAS_SIZE - 15, 20);
            ctx.textAlign = 'left'; // reset

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                ctx.fillStyle = '#0f0';
                ctx.font = '24px "Courier New", monospace';
                ctx.textAlign = 'center';
                ctx.fillText('SPACEWAR! (1962)', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 40);

                ctx.font = '14px "Courier New", monospace';
                ctx.fillStyle = '#fff';
                ctx.fillText('P1 (Needle): W,A,D move | Space shoot | LShift hyper', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
                ctx.fillText('P2 (Wedge) : Up,L,R move | Enter shoot | RShift hyper', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 25);

                ctx.fillStyle = '#0f0';
                ctx.fillText('CLICK HERE & PRESS SPACE TO START', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 65);
            }

            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
                ctx.fillStyle = '#0f0';
                ctx.font = '24px "Courier New", monospace';
                ctx.textAlign = 'center';
                const winText = winner === 'Draw' ? 'MUTUAL DESTRUCTION' : `${winner.toUpperCase()} VICTORIOUS`;
                ctx.fillText(winText, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 20);

                ctx.font = '14px "Courier New", monospace';
                ctx.fillStyle = '#fff';
                ctx.fillText('PRESS R TO RESTART', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);
            }

            animationFrameId = requestAnimationFrame(() => {
                update();
                draw();
            });
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gameOver, gameStarted]);

    // Handle fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            // Re-focus canvas when exiting fullscreen so keyboard still works
            setTimeout(() => {
                if (canvasRef.current) canvasRef.current.focus();
            }, 100);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const controlPanelStyle = {
        width: '240px',
        padding: '15px',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'var(--text-body)',
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    };

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: isFullscreen ? '0' : '15px 0',
                padding: isFullscreen ? '20px' : '0',
                backgroundColor: isFullscreen ? '#000' : 'transparent',
                width: isFullscreen ? '100vw' : '100%',
                height: isFullscreen ? '100vh' : 'auto',
                gap: '20px'
            }}
        >
            {/* Player 1 Controls (Left) */}
            <div style={{ ...controlPanelStyle, alignSelf: 'stretch', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h4 style={{ color: '#0f0', margin: '0 0 5px 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>Needle (P1)</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Green Ship</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--accent-yellow)' }}>W</span><span>Thrust</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>A / D</span><span>Rotate L/R</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>Space</span><span>Fire Torpedo</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>L-Shift</span><span>Hyperspace</span>
                </div>

                <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--accent-red)', lineHeight: '1.4' }}>
                    * Hyperspace has 15% risk of instant destruction.
                </div>
            </div>

            {/* Game Canvas (Center) */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <canvas
                    ref={canvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    tabIndex={0}
                    style={{
                        backgroundColor: '#000',
                        border: '1px solid #333',
                        filter: 'drop-shadow(0 0 5px rgba(0, 255, 0, 0.4)) blur(0.5px)',
                        maxWidth: '100%',
                        maxHeight: isFullscreen ? '90vh' : 'auto', // Keep it in view if fullscreen
                        height: isFullscreen ? 'auto' : 'auto',
                        aspectRatio: '1 / 1',
                        outline: 'none',
                        cursor: gameOver || !gameStarted ? 'default' : 'none',
                        boxShadow: 'inset 0 0 20px rgba(0,255,0,0.05)'
                    }}
                />

                {/* Exit Instructions Below Canvas */}
                {!isFullscreen && (
                    <div style={{
                        marginTop: '15px',
                        color: 'var(--accent-blue)',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        opacity: 0.8
                    }}>
                        Press <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>Q</span> to exit the game
                    </div>
                )}

                {/* Fullscreen & Exit Overlay Buttons */}
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', display: 'flex', gap: '10px' }}>
                    <button
                        onClick={toggleFullscreen}
                        style={{
                            background: 'rgba(0,0,0,0.8)',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-cyan)',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            zIndex: 10
                        }}
                    >
                        {isFullscreen ? 'Window' : 'Fullscreen'}
                    </button>
                    {!isFullscreen && (
                        <button
                            onClick={onExit}
                            style={{
                                background: 'rgba(0,0,0,0.8)',
                                color: 'var(--accent-red)',
                                border: '1px solid var(--accent-red)',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                fontFamily: '"Fira Code", monospace',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                zIndex: 10
                            }}
                        >
                            Exit
                        </button>
                    )}
                </div>
            </div>

            {/* Player 2 Controls (Right) */}
            <div style={{ ...controlPanelStyle, alignSelf: 'stretch', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h4 style={{ color: '#0cf', margin: '0 0 5px 0', fontSize: '1.2rem', textTransform: 'uppercase' }}>Wedge (P2)</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cyan Ship</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--accent-yellow)' }}>&uarr;</span><span>Thrust</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>&larr; / &rarr;</span><span>Rotate L/R</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>Enter</span><span>Fire Torpedo</span>
                    <span style={{ color: 'var(--accent-yellow)' }}>R-Shift</span><span>Hyperspace</span>
                </div>

                <div style={{ marginTop: 'auto', textAlign: 'center', padding: '10px', backgroundColor: 'rgba(34, 211, 238, 0.1)', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--accent-blue)', marginBottom: '5px' }}>Terminal</div>
                    <div style={{ fontSize: '0.8rem' }}><span style={{ color: 'var(--accent-yellow)' }}>ESC</span> or <span style={{ color: 'var(--accent-yellow)' }}>Q</span> to exit</div>
                </div>
            </div>
        </div>
    );
};

export default SpaceWar;
