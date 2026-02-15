'use client';

import styles from './TaskList.module.css';

export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tasks. You're all caught up! ✨</p>
      </div>
    );
  }

  const groupedTasks = {
    URGENT: tasks.filter(t => t.priority === 'URGENT'),
    HIGH: tasks.filter(t => t.priority === 'HIGH'),
    LOW: tasks.filter(t => t.priority === 'LOW'),
  };

  return (
    <div className={styles.container}>
      {groupedTasks.URGENT.length > 0 && (
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.urgent}`}>🔴 URGENT</h2>
          {groupedTasks.URGENT.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}

      {groupedTasks.HIGH.length > 0 && (
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.high}`}>🔵 HIGH</h2>
          {groupedTasks.HIGH.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}

      {groupedTasks.LOW.length > 0 && (
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.low}`}>⚪ LOW</h2>
          {groupedTasks.LOW.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}
    </div>
  );
}

function TaskCard({ task }) {
  const dueDate = new Date(task.dueDate);
  const isOverdue = dueDate < new Date();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{task.title}</h3>
        <span className={styles.source}>{task.source}</span>
      </div>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.meta}>
        <span className={styles.context}>{task.context}</span>
        <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
          {dueDate.toLocaleDateString()}
        </span>
      </div>
      <div className={styles.status}>{task.status}</div>
    </div>
  );
}
