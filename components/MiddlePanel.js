'use client';

import styles from './MiddlePanel.module.css';

export default function MiddlePanel({ tasks, loading, error, isFocused }) {
  // Show only non-urgent tasks as "flow/chat"
  const flowTasks = tasks.filter(t => t.priority !== 'URGENT');

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <h2>Flow Stage</h2>
        <p>Messages & Task Updates</p>
      </header>

      <div className={styles.content}>
        {error && (
          <div className={styles.error}>
            ⚠️ Error: {error}
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>Loading flow...</div>
        ) : (
          <>
            {/* System Message */}
            <div className={styles.message}>
              <div className={styles.messageAvatar}>🤖</div>
              <div className={styles.messageBody}>
                <div className={styles.messageHeader}>
                  <span className={styles.author}>System</span>
                  <span className={styles.time}>just now</span>
                </div>
                <p className={styles.messageText}>
                  Connected to Sanctuary Mode. All priority alerts will bypass the flow.
                </p>
              </div>
            </div>

            {/* Flow tasks as messages */}
            {flowTasks.length > 0 ? (
              flowTasks.map((task, idx) => (
                <div key={task.id} className={styles.message}>
                  <div className={styles.messageAvatar}>{idx === 0 ? '👤' : '💬'}</div>
                  <div className={styles.messageBody}>
                    <div className={styles.messageHeader}>
                      <span className={styles.author}>{task.source}</span>
                      <span className={styles.time}>{task.priority}</span>
                    </div>
                    <p className={styles.messageText}>{task.title}</p>
                    <small className={styles.messageSubtext}>{task.description}</small>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                <p>No flow messages. All clear! ✨</p>
              </div>
            )}
          </>
        )}
      </div>

      {isFocused && (
        <div className={styles.focusOverlay}>
          <div className={styles.focusLabel}>🛡️ FOCUSED MODE</div>
        </div>
      )}
    </div>
  );
}
