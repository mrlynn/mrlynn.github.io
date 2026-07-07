# Writing style checklist — avoiding AI-isms

This came out of a reader comment on `cursor-misconceptions.mdx`: they stopped
reading halfway through because the writing "felt AI." This doc is the
diagnosis and the fix, so it doesn't happen again.

## The tells

### 1. Repeating structural templates
Symptom: every section of a listicle uses the identical bolded-label skeleton.

> **Why I believed it:** ...
> **What's actually true:** ...
> **The proof that convinced me:** ...
> **One line to remember:** ...

This is efficient to write and awful to read five times in a row — it reads like
a content template, not a person telling you something. Fix: drop the labels,
write continuous narrative. Each section can still cover the same ground
(what I assumed → what's true → what convinced me) without announcing the
structure.

### 2. Aphoristic mic-drop closers
Symptom: sections end on a tight, quotable antithesis.

> A plugin is a passenger seat. Cursor rebuilt the car around the driver.
> Tab is where you start. Agent Mode is where the product actually lives.

This is the exact rhythm LLMs default to — sounds wise, says little. Fix: end
on a real observation or a specific detail instead of a summary line.

### 3. Corporate/marketing phrasing bleeding through
Symptom: language that belongs in a product one-pager, not a personal post.

> Cursor increasingly behaves like a development platform, not just an
> editing surface.

Fix: say it the way you'd say it out loud to a friend.

### 4. Em dash overload
Symptom: " - " used as the default joint between clauses, over and over,
instead of varying sentence construction.

Fix: mix in periods, "and," "so," "though," semicolons — whatever a normal
sentence would use.

### 5. Over-parallel construction / rule-of-three
Symptom: suspiciously balanced sentence pairs or triplets.

> I was wrong about the category, wrong about the ceiling, and almost wrong
> about whether it was worth an afternoon.
> The tool multiplies execution; it doesn't multiply wisdom.

Real thinking is lumpier than this. Fix: let one clause be longer than the
other, or cut the parallelism entirely.

### 6. Abstraction where a detail would do
Symptom: staying generic ("I asked Agent Mode to fix a bug") instead of
naming something specific and slightly imperfect (which file, what broke,
what it felt like to be wrong).

Fix: reach for the one true detail instead of the tidy generalization.

## Before / after (from `cursor-misconceptions.mdx`, 2026-07-07 pass)

**Before:**

> **Why I believed it:** Cursor *is* forked from VS Code. The keybindings
> work. My extensions mostly work. On day one it feels like home - which is
> exactly why I filed it under "VS Code plus AI" and moved on.
>
> **What's actually true:** "Forked from" and "plugin for" are opposite
> architectural choices...
>
> A plugin is a passenger seat. Cursor rebuilt the car around the driver.

**After:**

> I held onto this one longer than I should have, mostly because the
> evidence kept agreeing with me. Cursor is forked from VS Code. My
> keybindings worked on day one. Most of my extensions loaded without a
> fight. It felt exactly like home, which is precisely why I never looked
> past that first impression. I filed it under "VS Code plus AI" and went
> back to work.
>
> Here's what I missed. "Forked from" and "plugin for" aren't the same move
> wearing different clothes...
>
> Familiar keybindings had me convinced I understood the product. I didn't.
> I just recognized the furniture.

## Calibration reference

[`content/blog/my-last-one.mdx`](../content/blog/my-last-one.mdx) is the north
star for voice: plain, chronological, concrete physical detail, no structural
scaffolding, no mic-drop endings. When in doubt, ask whether a sentence could
appear in that post. If it couldn't, it's probably an AI-ism.

## Process

Before publishing a new post (or reviewing an old one), run this checklist
against every section. If more than one tell shows up per section, do a full
narrative pass rather than spot-fixing sentences.
