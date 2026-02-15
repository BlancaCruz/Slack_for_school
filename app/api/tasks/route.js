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

export async function GET(req) {
  return Response.json({
    tasks: mockTasks
  });
}
