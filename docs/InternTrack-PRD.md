# InternTrack — Product Requirements Document (v1)

**Author:** [Your name]
**Date:** [Date]
**Status:** Draft

---

## 1. Problem

Students applying to internships track applications across spreadsheets, email
threads, and sticky notes. There's no single place to see where each
application stands, and deadlines get missed because nothing proactively
surfaces them.

## 2. Target User

Primary: college students applying to internships (starting with myself and
classmates as the first users).

## 3. Goal

Give students one place to track every application's status and never miss a
deadline — with less friction than a spreadsheet.

### Success Metrics (v1)
- I personally stop missing application deadlines/follow-ups.
- I can see my full application funnel (wishlist → applied → interview →
  offer/rejected) in under 5 seconds, without scrolling a spreadsheet.
- At least 3 classmates use it for a full week without reverting to their old
  method.

## 4. Scope — v1 (MVP)

Prioritized using MoSCoW.

**Must have:**
- User sign up / log in (real accounts — classmates need their own boards)
- Kanban board with columns: Wishlist, Applied, OA/Interview, Offer, Rejected
- Add/edit/delete a card: company, role, deadline, job link, free-text notes
- Drag card between columns to update status
- Data persists per user
- Visual deadline flag (upcoming/overdue highlighting on the card) — this is
  core to the value prop, not a nice-to-have; the whole point is not missing
  deadlines

**Should have:**
- Sort/filter cards (e.g. by deadline, by column)

**Could have:**
- Dark mode
- Quick-add via URL paste (auto-fill company/role if easy to parse)
- Per-column counts (e.g. "Applied: 6")

**Won't have (v1)** — candidates for v2+:
- Resume parsing / auto-fill from job postings
- Email integration (auto-detect application confirmations)
- Team/shared boards, referrals, analytics dashboards
- Mobile app (web-responsive only for now)
- Browser extension

*Why cut these:* each adds real build time and complexity (parsing, OAuth
with email providers, multi-user permissions) without which the core
loop — "see my applications, know what's due" — still fully works. They're
the natural v2 roadmap once the core is validated.

## 5. Key User Stories

1. As a student, I want to add a company I'm interested in so I don't forget
   about it later.
2. As a student, I want to move a card to "Applied" when I submit, so my
   board reflects reality.
3. As a student, I want to see which applications have an upcoming or passed
   deadline, so I never miss a follow-up.
4. As a student, I want to jot quick notes on a card (e.g. interviewer name,
   next steps) so I don't have to remember everything.

## 6. Assumptions & Risks

- **Assumption:** Students will manually update card status rather than
  needing automatic detection — acceptable friction for v1.
- **Risk:** If manual upkeep feels like more work than a spreadsheet, adoption
  fails. Mitigate by keeping the "add card" and "move card" actions as low
  friction as possible (target: <10 seconds to log a new application).
- **Risk:** Deadline reminders need to feel useful, not spammy — start with a
  simple visual flag, not notifications/emails, until validated.

## 7. Open Questions (to resolve via user research)

- Do students want reminders inside the app only, or also email/push?
- Is per-application notes enough, or do people want file attachments
  (resume version used, cover letter)?
- Would classmates actually switch from their current method, or just try it
  once?
