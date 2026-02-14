# Slack for School — Backend API

This is the Vercel serverless backend for the AI-Native HUD.

## Endpoints

All endpoints return JSON and support CORS.

### Health Check
- **GET** `/api/health`
- Returns backend status and timestamp.

### Tasks (Prioritization)
- **GET** `/api/tasks?priority=URGENT`
- Fetches tasks from Slack, LMS, and GitHub.
- Query params:
  - `priority` — Filter by URGENT, HIGH, MEDIUM, LOW
  - `userId` — Filter by user
- Returns sorted task list with deadlines.

### Flare System (Help Requests)
- **POST** `/api/flare`
- Drop a context-heavy help request.
- Body:
  ```json
  {
    "userId": "alex_stitch",
    "taskId": "sprint-ai-logic",
    "message": "Stuck on recursion depth.",
    "context": "Error log or code snippet",
    "targetAudience": "mentors"
  }
  ```
- Returns flare with ID and status.

- **GET** `/api/flare?userId=alex_stitch`
- Fetch flares for a user.

### Sync (External Data)
- **POST** `/api/sync`
- Trigger sync from Slack, GitHub, LMS.
- Requires `X-Webhook-Token` header.
- Body:
  ```json
  {
    "source": "slack"
  }
  ```
- Returns sync status.

### Metrics (Performance)
- **GET** `/api/metrics`
- Returns token usage, latency, deep work timer.

### Auth
- **POST** `/api/auth`
- MVP: simple bearer token auth.
- Body:
  ```json
  {
    "userId": "alex_stitch",
    "password": "YOUR_TEST_PASSWORD"
  }
  ```
- Returns JWT-like token.

## Environment Variables

Create a `.env.local` file in the project root:

```
TEST_PASSWORD=your_test_password_here
WEBHOOK_SECRET=your_webhook_secret_here
SLACK_BOT_TOKEN=xoxb-your-slack-token
SLACK_SIGNING_SECRET=your-signing-secret
GITHUB_TOKEN=ghp_your_github_token
LMS_API_KEY=your_lms_api_key
LMS_BASE_URL=https://your-lms-instance.com
```

## Local Development

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
vercel dev
```

This runs your API locally at `http://localhost:3000/api/*`.

## Deployment to Vercel

1. Push your code to GitHub.
2. Connect the repo to Vercel via the dashboard.
3. Add environment variables in Vercel project settings.
4. Deploy (automatic on push to main).

## Production Roadmap (Post-MVP)

- [ ] Replace mock data with real Slack, GitHub, LMS integrations.
- [ ] Add database (MongoDB, Supabase, DynamoDB) for persistent flares and user state.
- [ ] Implement OAuth2 auth (Google, GitHub, Slack).
- [ ] Add AI-powered task ranking (using OpenAI or similar).
- [ ] Set up webhooks for real-time Slack and GitHub events.
- [ ] Add observability (Datadog, New Relic, Sentry).
- [ ] Implement rate limiting and request logging.

## Testing

To test endpoints locally:

```bash
# Health check
curl http://localhost:3000/api/health

# Get tasks
curl http://localhost:3000/api/tasks

# Auth
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"userId":"alex_stitch","password":"test123"}'

# Drop a flare
curl -X POST http://localhost:3000/api/flare \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alex_stitch",
    "message": "Stuck on recursion",
    "targetAudience": "mentors"
  }'
```

---

**Note**: This is an MVP backend. It returns mock data to validate the frontend design. Replace with real integrations before production.
