'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ tasks, sanctuary, onSanctuaryChange, onFlare, recentFlares }) {
  const [isHeld, setIsHeld] = useState(false);

  const urgentTasks = tasks.filter(t => t.priority === 'URGENT');
  const highTasks = tasks.filter(t => t.priority === 'HIGH');

  const handleSanctuaryPress = () => {
    setIsHeld(true);
    const timer = setTimeout(() => {
      onSanctuaryChange(!sanctuary);
      setIsHeld(false);
    }, 800);
    
    return () => clearTimeout(timer);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>🎯 STITCH BLUEPRINT</h2>
        <div className={styles.user}>
          <span className={styles.statusDot}></span>
          <span className={styles.username}>Alex_Stitch</span>
        </div>
      </div>

      {/* Sanctuary Mode Toggle */}
      <button
        className={`${styles.sanctuaryBtn} ${sanctuary ? styles.active : ''}`}
        onMouseDown={handleSanctuaryPress}
        onMouseUp={() => setIsHeld(false)}
        onTouchStart={handleSanctuaryPress}
        onTouchEnd={() => setIsHeld(false)}
      >
        <span className={styles.icon}>⚡</span>
        <div className={styles.btnText}>
          <div className={styles.btnTitle}>Focus Switch</div>
          <div className={styles.btnSubtitle}>Enter Sanctuary</div>
        </div>
      </button>

      {/* Priority Funnel */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Priority Funnel</h3>
        
        {urgentTasks.map((task) => (
          <div key={task.id} className={`${styles.taskCard} ${styles.urgent}`}>
            <div className={styles.taskHeader}>
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={styles.urgentBadge}>URGENT</span>
            </div>
            <div className={styles.taskMeta}>
              <span className={styles.pulse}></span>
              <span className={styles.taskContext}>{task.context}</span>
            </div>
          </div>
        ))}

        {highTasks.map((task) => (
          <div key={task.id} className={`${styles.taskCard} ${styles.high}`}>
            <div className={styles.taskHeader}>
              <span className={styles.taskTitle}>{task.title}</span>
            </div>
            <div className={styles.taskDescription}>{task.description}</div>
          </div>
        ))}
      </div>

      {/* Environment Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Tokens</span>
          <span className={styles.statValue}>14.2k</span>
        </div>
        <div className={styles.statBar}>
          <div className={styles.statBarFill}></div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Latency</span>
          <span className={styles.statValue}>240ms</span>
        </div>
      </div>

      {/* Flare System removed - moved to Right Panel */}

      {/* Footer */}
      <div className={styles.footer}>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOs9jHOdyREINpvYwMyc8BxrKMF8yC0Dih096pculaPxZuyggECE9A5Sqa-sniTy7c3YTZe2s92zzyhel_fH-3JDHKB4NfuK4GY4LH7YIQdDisC6yXkQSdGquDnodjwxUvYVTL2ZFDEnprroHUkJh-PxtnLOJmNQ_WSZq-DV-vorRkRsG7fcrkugSG5FBmA8jrahITvSReXeMHDxZ9JcjXGqSXYwqLa9dEvyfVYAyac9FydnINB8E4jxd-4_7X7ueUf-KRcgjktc9z"
          alt="Alex_Stitch"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <div className={styles.userName}>Alex_Stitch</div>
          <div className={styles.userRole}>System Architect</div>
        </div>
      </div>
    </aside>
  );
}
