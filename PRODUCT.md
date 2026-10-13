# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Prospective members**: Epitech Lyon students discovering Heaven of Dice and deciding whether to join (registration form, Discord).
- **Current members**: checking upcoming events, browsing the game library (Ludobible), and following their investment hours and credits (XP page).

## Product Purpose

Official site of Heaven of Dice (HOD), the board-game club of BDE Epitech Lyon. It presents the club, its team and its activities, and gives members a home for events, games and XP. Success means a curious student joins the club and Discord, and members come back for events and their XP.

## Positioning

A campus club with its own tooling: an XP/credits system that rewards time spent running events, preparing and managing the club; a shared game catalogue (Ludobible); a steady calendar of discovery nights, tournaments and meet-ups; and a friendly vibe mixing strategy and fun.

## Operating Context

- Content is edited by non-developers in Google Sheets (events, games, XP) and fetched as CSV (`lib/fetchSheet.ts`, `lib/config.ts`). Events support recurrence rules (rrule).
- The team and org chart live in `data/members.ts`.
- Joining happens off-site: the registration form and the Discord invite (`HOD_CONFIG`).
- Routes: home, `/events`, `/ludobible`, `/xp`, `/contact`.

## Capabilities and Constraints

- Next.js 16, React 19, TypeScript, Tailwind CSS 4.
- Data must stay in Google Sheets; don't move it into code or a CMS.
- Terms: "XP", "crédits", "Ludobible", "CA" (board).

## Brand Commitments

- Name: Heaven of Dice (HOD). Always say it belongs to BDE Epitech Lyon.
- The logo (`public/logo.png`, `public/logo-small.png`) and the purple/gold identity are fixed.
- Copy is French only, addresses the reader with informal "tu", and uses inclusive writing (e.g. "Prêt·e").

## Evidence on Hand

- Real team members (`data/members.ts`), live events, games and XP from the Sheets.
- Screenshots: `public/hod-showcase*.png`.
- No testimonials, member counts or stats are recorded. Don't make any up.

## Product Principles

1. Serve both the newcomer and the regular; neither should feel like an afterthought.
2. Sheet data is the source of truth. Pages must handle missing, empty or malformed data gracefully.
3. Joining should never be more than one step away.
4. Make member investment (XP, credits) visible and rewarding.
