# Spec: `/consulting` Page for mrlynn.github.io

**Repo:** `mrlynn.github.io` (Next.js 14, App Router, MUI, framer-motion)
**Goal:** Add a new top-level page presenting Michael's technical enablement consulting offering, reachable from primary nav.

---

## 1. Context & source material

The content is derived from two project documents (attached alongside this spec, or available on request):
- `PRD-Technical-Enablement-Consulting.md` — positioning, offer menu (§4), proof points (§3)
- The site's existing design system (see §3 below) — this must look like an organic part of the site, not a bolted-on landing page.

**Framing constraint:** the page should NOT reference Michael's current employer (Cursor) either way — no "available now," no "leaving my job," no "on the side." Positioning and offer content only. This is intentional and should stay this way until explicitly revisited.

**No pricing on the page.** Offer menu shows scope/duration language ("2–3 weeks, fixed fee") but no dollar amounts.

## 2. Routing & navigation

- New route: `src/app/consulting/page.js`
- Add to primary nav in `src/components/NavigationImproved.js`:
  - Import `Handshake as HandshakeIcon` from `@mui/icons-material`
  - Add `{ text: 'Consulting', icon: <HandshakeIcon />, path: '/consulting' }` to the `primaryItems` array, positioned right after `Home`
- No changes needed to `mobileMenuItems` — it derives from `primaryItems` automatically.

## 3. Design system to follow (do not deviate)

Reference implementations already in the repo: `src/app/page.js` (homepage hero) and `src/app/expertise/mongodb/page.js` (card-grid pattern).

- **Headings:** `var(--font-fraunces), Georgia, serif`, weight 600, tight letter-spacing (`-0.015em` to `-0.03em`)
- **Eyebrow labels:** `var(--font-mono), monospace`, `0.72rem`, uppercase, `0.22em` letter-spacing, primary color, with a small leading hairline (`::before` pseudo-element, 28px wide 1px line)
- **Body copy:** `theme.palette.text.secondary`, line-height ~1.7–1.8
- **Accent color:** `theme.palette.primary.main` (warm amber/orange — do not hardcode hex, always pull from theme)
- **Motion:** `framer-motion`, a shared `fadeUp` variant (`opacity 0→1`, `y: 24→0`, staggered by `custom={i} * 0.08s` delay, ease `[0.22, 1, 0.36, 1]`). Use `whileInView` with `viewport={{ once: true, margin: '-60px' }}` for below-the-fold sections, `animate="show"` for the hero.
- **Section rhythm:** alternate full-bleed `Container maxWidth="lg"` sections with generous vertical padding (`py: { xs: 8-10, md: 10-14 }`), hairline borders (`theme.palette.border.subtle`) between sections, occasional `theme.palette.background.card` tint for visual breaks.
- **Cards:** `borderRadius: '14px'`, `1px solid` hairline border, hover state brightens border to `primary.main`. No heavy shadows — this design system is flat/editorial, not skeuomorphic.
- **CTA sections:** can use `theme.palette.background.gradientAccent` as a full-bleed background with white text, for visual contrast against the rest of the page.

**Do not use Tailwind classes.** This project uses MUI's `sx` prop exclusively for styling.

## 4. Reusable components

- `src/components/CalendarBooking.js` — existing Google Calendar scheduling button, already used on the homepage. Reuse as the primary CTA (`variant="button"`, custom label via `buttonProps={{ children: '...' }}`).
- Local `Eyebrow` and `SectionHeading` helper components should be redefined within the new page file (this matches the existing pattern — `page.js` and other pages each define their own local copies rather than importing a shared one).

## 5. Content structure & copy

Create `src/data/consulting.js` exporting a single `consulting` object, separate from the page component (matches the existing `src/data/*.js` pattern used elsewhere in the repo — e.g. `personalInfo.js`, `mongodb-projects.js`).

Required shape and copy:

```js
export const consulting = {
  eyebrow: 'Technical Enablement Consulting',
  headline: 'I build the technical curriculum GTM teams run on.',
  subhead: 'Courses, hands-on labs, and demos for AI and developer-platform companies — built against real APIs, not just slides.',
  intro: "AI and dev-tool companies are scaling go-to-market faster than they can produce enablement for it. Content backlogs grow faster than teams can curate them, materials go stale every release, and most enablement work can describe a product but can't build a working lab or demo against it. That gap — between explainers and working code — is where I work.",

  wedge: 'I build working labs and demos against real AI APIs, not just slides.',

  icp: {
    heading: 'Who this is for',
    body: "Series B–D (or big-tech AI org) companies with a live product, a growing field org — SAs, SEs, DevRel, ADMs — and no dedicated capacity to build technical curriculum. Usually the person reaching out owns enablement, GTM, DevRel, or a field-facing program.",
  },

  offers: [
    {
      no: '01',
      title: 'Curriculum Audit + Roadmap',
      tag: 'Door-opener',
      duration: '2–3 weeks · fixed fee',
      body: "A low-risk first step. I assess what enablement material exists, map the gaps against your current product surfaces, and hand back a prioritized build roadmap — so the next call is an easy yes or an easy no.",
    },
    {
      no: '02',
      title: 'Build Sprints / Backlog Burn-Down',
      tag: 'Core engagement',
      duration: 'Per-project or monthly retainer',
      body: 'Shippable courses, hands-on labs that run reliably live, demos, and decks with facilitator guides — built to stay current as the product changes, not to go stale the next release.',
    },
    {
      no: '03',
      title: 'Fractional Enablement Lead',
      tag: 'Ongoing',
      duration: 'X days/week, embedded',
      body: "I own a product surface's curriculum end-to-end, partnering directly with enablement leads, program owners, and PMM as if I were on the team.",
    },
    {
      no: '04',
      title: 'Workshops & One-Offs',
      tag: 'As-needed',
      duration: 'Scoped per engagement',
      body: 'Developer Day and hackathon-in-a-box design and delivery, train-the-trainer sessions, and facilitator-guide production for teams running their own enablement.',
    },
  ],

  proof: {
    heading: 'Why this, from me',
    points: [
      '25+ years across solutions engineering, DevRel, and technical training',
      'Built and led the MongoDB SA-enablement program — onboarded incoming sales, AMs, and SAs with measurable pre-sales impact',
      '10+ years building developer and enablement content at MongoDB',
      '160-episode podcast and active conference speaker',
      'A shipped portfolio of products built directly against AI APIs — Anthropic SDK/Claude API, MCP, agents',
    ],
  },

  differentiation: {
    heading: 'Why not a generalist',
    body: "Generic enablement consultants can describe a product but can't build against it. Instructional designers know pedagogy, not the API surface. DevRel-for-hire is broad, not curriculum-focused. Big training agencies are slow and expensive. The lane I work in is the intersection none of them own: technical enough to build the lab, and experienced enough to make it teach well.",
  },

  cta: {
    heading: "Let's talk about your backlog",
    body: 'The fastest way to find out if this is a fit is a short call — what exists today, where the gaps are, and whether an audit or a build sprint makes more sense to start.',
  },
};
```

## 6. Page sections (in order)

1. **Hero** — eyebrow, h1 headline (from `headline`), italic serif subhead (from `subhead`), intro paragraph (from `intro`), two CTAs: primary `CalendarBooking` button ("Book a discovery call") + secondary outlined button linking to `/contact` ("Get in touch").
2. **Wedge statement** — centered, large italic serif pull-quote of `consulting.wedge`, bordered top/bottom by hairlines, own section for visual punch.
3. **Offers grid** — 2×2 `Grid` of cards from `consulting.offers`, each showing number, tag `Chip`, title, duration (mono), body copy.
4. **Who this is for** — two-column layout (heading left, body right) from `consulting.icp`.
5. **Proof points** — list of `consulting.proof.points` as a 2-column grid of bullet rows (small dot marker + text), each row bottom-bordered with a hairline.
6. **Differentiation** — same two-column layout pattern as §4, from `consulting.differentiation`.
7. **CTA band** — full-bleed `gradientAccent` background, white text, `consulting.cta.heading` + `body`, centered `CalendarBooking` button.

## 7. Acceptance criteria

- [ ] `npm run build` compiles the new route with no errors (note: this repo's build also touches `/api/chat`, which requires a `MONGODB_URI` env var unrelated to this page — don't let that block on an unrelated failure)
- [ ] `/consulting` is reachable from primary nav on both desktop and mobile drawer
- [ ] Page passes visual review against the reference pages (`/`, `/expertise/mongodb`) for typographic and spacing consistency — should not look like a different site
- [ ] No hardcoded colors — everything pulled from `theme.palette.*`
- [ ] No pricing/dollar amounts anywhere on the page
- [ ] No mention of current employer, "available now," or employment status
- [ ] `CalendarBooking` widget functions (loads Google Calendar scheduling script, opens booking flow)
- [ ] Responsive: hero and grids collapse cleanly at `xs`/`md` breakpoints (test at 375px and 1440px)

## 8. Explicitly out of scope for this pass

- Updating `src/data/personalInfo.js` or the "Ask AI" chat assistant's system prompt to know about the consulting offering — deferred until employment framing is settled
- Pricing page or rate card
- SOW/contract template
- ICP target list page
- Case study page (no signed engagement yet)
