import React, { useEffect, useRef, useState } from 'react';

const SpaceWar = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    // Game constants
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 400;
    const PLAYER_SPEED = 5;
    const BULLET_SPEED = 7;
    const ENEMY_SPEED = 2;
    const ENEMY_SPAWN_RATE = 0.02;

    const gameState = useRef({
        player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, width: 30, height: 30 },
        bullets: [],
        enemies: [],
        keys: {},
        score: 0
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            gameState.current.keys[e.code] = true;
            if (e.code === 'Space' && !gameStarted) {
                setGameStarted(true);
            }
            if (e.code === 'KeyR' && gameOver) {
                resetGame();
            }
        };
        const handleKeyUp = (e) => {
            gameState.current.keys[e.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameStarted, gameOver]);

    const resetGame = () => {
        gameState.current = {
            player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 30, width: 30, height: 30 },
            bullets: [],
            enemies: [],
            keys: {},
            score: 0
        };
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const update = () => {
            if (gameOver || !gameStarted) return;

            const state = gameState.current;

            // Move player
            if (state.keys['ArrowLeft'] && state.player.x > state.player.width / 2) {
                state.player.x -= PLAYER_SPEED;
            }
            if (state.keys['ArrowRight'] && state.player.x < CANVAS_WIDTH - state.player.width / 2) {
                state.player.x += PLAYER_SPEED;
            }

            // Shoot bullets
            if (state.keys['Space'] || state.keys['ArrowUp']) {
                if (state.bullets.length === 0 || state.bullets[state.bullets.length - 1].y < CANVAS_HEIGHT - 70) {
                    state.bullets.push({ x: state.player.x, y: state.player.y - 10 });
                }
            }

            // Update bullets
            state.bullets = state.bullets.filter(b => b.y > 0);
            state.bullets.forEach(b => (b.y -= BULLET_SPEED));

            // Spawn enemies
            if (Math.random() < ENEMY_SPAWN_RATE) {
                state.enemies.push({
                    x: Math.random() * (CANVAS_WIDTH - 20) + 10,
                    y: -20,
                    width: 20 + Math.random() * 20,
                    height: 20 + Math.random() * 20
                });
            }

            // Update enemies
            state.enemies.forEach(e => (e.y += ENEMY_SPEED));

            // Check collisions
            state.enemies.forEach((enemy, eIdx) => {
                // Enemy vs Player
                if (
                    enemy.x < state.player.x + state.player.width / 2 &&
                    enemy.x + enemy.width > state.player.x - state.player.width / 2 &&
                    enemy.y < state.player.y + state.player.height / 2 &&
                    enemy.y + enemy.height > state.player.y - state.player.height / 2
                ) {
                    setGameOver(true);
                }

                // Enemy vs Bullets
                state.bullets.forEach((bullet, bIdx) => {
                    if (
                        bullet.x > enemy.x &&
                        bullet.x < enemy.x + enemy.width &&
                        bullet.y > enemy.y &&
                        bullet.y < enemy.y + enemy.height
                    ) {
                        state.enemies.splice(eIdx, 1);
                        state.bullets.splice(bIdx, 1);
                        state.score += 10;
                        setScore(state.score);
                    }
                });
            });

            // Clean up off-screen enemies
            state.enemies = state.enemies.filter(e => e.y < CANVAS_HEIGHT);
        };

        const draw = () => {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            const state = gameState.current;

            // Draw player (Retro Triangle Ship)
            ctx.fillStyle = '#22d3ee';
            ctx.beginPath();
            ctx.moveTo(state.player.x, state.player.y - 15);
            ctx.lineTo(state.player.x - 15, state.player.y + 15);
            ctx.lineTo(state.player.x + 15, state.player.y + 15);
            ctx.closePath();
            ctx.fill();
            // Ship glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#22d3ee';
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw bullets
            ctx.fillStyle = '#fbbf24';
            state.bullets.forEach(b => {
                ctx.fillRect(b.x - 2, b.y, 4, 10);
            });

            // Draw enemies (Asteroids)
            ctx.fillStyle = '#f87171';
            state.enemies.forEach(e => {
                ctx.fillRect(e.x, e.y, e.width, e.height);
                ctx.strokeStyle = '#ef4444';
                ctx.strokeRect(e.x, e.y, e.width, e.height);
            });

            // Draw UI
            ctx.fillStyle = '#fff';
            ctx.font = '16px "Fira Code", monospace';
            ctx.fillText(`SCORE: ${state.score}`, 10, 25);

            if (!gameStarted) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = '#22d3ee';
                ctx.font = '24px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.fillText('SPACE WAR', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
                ctx.font = '14px "Fira Code", monospace';
                ctx.fillText('PRESS SPACE TO START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
                ctx.fillText('USE ARROWS TO MOVE & SHOOT', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 45);
            }

            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = '#ef4444';
                ctx.font = '32px "Fira Code", monospace';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
                ctx.fillStyle = '#fff';
                ctx.font = '18px "Fira Code", monospace';
                ctx.fillText(`FINAL SCORE: ${state.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
                ctx.font = '14px "Fira Code", monospace';
                ctx.fillText('PRESS R TO RESTART', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
            }

            animationFrameId = requestAnimationFrame(() => {
                update();
                draw();
            });
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gameOver, gameStarted]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#0f172a',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            margin: '10px 0'
        }}>
            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    cursor: gameOver ? 'default' : 'none',
                    border: '2px solid #1e293b'
                }}
            />
        </div>
    );
};

export default SpaceWar;
