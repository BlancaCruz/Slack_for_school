/**
 * Task Hierarchy Response Structure
 * 
 * Follows the Design Principle: Information Architecture Under Stress
 * - verification: Source of Truth constraints (actionable immediately)
 * - escalation: Help requests & collaboration triggers
 * - context: Timeline & ambient pressure info
 */

const mockVerificationTasks = [
  {
    id: 'sprint-ai-logic',
    title: 'Sprint: AI Logic Constraints',
    priority: 'URGENT',
    source: 'system',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Resolve recursion depth conflict in prompt_iter_v2',
    context: 'Source of Truth - This is blocking all downstream work',
    status: 'in-progress',
    assignee: 'Alex_Stitch',
    actionability: 'verification',
    visualHierarchy: 1,
    stressWeight: 'critical',
    visualTint: 'red'
  }
];

const mockEscalationTasks = [
  {
    id: 'prompt-lib-v2',
    title: 'Prompt Library V2',
    priority: 'HIGH',
    source: 'lms',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'System Constraints Document',
    context: 'Instructor Status: Offline • Drop a Flare if stuck',
    status: 'pending',
    assignee: 'Alex_Stitch',
    actionability: 'escalation',
    visualHierarchy: 2,
    stressWeight: 'high',
    visualTint: 'blue',
    escalationPath: 'flare'
  }
];

const mockContextTasks = [
  {
    id: 'fellowship-random',
    title: 'Fellowship Random',
    priority: 'LOW',
    source: 'slack',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Social Chatter',
    context: '12 new messages',
    status: 'pending',
    assignee: 'Alex_Stitch',
    actionability: 'context',
    visualHierarchy: 3,
    stressWeight: 'background',
    visualTint: 'grey'
  }
];

export async function GET(req) {
  try {
    return Response.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        hierarchy: {
          verification: mockVerificationTasks,
          escalation: mockEscalationTasks,
          context: mockContextTasks
        },
        errors: {
          verification: null,
          escalation: null,
          context: null
        }
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        hierarchy: {
          verification: mockVerificationTasks, // Always return verification, even on error
          escalation: mockEscalationTasks,     // Try to return escalation
          context: [] // Context is optional, can be empty on error
        },
        errors: {
          verification: null,
          escalation: null,
          context: err.message // Log context failure only
        }
      },
      { status: 200 } // Still return 200 to allow graceful degradation
    );
  }
}
