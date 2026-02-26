import React, { useEffect, useRef } from 'react';

// Generates a Matrix-style falling characters + scrolling terminal lines
// sci-fi hacker background with low opacity

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:<>?./~`';

const TERMINAL_LINES = [
    'root@matrix:~# ./decrypt_payload.sh --target=0x7fff',
    'Initializing quantum key exchange...',
    '[OK] Entropy pool seeded: /dev/urandom',
    'root@matrix:~# ssh prakhar@192.168.0.1 -p 22',
    'Establishing encrypted tunnel...',
    '>>> Firewall bypass: SUCCESSFUL',
    'root@matrix:~# sudo nmap -sV --script vuln 10.0.0.0/24',
    '[WARN] Intrusion detection active. Masking signature.',
    'Injecting polymorphic shellcode...',
    '>>> Access Level: ROOT',
    'root@matrix:~# cat /etc/shadow | hashcat --mode=0',
    '[INFO] Compiling exploit module... done',
    'root@matrix:~# python3 exfiltrate.py --silent',
    'Routing through Tor nodes: 3/7...',
    '>>> Packet capture: 4096 bytes',
    'root@matrix:~# gpg --decrypt classified.aes',
    '[CRIT] Anomalous traffic detected. Spoofing MAC...',
    'Loading neural network weights... [####----] 48%',
    'root@matrix:~# kill -9 $(pgrep -f monitor)',
    '>>> Connection established: SECURE',
    'root@matrix:~# git clone https://exploit-db.org/poc',
    '[OK] Payload deployed. Running in background.',
    'Spawning reverse shell on port 4444...',
    '>>> System integrity: COMPROMISED',
    'root@matrix:~# base64 -d <<< "SGVsbG8gV29ybGQK"',
    'Obfuscating traffic pattern... DONE',
    'root@matrix:~# chmod +x ./zero_day.elf && ./zero_day.elf',
];

export default function HackerBackground() {
    const canvasRef = useRef(null);
    const linesRef = useRef(null);

    // --- Matrix rain on canvas ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;
        const fontSize = 13;
        let columns;
        let drops;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const y = drops[i] * fontSize;

                // Lead character brightness
                const isLead = drops[i] * fontSize < canvas.height && Math.random() > 0.9;
                ctx.fillStyle = isLead ? '#ffffff' : `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.1})`;

                ctx.fillText(char, i * fontSize, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // --- Scrolling terminal lines overlay ---
    useEffect(() => {
        const container = linesRef.current;
        if (!container) return;

        let lineIndex = 0;
        let intervalId;

        const addLine = () => {
            const line = document.createElement('div');
            line.className = 'hacker-terminal-line';
            line.textContent = TERMINAL_LINES[lineIndex % TERMINAL_LINES.length];
            lineIndex++;

            // Random position
            const top = Math.random() * 90;
            const left = Math.random() * 60;
            line.style.top = `${top}vh`;
            line.style.left = `${left}vw`;
            line.style.opacity = (Math.random() * 0.08 + 0.03).toFixed(2);
            line.style.fontSize = `${Math.random() * 3 + 9}px`;
            line.style.color = Math.random() > 0.7 ? '#60a5fa' : '#4ade80'; // bright blue/green

            container.appendChild(line);

            // Fade and remove after 6-10s
            const duration = Math.random() * 4000 + 6000;
            setTimeout(() => {
                line.style.transition = 'opacity 1s ease';
                line.style.opacity = '0';
                setTimeout(() => line.remove(), 1000);
            }, duration);
        };

        // Initial burst
        for (let i = 0; i < 6; i++) setTimeout(addLine, i * 300);
        intervalId = setInterval(addLine, 1200);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    opacity: 0.30,
                    pointerEvents: 'none',
                }}
            />
            <div
                ref={linesRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    fontFamily: "'Fira Code', monospace",
                }}
            />
        </>
    );
}
