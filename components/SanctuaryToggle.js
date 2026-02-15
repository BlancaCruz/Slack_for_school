'use client';

import { useState, useRef } from 'react';
import styles from './SanctuaryToggle.module.css';

export default function SanctuaryToggle({ active, onChange }) {
  const [isHeld, setIsHeld] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseDown = () => {
    setIsHeld(true);
  };

  const handleMouseUp = () => {
    setIsHeld(false);
    clearTimeout(timeoutRef.current);
  };

  const handleLongPress = () => {
    if (isHeld) {
      onChange(!active);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🏛️ Sanctuary Mode</h3>
      <p className={styles.description}>
        {active
          ? 'Deep work activated. Distractions hidden.'
          : 'Enable to blur distractions and focus.'}
      </p>

      <button
        className={`${styles.button} ${active ? styles.active : ''}`}
        onMouseDown={() => {
          handleMouseDown();
          timeoutRef.current = setTimeout(() => {
            if (isHeld) handleLongPress();
          }, 800);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => {
          handleMouseDown();
          timeoutRef.current = setTimeout(() => {
            if (isHeld) handleLongPress();
          }, 800);
        }}
        onTouchEnd={handleMouseUp}
      >
        {active ? '✓ Active' : 'Hold to Activate'}
      </button>

      <div className={styles.hint}>
        Hold for 0.8s to toggle
      </div>
    </div>
  );
}
