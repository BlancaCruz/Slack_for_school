# Alex's User Journey — The 3:00 PM Crisis

## Persona: Alex

**Role**: Pursuit Fellow (AI-Native Student)
**Context**: Juggling life, work, and intensive curriculum requirements
**Pain Point**: Slack was built for the 3:00 PM watercooler chat, but Alex needs a tool for the 3:00 PM Capstone crisis
**Goal**: Achieve deep work and solve problems under time pressure without losing access to critical support

---

## The Crisis Scenario: 3:00 PM Capstone Crisis

**Setting**: Alex is 1 hour away from a lab deadline. The AI-generated code has a bug. The instructor is offline. The Slack channel is flooded with 47 messages in the last 20 minutes.

**Alex's Mental State**:
- Anxiety: "Am I missing something obvious?"
- Urgency: "Can I get help before the deadline?"
- Pressure: "How much longer can I struggle?"

---

## The Information Hierarchy Under Stress

When Alex is in crisis mode, **not all information is equal**. The design must reflect this truth through a **survival hierarchy**.

### Tier 1: Verification (The Source of Truth) — 🔴 RED ALERT
**Goal**: Validation  
**Question**: "Did I miss a constraint?"  
**Action**: Double-check the AI prompt against the logic constraint  
**Why It's #1 (Diagnostic Phase)**:
- This is the first thing Alex checks when stuck
- If the constraint is violated, nothing else matters
- Fixing the wrong thing wastes precious time
- The "Source of Truth" is the diagnostic tool

**Visual Treatment**: 
- 15px bold text
- 10% red background tint (highest visual weight)
- Border-left-4 in verification-red
- This is the ONLY item with a background tint

### Tier 2: Coordination (Instructor/Peer Help) — 🔵 BLUE STATUS
**Goal**: Escalation  
**Question**: "Is there a human safety net if I can't fix this?"  
**Action**: Decide between "Ask for Help" vs. "Drop a Flare"  
**Why It's #2 (Escalation Phase)**:
- Once Alex confirms they have a bug they can't solve alone, they need to know: "Can I get help NOW?"
- If the instructor is offline, Alex decides to "Drop a Flare" (async help request)
- If the instructor is available, Alex asks in real-time
- This is the escalation valve

**Visual Treatment**:
- Pulsing status indicator (animate opacity 0.4 ↔ 1.0)
- 13px medium text
- Blue accent color (secondary visual weight)
- Icon shows availability status (green dot = online, grey = offline)

### Tier 3: Context (Lab Deadline) — ⏱️ GREY TIMER
**Goal**: Motivation (not method)  
**Question**: "How much longer can I struggle before I give up?"  
**Action**: Provide time context to inform decision (escalate vs. keep trying)  
**Why It's #3 (Motivation Phase, but NOT Actionable)**:
- Counter-intuitive: the deadline is LEAST actionable during crisis
- Alex already KNOWS they're late (they're in crisis mode)
- The deadline is background pressure, not the solution
- It provides motivation but NOT the method to fix it
- Showing it loudly would increase anxiety without helping

**Visual Treatment**:
- 13px grey typography (lowest visual weight)
- No background tint
- Simple text: "Due in 1h 12m"
- Present but not prominent — "there if they look for it"

---

## Why This Hierarchy Matters

**The Old Slack Model** (flat density):
```
Task Title       [15px]
Deadline         [15px]  ← Equal visual weight = confusing
Instructor Name  [15px]
```
Result: Alex sees 3 equally-loud items and freezes. "What do I do first?"

**The Stitch HUD Model** (survival hierarchy):
```
🔴 Source of Truth                [15px] ← RED ALERT (DO THIS FIRST)
   Did I miss a constraint?

🔵 Instructor Status [pulsing]    [13px] ← BLUE STATUS (IF STUCK, GET HELP)
   Instructor Offline • Drop a Flare

⏱️  Due in 1h 12m                [13px] ← GREY TIMER (TIME PRESSURE CONTEXT)
```
Result: Alex's eyes go RED → BLUE → GREY. The hierarchy guides action.

---

## Design Principle: Density ≠ Loudness

**The Insight**: You don't need a large visual footprint to surface critical information. You need the right **hierarchy of attention**.

**Example Skeptic Question**: "Why is the deadline smaller than the Sprint title?"

**Your Response**: "Because at 3 PM, Alex doesn't need a reminder of the problem; they need a shortcut to the solution. The deadline is context, not action. The Source of Truth is action."

---

## The Three Core Design Moves

### 1. Cognitive Shielding (Sanctuary Mode)
**What**: Blur the social noise (Slack channels, DMs) when in focus mode  
**Why**: Isolation is scary, but selective ghosting is empowering  
**Result**: Alex can see the chat receding (not disappearing), providing ambient awareness without distraction

### 2. Intentional Friction (Long-Press Exit)
**What**: Require a 1.5-second hold to exit Sanctuary Mode  
**Why**: Prevents impulsive context-switching (the user's worst enemy)  
**Design Philosophy**: "Friction is a feature"  
**Result**: Alex has to *intend* to leave focus mode; can't do it by accident

### 3. Information Architecture Under Stress (The Hierarchy)
**What**: Rank information by actionability in crisis, not by temporal order  
**Why**: When stressed, Alex needs diagnostic tools first, context last  
**Visual Translation**: Red (10% tint) > Blue (pulsing) > Grey (13px)  
**Result**: The interface becomes a "hierarchy of survival," not a bulletin board

---

## The Three Top Insights for Saturday's Demo

### Insight #1: Context is the Real Interface
**Statement**: The "Source of Truth" changes value based on the time of day.
- **At 10 AM**: It's a routine assignment (just information)
- **At 3 PM**: It's a lifeline (survival information)

**Demo Point**: "My design reflects this temporal shift. The same constraint looks different when you're in crisis mode because it *is* different."

### Insight #2: Friction is a Feature
**Statement**: Killing the idea that "all interactions must be instant" was a major win.

**Demo Point**: "The Long-Press exit is not a bug; it's a system design choice that protects Alex from their own impulses. This is what I mean by 'Systems over Surfaces.'"

### Insight #3: The "Ghost" Strategy
**Statement**: Total isolation is scary, but Selective Ghosting is empowering.

**Demo Point**: "I found the middle ground between being 'Alone' and being 'Overwhelmed.' The blur effect lets Alex see there's a world out there, but it's not demanding their attention."

---

## Saturday Demo Flow

### Demo Act 1: The Problem (30 seconds)
**Scenario**: "It's 3 PM. Alex has 1 hour left. The code isn't working. Slack is chaos."
- Show standard Slack (drowning in messages)
- Point out: Deadline, Instructor name, Sprint title all equally visible
- Ask: "What does Alex do first?"

### Demo Act 2: The Solution (30 seconds)
**Scenario**: "Now let's see the same crisis through the Stitch HUD."
- Toggle Sanctuary Mode ON
- Show blur effect (chat recedes)
- Point out hierarchy: RED (Source of Truth) → BLUE (Help status) → GREY (Deadline)
- Say: "Notice how the visual weight guides Alex's attention. No confusion."

### Demo Act 3: The Philosophy (30 seconds)
**Scenario**: "This isn't just UI polish. It's Information Architecture under Stress."
- Explain the 3-tier hierarchy
- Explain why deadline is smallest (not actionable in crisis)
- Explain why Source of Truth is largest (diagnostic first)
- Finish: "I didn't redesign a sidebar. I built a hierarchy of survival."

---

## The Closing Statement (For Demo Finale)

> "Standard Slack was built for the 3:00 PM watercooler chat, but a Pursuit Fellow needs a tool for the 3:00 PM Capstone crisis.
>
> My goal with this redesign wasn't just to make Slack look better for Alex; it was to implement **Cognitive Shielding**. By establishing a hierarchy that prioritizes **Verification over Coordination**, I've ensured that the user's focus is treated as the most valuable resource in the system.
>
> Whether you're prompting an AI or just trying to finish a lab, the interface should be a sanctuary, not a distraction."

---

## Visual Weight Mapping (Design Specs)

| Element | Priority | Font Size | Color | Background | Visual Treatment |
|---------|----------|-----------|-------|------------|------------------|
| Source of Truth (Red Sprint Card) | Tier 1 | 15px bold | #E01E5A (red) | 10% red tint | Highest weight |
| Instructor Status (Flare) | Tier 2 | 13px medium | #1164A3 (blue) | None | Pulsing icon |
| Deadline (Timer) | Tier 3 | 13px regular | #999 (grey) | None | Lowest weight |

---

## Key Talking Points for Q&A

**Q: Why blur the chat instead of hiding it?**  
A: "Because isolation is scary. Alex needs to know the world is still there; it's just not demanding their attention. Selective ghosting is the psychological sweet spot."

**Q: Why make the exit button a long-press?**  
A: "Because the user's worst enemy is themselves. By the time Alex gets into flow, a single click could break focus. The long-press forces intention."

**Q: Why is the deadline so small?**  
A: "Because at 3 PM, Alex doesn't need a reminder of the problem; they need a shortcut to the solution. The Source of Truth is the solution."

**Q: How is this different from just using Slack's Do Not Disturb?**  
A: "DND hides everything. Stitch's Sanctuary Mode hides the noise but surfaces the critical data. It's not about blocking communication; it's about routing it intelligently."

---

## Final Checklist for Saturday

- [ ] Show the hierarchy visual (Red > Blue > Grey)
- [ ] Demonstrate the blur effect in Sanctuary Mode
- [ ] Explain the 3 PM crisis scenario (make it real for the audience)
- [ ] Show the long-press exit (explain friction as a feature)
- [ ] Land the closing statement about Cognitive Shielding
- [ ] Answer one Q&A about why deadline is small (this is the skeptic test)

---

## Reflection: Why This Design Works

You didn't just redesign a UI. You **analyzed a specific user under stress** and built an interface around that reality. 

The hierarchy you discovered (Verification > Coordination > Context) isn't arbitrary. It's the actual order in which a student's brain processes a crisis. Your design makes that order visible.

That's systems thinking. That's what Demo Day needs to hear.

---

**Your closing phrase for judges**: "I moved past 'information density' into 'Information Architecture under Stress.'"
