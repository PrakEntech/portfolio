/**
 * Audio Utility for Portfolio
 * Manages sound effects with pre-loading and multi-instance playback
 */

const SOUNDS = {
    KEYBOARD_CLICK: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Snappy laptop click
    DATA_BLEEP: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',   // Subtle UI bleep
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
