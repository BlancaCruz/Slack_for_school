/**
 * /api/tasks.js
 * Fetch and prioritize tasks from LMS, GitHub, and Slack.
 * 
 * MVP: Returns mock data. In production, integrate with:
 * - LMS API (Canvas, Blackboard, etc.)
 * - GitHub API (for project deadlines)
 * - Slack Web API (for pinned messages, channel topics)
 */

const mockTasks = [
  {
    id: 'sprint-ai-logic',
    title: 'Sprint: AI Logic Constraints',
    priority: 'URGENT',
    source: 'slack',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Resolve recursion depth conflict in prompt_iter_v2',
    context: 'Instructor Offline • Drop a Flare',
    status: 'in-progress',
    assignee: 'Alex_Stitch'
  },
  {
    id: 'prompt-lib-v2',
    title: 'Prompt Library V2',
    priority: 'HIGH',
    source: 'lms',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'System Constraints Document',
    context: 'Attachment provided',
    status: 'pending',
    assignee: 'Alex_Stitch'
  },
  {
    id: 'fellowship-random',
    title: 'Fellowship Random',
    priority: 'LOW',
    source: 'slack',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Social Chatter',
    context: '12 new messages',
    status: 'pending',
    assignee: 'Alex_Stitch'
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, priority } = req.query;

  let tasks = mockTasks;

  // Filter by priority if provided
  if (priority) {
    tasks = tasks.filter(t => t.priority === priority.toUpperCase());
  }

  // Sort by urgency
  tasks.sort((a, b) => {
    const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  res.status(200).json({
    success: true,
    data: tasks,
    count: tasks.length,
    timestamp: new Date().toISOString()
  });
}
