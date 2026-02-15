'use client';

import styles from './MainArea.module.css';

export default function MainArea({ tasks, loading, error }) {
  return (
    <main className={styles.main}>
      <div className="content-layer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <header className={styles.header}>
          <h1>Slack for School HUD</h1>
          <p>Your focus-first task manager</p>
        </header>

        <div className={styles.content}>
          {error && (
            <div className={styles.error}>
              ⚠️ Error: {error}
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>
              <p>Loading your tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className={styles.empty}>
              <p>No tasks. You're all caught up! ✨</p>
            </div>
          ) : (
            <div className={styles.taskGrid}>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function TaskCard({ task }) {
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div className={`${styles.card} ${styles[task.priority.toLowerCase()]}`}>
      <div className={styles.cardTop}>
        <h3 className={styles.cardTitle}>{task.title}</h3>
        <span className={styles.badge}>{task.priority}</span>
      </div>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.cardMeta}>
        <span className={styles.source}>{task.source}</span>
        <span className={styles.context}>{task.context}</span>
      </div>
      <div className={styles.cardFooter}>
        <span className={`${styles.date} ${isOverdue ? styles.overdue : ''}`}>
          {dueDate.toLocaleDateString()}
        </span>
        <span className={styles.status}>{task.status}</span>
      </div>
    </div>
  );
}
