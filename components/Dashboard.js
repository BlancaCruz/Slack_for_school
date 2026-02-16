'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MiddlePanel from './MiddlePanel';
import ContextInspector from './ContextInspector';
import styles from './Dashboard.module.css';

// Per-tier fallback states for graceful degradation
const SAFE_STATE_VERIFICATION = [
  {
    id: 'safe-1',
    title: 'Code Constraints',
    priority: 'URGENT',
    source: 'System',
    dueDate: '2026-02-15',
    description: 'Review current sprint constraints',
    context: 'Use Flare system for help',
    status: 'in-progress',
    assignee: 'system',
    actionability: 'verification',
    visualHierarchy: 1,
    stressWeight: 'critical',
    visualTint: 'red'
  }
];

const SAFE_STATE_ESCALATION = [];
const SAFE_STATE_CONTEXT = [];

export default function Dashboard() {
  const [taskHierarchy, setTaskHierarchy] = useState({
    verification: [],
    escalation: [],
    context: []
  });
  const [hierarchyErrors, setHierarchyErrors] = useState({
    verification: null,
    escalation: null,
    context: null
  });
  const [flares, setFlares] = useState([]);
  const [sanctuary, setSanctuary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API with hierarchical structure
  // Implements graceful degradation: verification is always maintained,
  // escalation attempts to load, context is optional
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();

        // Destructure the hierarchical response
        const { hierarchy = {}, errors = {} } = data;
        const { verification = [], escalation = [], context = [] } = hierarchy;

        // Apply graceful degradation per tier
        setTaskHierarchy({
          verification: Array.isArray(verification) && verification.length > 0 ? verification : SAFE_STATE_VERIFICATION,
          escalation: Array.isArray(escalation) ? escalation : SAFE_STATE_ESCALATION,
          context: Array.isArray(context) ? context : SAFE_STATE_CONTEXT
        });

        // Log any per-tier errors for auditing
        setHierarchyErrors({
          verification: errors?.verification || null,
          escalation: errors?.escalation || null,
          context: errors?.context || null
        });
      } catch (err) {
        setError(err.message);
        // Apply all-tier fallback
        setTaskHierarchy({
          verification: SAFE_STATE_VERIFICATION,
          escalation: SAFE_STATE_ESCALATION,
          context: SAFE_STATE_CONTEXT
        });
        setHierarchyErrors({
          verification: err.message,
          escalation: err.message,
          context: err.message
        });
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

  // Fetch flares from API
  useEffect(() => {
    const fetchFlares = async () => {
      const res = await fetch('/api/flare');
      if (res.ok) {
        const data = await res.json();
        setFlares(Array.isArray(data) ? data : []);
      }
    };

    fetchFlares();
    const interval = setInterval(fetchFlares, 5000);
    return () => clearInterval(interval);
  }, []);

  // Log hierarchy errors (verification is critical, escalation is warning, context is silent)
  useEffect(() => {
    if (hierarchyErrors.verification) {
      console.error('[ERROR - CRITICAL] Verification tier failed:', hierarchyErrors.verification);
    }
    if (hierarchyErrors.escalation) {
      console.warn('[ERROR - WARNING] Escalation tier failed:', hierarchyErrors.escalation);
    }
    if (hierarchyErrors.context) {
      console.debug('[ERROR - SILENT] Context tier failed:', hierarchyErrors.context);
    }
  }, [hierarchyErrors]);

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

  // Merge all task tiers for components that need full task list
  const allTasks = [
    ...taskHierarchy.verification,
    ...taskHierarchy.escalation,
    ...taskHierarchy.context
  ];

  return (
    <div className={`${styles.viewport} ${sanctuary ? styles.focused : ''}`}>
      {/* Left Panel: Priority HUD (always sharp) */}
      <Sidebar 
        taskHierarchy={taskHierarchy}
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
          taskHierarchy={taskHierarchy}
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
