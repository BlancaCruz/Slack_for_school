/**
 * /api/metrics.js
 * Return performance metrics (token usage, latency, deep work timer).
 * MVP: Returns mock data. In production, integrate with observability stack.
 */

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const metrics = {
    timestamp: new Date().toISOString(),
    tokens: {
      used: 14200,
      limit: 20000,
      percentUsed: 71
    },
    latency: {
      avg: 240,
      unit: 'ms'
    },
    deepWork: {
      sessionStart: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      elapsedMinutes: 45,
      focusScore: 0.92
    },
    structuralFidelity: 0.984,
    constraintTension: 'High'
  };

  res.status(200).json({
    success: true,
    data: metrics
  });
}
