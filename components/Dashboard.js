'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MiddlePanel from './MiddlePanel';
import ContextInspector from './ContextInspector';
import styles from './Dashboard.module.css';

// Safe state fallback for resilience sandbox
const SAFE_STATE_TASKS = [
  {
    id: 'safe-1',
    title: 'Code Constraints',
    priority: 'URGENT',
    source: 'System',
    dueDate: '2026-02-15',
    description: 'Review current sprint constraints',
    context: 'Use Flare system for help',
    status: 'in-progress',
    assignee: 'system'
  }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [flares, setFlares] = useState([]);
  const [sanctuary, setSanctuary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API with Resilience Sandbox validation
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        // Validate data structure before using
        setTasks(Array.isArray(data.tasks) && data.tasks.length > 0 ? data.tasks : SAFE_STATE_TASKS);
      } catch (err) {
        setError(err.message);
        // Fall back to safe state on error
        setTasks(SAFE_STATE_TASKS);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Global Escape key interception: prevents accidental exit from Sanctuary Mode
  // While Sanctuary is active, Escape is blocked. User must long-press to exit.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (sanctuary && e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Optionally log or show toast that Escape is disabled
        console.log('🛡️ Sanctuary Mode active - Escape key disabled. Use long-press to exit.');
      }
    };

    window.addEventListener('keydown', handleKeyDown, true); // Use capture phase for priority
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [sanctuary]);

  const handleFlare = async (flareData) => {
    try {
      const res = await fetch('/api/flare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flareData),
      });
      if (!res.ok) throw new Error('Failed to send flare');
      const newFlare = await res.json();
      setFlares([newFlare, ...flares]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.viewport} ${sanctuary ? styles.focused : ''}`}>
      {/* Left Panel: Priority HUD (always sharp) */}
      <Sidebar 
        tasks={tasks} 
        sanctuary={sanctuary} 
        onSanctuaryChange={setSanctuary}
        onFlare={handleFlare}
      />

      {/* Middle Panel Container: Applies sanctuary-aware blur + ghosting */}
      <div 
        className={styles.middlePanelContainer}
        style={sanctuary ? {
          filter: 'blur(12px) grayscale(100%) brightness(0.4)',
          pointerEvents: 'none',
          opacity: 0.4,
          transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
        } : {
          filter: 'blur(0px) grayscale(0%) brightness(1)',
          pointerEvents: 'auto',
          opacity: 1,
          transition: 'all 1000ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <MiddlePanel 
          tasks={tasks}
          loading={loading}
          error={error}
          isFocused={sanctuary}
        />
      </div>

      {/* Right Panel: Context Inspector with Flare Status (stays clear) */}
      <ContextInspector 
        flares={flares}
        onFlare={handleFlare}
        isFocused={sanctuary}
      />
    </div>
  );
}
