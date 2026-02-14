/**
 * /api/flare.js
 * Drop a "Flare" — a context-heavy help request.
 * Sends urgent signals to peers and mentors without entering DM distraction.
 */

const flares = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { userId, taskId, message, context, targetAudience } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: 'Missing required fields: userId, message' });
    }

    const flare = {
      id: `flare-${Date.now()}`,
      userId,
      taskId,
      message,
      context, // Code snippet, error log, etc.
      targetAudience: targetAudience || 'mentors', // 'peers', 'mentors', 'all'
      timestamp: new Date().toISOString(),
      status: 'active',
      responses: []
    };

    flares.push(flare);

    return res.status(201).json({
      success: true,
      flare,
      message: 'Flare dropped successfully. Mentors are notified.'
    });
  }

  if (req.method === 'GET') {
    const { userId } = req.query;

    let results = flares;
    if (userId) {
      results = flares.filter(f => f.userId === userId || f.targetAudience === 'all');
    }

    return res.status(200).json({
      success: true,
      data: results,
      count: results.length
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
