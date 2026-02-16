'use client';

import SanctuaryToggleRadix from './SanctuaryToggleRadix';
import styles from './Sidebar.module.css';

export default function Sidebar({ taskHierarchy, sanctuary, onSanctuaryChange, onFlare, recentFlares }) {
  // Extract verification tasks (always shown with red tint)
  const verificationTasks = taskHierarchy?.verification || [];
  // Extract escalation tasks (shown with blue tint)
  const escalationTasks = taskHierarchy?.escalation || [];

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

      {/* Sanctuary Mode Toggle - Using Radix UI */}
      <SanctuaryToggleRadix 
        sanctuary={sanctuary}
        onSanctuaryChange={onSanctuaryChange}
      />

      {/* Priority Funnel */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Priority Funnel</h3>
        
        {/* Verification Tasks - Red tint, critical actionability */}
        {verificationTasks.map((task) => (
          <div key={task.id} className={`${styles.taskCard} ${styles.verification}`} style={{
            borderLeftColor: 'rgba(224, 30, 90, 0.5)',
            backgroundColor: 'rgba(224, 30, 90, 0.05)'
          }}>
            <div className={styles.taskHeader}>
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={styles.urgentBadge} style={{backgroundColor: '#E01E5A'}}>VERIFY</span>
            </div>
            <div className={styles.taskMeta}>
              <span className={styles.pulse}></span>
              <span className={styles.taskContext}>{task.description}</span>
            </div>
          </div>
        ))}

        {/* Escalation Tasks - Blue tint, high actionability */}
        {escalationTasks.map((task) => (
          <div key={task.id} className={`${styles.taskCard} ${styles.escalation}`} style={{
            borderLeftColor: 'rgba(29, 155, 209, 0.3)',
            backgroundColor: 'rgba(29, 155, 209, 0.02)'
          }}>
            <div className={styles.taskHeader}>
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={styles.urgentBadge} style={{backgroundColor: '#1D9BD1'}}>ESCALATE</span>
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
