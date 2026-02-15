const flares = [];

export async function GET(req) {
  return Response.json({
    flares: flares
  });
}

export async function POST(req) {
  const body = await req.json();
  const { userId, taskId, message, context, targetAudience } = body;

  if (!userId || !message) {
    return Response.json(
      { error: 'Missing required fields: userId, message' },
      { status: 400 }
    );
  }

  const flare = {
    id: `flare-${Date.now()}`,
    userId,
    taskId,
    message,
    context,
    targetAudience: targetAudience || 'mentors',
    timestamp: new Date().toISOString(),
    status: 'active',
    responses: []
  };

  flares.push(flare);

  return Response.json(flare, { status: 201 });
}
