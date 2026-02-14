# Slack_for_school — AI-Native HUD Project

An AI-powered "Heads-Up Display" for Slack designed to reduce cognitive overload and enable deep work through **Sanctuary Mode** and intelligent task prioritization.

## Overview

This workspace contains:
- Frontend UI mockups (HTML + Tailwind) with Sanctuary Mode and priority HUD designs.
- Vercel-ready backend with API endpoints for task sync, flare system, and metrics.
- Production-ready deployment configuration.

Projects

- [active_build_hud/code.html](active_build_hud/code.html) — Priority Funnel HUD (mobile-width HUD mockup). See [active_build_hud/screen.png](active_build_hud/screen.png).
- [sanctuary_structural_layering_2/code.html](sanctuary_structural_layering_2/code.html) — Sanctuary Structural Layering (HUD + hierarchy visualization). See [sanctuary_structural_layering_2/screen.png](sanctuary_structural_layering_2/screen.png).

**Stitch Blueprint (Operational HUD + Sanctuary Mode)**

**Structural Layout (Stitch Hierarchy)**
Organize containers in your Layers/Elements panel like this to guarantee stable z-index behavior when Sanctuary Mode activates:

- `main-viewport` — Relative, `w-screen h-screen bg-slate-900`
- `content-layer` — The "World" (this receives the blur)
- `top-nav` — Search bar, profile
- `chat-stage` — Scrolling message feed
- `hud-layer` — The "Sanctuary" (fixed, `right-0`, `h-full`, `w-[280px]`)
- `sanctuary-toggle-container`
- `priority-list` — Red/Blue Cards
- `emergency-flare-anchor`

**Sanctuary CSS (Tailwind + Custom)**
Add the following CSS to your project's stylesheet or a `<style>` panel. Toggle the `sanctuary-active` class on the `body` or `main-viewport`.

```css
/* Apply this class to the body or main-viewport via JS toggle */
.sanctuary-active .content-layer {
	filter: blur(12px) grayscale(80%) brightness(0.4);
	pointer-events: none; /* Disables clicking on social distractions */
	transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* The HUD remains vivid and high-fidelity */
.sanctuary-active .hud-layer {
	border-left: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: -15px 0 45px rgba(0,0,0,0.6);
	background: rgba(15, 23, 42, 0.95); /* Deep Slate */
	backdrop-filter: blur(10px);
}
```

If you want exact branding, I can supply the `Pursuit Aubergine` HEX.

**"Source of Truth" HUD Item (Red Alert)**
Use this Tailwind-flavored markup for the Sprint Constraints card:

```html
<div class="p-4 mb-3 rounded-lg border-l-4 border-red-500 bg-red-500/10 backdrop-blur-sm">
	<div class="flex justify-between items-start">
		<span class="text-[10px] font-bold text-red-400 uppercase tracking-widest">Logic Constraint</span>
		<span class="text-[10px] text-red-400/60">Verification Required</span>
	</div>
	<h3 class="mt-1 text-sm font-semibold text-white leading-tight">
		API must return 404 for missing UUIDs
	</h3>
	<p class="mt-2 text-[11px] text-slate-400 leading-relaxed">
		AI-Prompt Note: Ensure your error handler is explicitly defined in the middleware.
	</p>
</div>
```

**Intentional Friction — Long-Press Exit (JS)**
Use this snippet for the long-press exit button. It drives a CSS-based progress fill and triggers the sanctuary toggle after completion.

```js
let timer;
const btn = document.querySelector('#exit-btn');
const progress = document.querySelector('#btn-progress');

btn.addEventListener('mousedown', () => {
	progress.style.transition = 'width 1.5s linear';
	progress.style.width = '100%';
	timer = setTimeout(() => {
		document.body.classList.remove('sanctuary-active');
		alert("Focus Session Complete. Returning to Coordination.");
	}, 1500);
});

btn.addEventListener('mouseup', () => {
	clearTimeout(timer);
	progress.style.transition = 'none';
	progress.style.width = '0%';
});
```

**Loom Scene (Recording) — Suggested Flow**

1. State A (Standard): `sanctuary-active` off — show chat noise.
2. State B (Transition): Toggle sanctuary — let the 0.6s transition land.
3. State C (Verification): Hover the Red Sprint Card and explain the Source of Truth.
4. State D (Exit): Long-press the exit and show focus returning.

**Deployment Paths**

1. Vercel — recommended for Demo Day (connect GitHub, import, Deploy). Produces a fast, production-ready URL.
2. Netlify Drop — drag-and-drop a folder for an instant temporary URL (good quick link without GitHub).
3. Hybrid — Primary: Vercel; Backup: Loom recording for network failure resiliency.

**Pre-Flight Checklist (Demo Day)**

- Test on Mobile (responsive checks).
- Clean the console of `console.log` calls.
- Host images externally (Cloudinary/Imgur) so they appear on the live site.

**Reflection — Week 5 Wins**

1. Shift from "Flat" UI to Heads-Up Display — Prioritizes verification over coordination; reduces cognitive friction.
2. Cognitive Shielding — Sanctuary Mode's selective ghosting preserves ambient awareness while silencing distractions.
3. Resilience Mindset — Input validation and safe states make the HUD production-ready and stable.
4. Intentional Friction — Long-press exit prevents impulsive interruptions and encourages sustained focus.
5. Data-Driven Orchestration — Integrated agents and feeds make the HUD a living system that surfaces what Alex needs.

**Debrief Questions for Reflection**

- Which win felt like the biggest "Aha!" during the build?
- Pick a specific moment when you faced the "3:00 PM Crisis"—what alternative did you reject, and why did the chosen approach better serve Alex's cognitive state?

If you want, I can:

- Create a GitHub repo and push this project (I can scaffold `.gitignore`, `README`, and an initial commit).
- Prepare a Vercel deployment and walk through the import steps.

---

## Backend API

See [api/README.md](api/README.md) for full endpoint documentation.

### Quick API Overview

The `/api` folder contains Vercel serverless functions:

- **GET** `/api/health` — Health check
- **GET** `/api/tasks` — Fetch prioritized tasks from Slack, LMS, GitHub
- **POST** `/api/flare` — Drop a context-heavy help request
- **GET** `/api/flare` — Retrieve flares
- **POST** `/api/sync` — Trigger external data sync
- **GET** `/api/metrics` — Fetch performance metrics (tokens, latency, deep work timer)
- **POST** `/api/auth` — Simple auth (MVP)

All endpoints support CORS and return JSON.

### Local Development

1. Copy `.env.local.example` to `.env.local` and fill in credentials.
2. Install dependencies: `npm install`
3. Run dev server: `vercel dev`
4. Visit `http://localhost:3000/api/health` to test.

### Frontend Integration Example

```js
// Fetch tasks from the HUD
fetch('/api/tasks?priority=URGENT')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Drop a flare
fetch('/api/flare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'alex_stitch',
    message: 'Stuck on recursion depth',
    targetAudience: 'mentors'
  })
})
  .then(res => res.json())
  .then(flare => console.log('Flare dropped:', flare.id));
```

---

Quick open (from repo root):

```bash
open active_build_hud/code.html \
	sanctuary_structural_layering_2/code.html
```


