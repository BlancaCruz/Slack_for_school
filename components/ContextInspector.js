'use client';

import { useState } from 'react';
import styles from './ContextInspector.module.css';

export default function ContextInspector({ flares, onFlare, isFocused }) {
  const [flareMessage, setFlareMessage] = useState('');
  const [sentFlare, setSentFlare] = useState(null);

  const handleSendFlare = async (e) => {
    e.preventDefault();
    if (!flareMessage.trim()) return;

    await onFlare({
      userId: 'user-' + Date.now(),
      message: flareMessage,
      targetAudience: 'mentors',
    });

    setSentFlare({
      message: flareMessage,
      timestamp: new Date(),
    });

    setFlareMessage('');

    // Auto-clear confirmation after 5 seconds
    setTimeout(() => setSentFlare(null), 5000);
  };

  const recentFlare = flares[0];

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <h2>Context Inspector</h2>
        <p>Flare Status & Help</p>
      </header>

      <div className={styles.content}>
        {/* Flare Status Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>🚨 Flare Status</h3>

          {sentFlare ? (
            <div className={styles.flareDropped}>
              <div className={styles.checkmark}>✓</div>
              <div className={styles.flareMessage}>Flare Dropped!</div>
              <div className={styles.flareEta}>
                <span className={styles.icon}>⏱️</span>
                <span>~5m response</span>
              </div>
            </div>
          ) : recentFlare ? (
            <div className={styles.flareActive}>
              <div className={styles.transmitting}>
                <div className={styles.dot}></div>
                <span>Transmitting...</span>
              </div>
              <div className={styles.flareContent}>
                <p className={styles.flareText}>{recentFlare.message}</p>
                <span className={styles.flareTime}>
                  {new Date(recentFlare.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.noFlare}>
              <p>No active flares</p>
            </div>
          )}
        </div>

        {/* Flare Input Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>📡 Send Flare</h3>
          <form onSubmit={handleSendFlare} className={styles.form}>
            <textarea
              value={flareMessage}
              onChange={(e) => setFlareMessage(e.target.value)}
              placeholder="What blocker do you need help with?"
              className={styles.input}
              rows="4"
            />
            <button
              type="submit"
              className={styles.button}
              disabled={!flareMessage.trim()}
            >
              Drop Flare 📡
            </button>
          </form>
        </div>

        {/* Shield Info */}
        <div className={styles.section}>
          <div className={styles.shieldInfo}>
            <div className={styles.shieldIcon}>🛡️</div>
            <div className={styles.shieldText}>
              <strong>Safety Net Active</strong>
              <p>Your distress signal is pinned here. Stay focused while help is on the way.</p>
            </div>
          </div>
        </div>
      </div>

      {isFocused && (
        <div className={styles.focusIndicator}>
          <span className={styles.pulse}></span>
          FOCUSED
        </div>
      )}
    </aside>
  );
}
