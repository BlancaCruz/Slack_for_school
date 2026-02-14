# Saturday Demo Script — Pursuit Presentation

**Duration**: 5-7 minutes  
**Goal**: Move the judges from "nice UI" to "I see the systems thinking"

---

## Opening (30 seconds)

**Hook**:
> "Standard Slack was built for the 3:00 PM watercooler chat. But a Pursuit Fellow faces a different kind of 3 PM—the Capstone crisis. This is my redesign for survival mode."

**Setup**:
- Pause for effect
- Transition to demo

---

## Act 1: The Problem (1 minute)

**Show**: Standard Slack channel at 3 PM crisis

**Narration**:
> "Imagine you're Alex. You have 1 hour left on your Capstone lab. Your AI-generated code has a bug. The Slack channel just exploded—47 messages in the last 20 minutes.
>
> Here's the problem: All the information is equally loud. The deadline is there. The instructor's name is there. The task title is there. But they're all the same size, same color, same weight.
>
> Alex's brain short-circuits. 'What do I do first?'"

**Point to screen**:
- Deadline: 15px
- Instructor: 15px
- Sprint Title: 15px

**Key Question**: "Which one is actually critical right now?"

**Answer**: "None of these are equally critical. They represent three different decisions Alex needs to make."

---

## Act 2: The Hierarchy (1.5 minutes)

**Show**: Stitch HUD sidebar in Sanctuary Mode

**Narration**:
> "Let me show you what I discovered by analyzing Alex's crisis—not what he *sees*, but what he *needs*.
>
> When Alex is stuck at 3 PM, his brain follows a specific sequence:
>
> **Step 1 — Verification**: 'Did I miss a constraint?'
> Before asking for help, Alex double-checks the Source of Truth. If he's violating a requirement, nothing else matters.
>
> **Step 2 — Escalation**: 'Can I get help?'
> Once Alex confirms it's a real bug, he asks: Is the instructor available? If not, he drops a Flare.
>
> **Step 3 — Context**: 'How much time do I have?'
> The deadline is important, but it's background pressure, not the solution."

**Point to screen**:
- 🔴 Source of Truth (Red, 15px, 10% background tint)
- 🔵 Instructor Status (Blue, pulsing, 13px)
- ⏱️ Deadline (Grey, 13px)

**Key Insight**:
> "This hierarchy isn't about cramming more info in. It's about ranking information by *actionability under stress*. The deadline is smallest not because it's unimportant, but because it's not actionable during crisis. Alex already knows they're late."

---

## Act 3: The Design Philosophy (1 minute)

**Show**: Sanctuary Mode toggle + blur effect

**Narration**:
> "Now let me show you three core design principles that flow from this hierarchy.
>
> **Principle 1 — Cognitive Shielding**
> When Alex enters Sanctuary Mode, the social noise doesn't disappear—it recedes. The blur keeps Alex aware that the world exists, but not demanding their attention. That's selective ghosting, not isolation."

*Toggle blur on/off to show effect*

> "**Principle 2 — Intentional Friction**
> To exit Sanctuary Mode, Alex has to long-press for 1.5 seconds. Why? Because the user's worst enemy is themselves. One accidental click breaks focus. This isn't friction from poor design; it's friction as a feature."

*Show/explain long-press button*

> "**Principle 3 — Information Architecture Under Stress**
> Most interfaces treat information as equal. I treat information as hierarchical. The visual weight reflects the decision-making order, not the information chronology."

---

## Act 4: The Skeptic Test (30 seconds)

**Anticipate the question**:
> "A skeptic might ask: 'Why is the deadline so much smaller than the Sprint title?'"

**Your response**:
> "Because at 3 PM, Alex doesn't need a reminder of the problem. He needs a shortcut to the solution. The deadline provides context, but the Source of Truth provides method. In crisis mode, method beats context."

**The deeper point**:
> "This is what I mean by 'Systems over Surfaces.' I didn't just make a sidebar prettier. I built a system that reflects how a human brain actually prioritizes information under stress."

---

## Closing (30 seconds)

**Final Statement**:
> "My goal with this redesign wasn't just to make Slack look better for Alex. It was to implement Cognitive Shielding.
>
> By establishing a hierarchy that prioritizes Verification over Coordination over Context, I've ensured that the user's focus is treated as the most valuable resource in the system.
>
> Whether you're prompting an AI or just trying to finish a lab, the interface should be a sanctuary, not a distraction.
>
> Thank you."

---

## Visual Aids to Bring

1. **Side-by-side comparison**: Standard Slack vs. Stitch HUD
2. **Hierarchy diagram**: Red (15%) → Blue (13%) → Grey (13%)
3. **3 PM Crisis scenario card** (print or have on phone)
4. **Live or recorded demo** of:
   - Sanctuary Mode toggle
   - Blur effect
   - Long-press exit
   - Flare system

---

## Timing Breakdown

| Section | Time | Notes |
|---------|------|-------|
| Opening Hook | 30s | Grab attention with "3 PM crisis" |
| Problem Setup | 1m | Show flat Slack; ask the question |
| Hierarchy Reveal | 1.5m | Walk through Verification > Coordination > Context |
| Design Philosophy | 1m | Show blur, long-press, information architecture |
| Skeptic Test | 30s | Address the deadline question head-on |
| Closing Statement | 30s | Land the "sanctuary" concept |
| **Total** | **5-7m** | **Room for 1-2 questions** |

---

## Q&A Prep

**Q: How is this different from Slack's Focus Mode?**  
A: "Slack's Focus hides notifications. Stitch's Sanctuary hides noise but surfaces critical data. It's intelligent routing, not blackout."

**Q: Can the user customize the hierarchy?**  
A: "In production, yes—different users might prioritize differently. For the MVP, I optimized for the most common pattern: crisis response."

**Q: Why not just use keyboard shortcuts to mute channels?**  
A: "Because intention matters. A keyboard shortcut is fast, but it's easy to undo accidentally. The long-press exit forces a moment of reflection before breaking focus."

**Q: What about team coordination? Isn't this too individual?**  
A: "Great question. The Flare system addresses this—it lets Alex ask for help *without leaving focus mode*. It's async, so mentors can respond when available, and Alex can stay in Sanctuary until the response arrives."

---

## The Judge's Takeaway

By the end of your demo, judges should think:
- "This designer analyzed a specific user under a specific condition (3 PM crisis)"
- "They didn't just make pretty UI; they built a decision-making system"
- "The visual hierarchy reflects cognitive priorities, not arbitrary aesthetics"
- "This is systems thinking applied to interface design"

**One last line** (if you have it):
> "I moved past 'information density' into 'Information Architecture under Stress.'"
