'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MiddlePanel from './MiddlePanel';
import ContextInspector from './ContextInspector';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [flares, setFlares] = useState([]);
  const [sanctuary, setSanctuary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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

      {/* Middle Panel: Flow Stage (ghosted when focused) */}
      <MiddlePanel 
        tasks={tasks}
        loading={loading}
        error={error}
        isFocused={sanctuary}
      />

      {/* Right Panel: Context Inspector with Flare Status */}
      <ContextInspector 
        flares={flares}
        onFlare={handleFlare}
        isFocused={sanctuary}
      />
    </div>
  );
}
