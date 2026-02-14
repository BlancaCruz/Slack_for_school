#!/bin/bash
# Local testing script for Slack for School API endpoints
# This simulates API calls and validates responses

API_BASE="http://localhost:3000/api"
WEBHOOK_SECRET="test_webhook_secret_123"

echo "🧪 Slack for School — Local API Test Suite"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo "GET /api/health"
curl -s "$API_BASE/health" | jq '.' 2>/dev/null || echo "⚠️  Server not running. Start with: vercel dev"
echo ""

# Test 2: Get Tasks
echo -e "${YELLOW}Test 2: Get Tasks (All)${NC}"
echo "GET /api/tasks"
curl -s "$API_BASE/tasks" | jq '.' 2>/dev/null || echo "⚠️  Server not running"
echo ""

# Test 3: Get Urgent Tasks
echo -e "${YELLOW}Test 3: Get Urgent Tasks${NC}"
echo "GET /api/tasks?priority=URGENT"
curl -s "$API_BASE/tasks?priority=URGENT" | jq '.' 2>/dev/null || echo "⚠️  Server not running"
echo ""

# Test 4: Auth
echo -e "${YELLOW}Test 4: Authentication${NC}"
echo "POST /api/auth"
curl -s -X POST "$API_BASE/auth" \
  -H "Content-Type: application/json" \
  -d '{"userId":"alex_stitch","password":"sanctuary_mode_v1"}' | jq '.' 2>/dev/null || echo "⚠️  Server not running"
echo ""

# Test 5: Drop a Flare
echo -e "${YELLOW}Test 5: Drop a Flare${NC}"
echo "POST /api/flare"
curl -s -X POST "$API_BASE/flare" \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"alex_stitch",
    "taskId":"sprint-ai-logic",
    "message":"Stuck on recursion depth in prompt_iter_v2",
    "context":"Error: Maximum call stack size exceeded",
    "targetAudience":"mentors"
  }' | jq '.' 2>/dev/null || echo "⚠️  Server not running"
echo ""

# Test 6: Get Metrics
echo -e "${YELLOW}Test 6: Performance Metrics${NC}"
echo "GET /api/metrics"
curl -s "$API_BASE/metrics" | jq '.' 2>/dev/null || echo "⚠️  Server not running"
echo ""

# Test 7: Sync (requires webhook token)
echo -e "${YELLOW}Test 7: Trigger Sync${NC}"
echo "POST /api/sync (with X-Webhook-Token)"
curl -s -X POST "$API_BASE/sync" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Token: $WEBHOOK_SECRET" \
  -d '{"source":"slack"}' | jq '.' 2>/dev/null || echo "⚠️  Server not running or invalid token"
echo ""

echo -e "${GREEN}=========================================="
echo "✅ Test suite complete"
echo -e "==========================================${NC}"
echo ""
echo "To start the backend locally, run:"
echo "  vercel dev"
echo ""
echo "Then run this script again in a new terminal:"
echo "  bash test-api.sh"
