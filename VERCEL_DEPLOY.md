# Vercel Deployment — Quick Guide

This repository is ready to deploy as a static site. Use one of the options below.

Option A — Deploy via GitHub (recommended)

1. Initialize git in this folder (if not already):

```bash
git init
git add .
git commit -m "Initial: add site previews and deploy config"
```

2. Push to GitHub (create a repo on GitHub first), then:

```bash
git remote add origin git@github.com:<your-username>/<repo>.git
git push -u origin main
```

3. Go to https://vercel.com, sign in with GitHub, and import the repository. Vercel will detect a static project and deploy automatically. You can configure the project name and team during import.

Option B — Deploy directly with the Vercel CLI

1. Install the Vercel CLI if you haven't:

```bash
npm i -g vercel
```

2. From the project root run:

```bash
vercel
```

Follow the interactive prompts. The first deploy will create a project and provide a live URL. Subsequent `vercel --prod` will promote deployments to production.

Notes
- The root `index.html` provides links to all previews.
- Ensure images are reachable from the web (not local paths) so they appear on the deployed site.
- If you want a custom domain, add it in the Vercel dashboard after deployment.
