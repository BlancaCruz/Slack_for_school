'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './SanctuaryToggleRadix.module.css';

export default function SanctuaryToggle({ sanctuary, onSanctuaryChange }) {
  const [pressTimer, setPressTimer] = useState(0);
  const timerRef = useRef(null);
  const duration = 1500; // 1.5 seconds of friction for EXIT only

  const startPress = () => {
    // Asymmetric friction: ENTER is easy (instant), EXIT requires 1.5s hold
    if (!sanctuary) {
      // Entering Sanctuary: just click, no friction
      onSanctuaryChange(true);
    } else {
      // Exiting Sanctuary: require 1.5s hold with progress indicator
      timerRef.current = setInterval(() => {
        setPressTimer((prev) => {
          if (prev >= 100) {
            clearInterval(timerRef.current);
            onSanctuaryChange(false); // Exit Sanctuary
            return 0;
          }
          // Increment progress: 100% over 1500ms = 2% every 30ms (100/50 intervals)
          return prev + 2;
        });
      }, 30); // Update every 30ms for smooth animation
    }
  };

  const cancelPress = () => {
    // User let go early - cancel and reset
    clearInterval(timerRef.current);
    setPressTimer(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // SVG circle circumference for progress ring
  const circumference = 2 * Math.PI * 30; // r=30
  const strokeDashoffset = circumference - (circumference * pressTimer) / 100;

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <button
          onMouseDown={startPress}
          onMouseUp={cancelPress}
          onMouseLeave={cancelPress}
          onTouchStart={startPress}
          onTouchEnd={cancelPress}
          className={`${styles.button} ${sanctuary ? styles.active : styles.inactive}`}
        >
          {/* SVG Progress Ring - only visible when exiting */}
          {sanctuary && (
            <svg className={styles.progressRing} viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="3"
                className={styles.progressBase}
                strokeDasharray={circumference}
                strokeDashoffset="0"
              />
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="3"
                className={styles.progressFill}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.03s linear' }}
              />
            </svg>
          )}

          {/* Button Text */}
          <span className={styles.buttonText}>
            {sanctuary ? '🛡️' : '🔓'}
          </span>
        </button>

        {/* Status Label */}
        <div className={styles.statusLabel}>
          <p className={styles.mainText}>
            {sanctuary ? 'SANCTUARY ACTIVE' : 'FOCUS MODE'}
          </p>
          <p className={styles.subText}>
            {sanctuary ? `Hold to Exit (${pressTimer}%)` : 'Click to Enter'}
          </p>
        </div>
      </div>

      {/* Friction Explanation */}
      {sanctuary && pressTimer > 0 && (
        <div className={styles.frictionIndicator}>
          <div className={styles.frictionBar}>
            <div 
              className={styles.frictionFill}
              style={{ width: `${pressTimer}%` }}
            ></div>
          </div>
          <span className={styles.frictionText}>
            {pressTimer < 50 ? 'Keep holding...' : 'Almost there...'}
          </span>
        </div>
      )}
    </div>
  );
}
