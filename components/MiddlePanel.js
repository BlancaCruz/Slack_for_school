'use client';

import styles from './MiddlePanel.module.css';

export default function MiddlePanel({ taskHierarchy, loading, error, isFocused }) {
  // Show context and escalation tasks as "flow/chat"
  // Verification tier stays in Sidebar (always sharp)
  const escalationTasks = taskHierarchy?.escalation || [];
  const contextTasks = taskHierarchy?.context || [];
  const flowTasks = [...escalationTasks, ...contextTasks];

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
                  Connected to Sanctuary Mode. Verification tasks shown in Sidebar (red). Escalation & Context shown here.
                </p>
              </div>
            </div>

            {/* Escalation tasks - blue tinted in flow */}
            {escalationTasks.map((task, idx) => (
              <div key={task.id} className={styles.message} style={{
                borderLeftColor: 'rgba(29, 155, 209, 0.3)',
                backgroundColor: 'rgba(29, 155, 209, 0.02)'
              }}>
                <div className={styles.messageAvatar}>🔵</div>
                <div className={styles.messageBody}>
                  <div className={styles.messageHeader}>
                    <span className={styles.author}>{task.source || 'Escalation'}</span>
                    <span className={styles.time}>Escalate</span>
                  </div>
                  <p className={styles.messageText}>{task.title}</p>
                  <small className={styles.messageSubtext}>{task.description}</small>
                </div>
              </div>
            ))}

            {/* Context tasks - grey tinted in flow */}
            {contextTasks.map((task) => (
              <div key={task.id} className={styles.message} style={{
                borderLeftColor: 'rgba(150, 150, 150, 0.2)',
                backgroundColor: 'rgba(150, 150, 150, 0.02)'
              }}>
                <div className={styles.messageAvatar}>⚙️</div>
                <div className={styles.messageBody}>
                  <div className={styles.messageHeader}>
                    <span className={styles.author}>{task.source || 'Context'}</span>
                    <span className={styles.time}>Reference</span>
                  </div>
                  <p className={styles.messageText}>{task.title}</p>
                  <small className={styles.messageSubtext}>{task.description}</small>
                </div>
              </div>
            ))}

            {flowTasks.length === 0 && (
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
