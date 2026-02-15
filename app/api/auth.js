/**
 * /api/auth.js
 * Simple bearer token auth for MVP.
 * In production, use OAuth2 (Google, GitHub, Slack) or SAML.
 */

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: 'Missing userId or password' });
  }

  // MVP: Simple check. In production, hash and validate against DB.
  if (userId === 'alex_stitch' && password === process.env.TEST_PASSWORD) {
    const token = Buffer.from(`${userId}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      token,
      userId,
      expiresIn: 86400,
      message: 'Sanctuary Mode unlocked.'
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
