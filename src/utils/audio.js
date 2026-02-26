/**
 * Audio Utility for Portfolio
 * Manages sound effects with pre-loading and multi-instance playback
 */

const SOUNDS = {
    KEYBOARD_CLICK: 'https://raw.githubusercontent.com/extratone/macOSsystemsounds/main/mp3/Input.mp3', // Snappy macOS-style click
    DATA_BLEEP: 'https://raw.githubusercontent.com/extratone/macOSsystemsounds/main/mp3/Tink.mp3',      // Subtle macOS Tink bleep
};

const audioCache = {};

export const playSound = (soundKey, volume = 0.4) => {
    const url = SOUNDS[soundKey];
    if (!url) return;

    // Create a new audio instance each time to allow overlapping sounds
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(err => console.debug('Audio play blocked:', err));
};

export const UI_SOUNDS = {
    CLICK: 'KEYBOARD_CLICK',
    BLEEP: 'DATA_BLEEP',
};
