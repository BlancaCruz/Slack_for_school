'use client';

import { useState } from 'react';
import styles from './FlarePanel.module.css';

export default function FlarePanel({ onFlare, recentFlares = [] }) {
  const [message, setMessage] = useState('');
  const [taskId, setTaskId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await onFlare({
      userId: 'user-' + Date.now(),
      taskId: taskId || undefined,
      message,
      targetAudience: 'mentors',
    });

    setMessage('');
    setTaskId('');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🚨 Drop a Flare</h3>
      <p className={styles.description}>
        Signal for help without DM distraction
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What do you need help with?"
          className={styles.input}
          rows="3"
        />
        <button type="submit" className={styles.button} disabled={!message.trim()}>
          Send Flare 📡
        </button>
      </form>

      {recentFlares.length > 0 && (
        <div className={styles.recent}>
          <h4 className={styles.recentTitle}>Recent Flares</h4>
          <div className={styles.flareList}>
            {recentFlares.map((flare) => (
              <div key={flare.id} className={styles.flareItem}>
                <p className={styles.flareMessage}>{flare.message}</p>
                <span className={styles.flareTime}>
                  {new Date(flare.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
