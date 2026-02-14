# Local Testing Guide

This guide walks you through testing the backend API locally before deploying to Vercel.

## Prerequisites

1. **Node.js 16+** — Download from [nodejs.org](https://nodejs.org)
2. **Vercel CLI** — Install via npm:
   ```bash
   npm install -g vercel
   ```

## Setup

1. Navigate to the project root:
   ```bash
   cd /Users/blancacruz/Desktop/Slack_for_school
   ```

2. Create `.env.local` (if not already created):
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and fill in test values:
   ```
   TEST_PASSWORD=sanctuary_mode_v1
   WEBHOOK_SECRET=test_webhook_secret_123
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Run the Dev Server

Start the Vercel dev server in one terminal:

```bash
vercel dev
```

You should see output like:
```
> Ready! Available at http://localhost:3000
```

## Test the API

In a new terminal, run the automated test script:

```bash
bash test-api.sh
```

Or manually test individual endpoints using `curl`:

### 1. Health Check
```bash
curl http://localhost:3000/api/health | jq
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-14T...",
  "version": "1.0.0"
}
```

### 2. Get All Tasks
```bash
curl http://localhost:3000/api/tasks | jq
```

Expected: List of prioritized tasks (URGENT, HIGH, etc.)

### 3. Get Urgent Tasks Only
```bash
curl "http://localhost:3000/api/tasks?priority=URGENT" | jq
```

### 4. Authenticate
```bash
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"userId":"alex_stitch","password":"sanctuary_mode_v1"}' | jq
```

Expected response with auth token.

### 5. Drop a Flare (Help Request)
```bash
curl -X POST http://localhost:3000/api/flare \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alex_stitch",
    "taskId": "sprint-ai-logic",
    "message": "Stuck on recursion depth",
    "context": "Error: Maximum call stack size exceeded",
    "targetAudience": "mentors"
  }' | jq
```

### 6. Get Flares
```bash
curl "http://localhost:3000/api/flare?userId=alex_stitch" | jq
```

### 7. Get Performance Metrics
```bash
curl http://localhost:3000/api/metrics | jq
```

Expected: Token usage, latency, deep work timer.

### 8. Trigger Sync (with webhook token)
```bash
curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Token: test_webhook_secret_123" \
  -d '{"source":"slack"}' | jq
```

## Frontend Integration Test

Open one of the preview HTML files and test API calls from the browser console:

```js
// Test API call from browser
fetch('/api/tasks')
  .then(res => res.json())
  .then(data => console.log('Tasks:', data))
  .catch(err => console.error('Error:', err));
```

## Troubleshooting

### Server won't start
- Make sure Node.js is installed: `node --version`
- Make sure Vercel CLI is installed: `vercel --version`
- Check that `.env.local` exists in the project root

### CORS errors
- All API endpoints have CORS headers enabled
- If you still see errors, check the browser console for the exact error

### "Module not found" errors
- Run `npm install` again
- Check that `package.json` exists in the project root

## Next: Deploy to Production

Once local testing passes, deploy to Vercel:

```bash
git init
git add .
git commit -m "Add backend API and local testing"
git remote add origin git@github.com:YOUR_USERNAME/slack-for-school.git
git push -u origin main
```

Then connect the repo to Vercel via the dashboard at https://vercel.com.

---

See [api/README.md](api/README.md) for full API documentation.
