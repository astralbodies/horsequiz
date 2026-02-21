# CLAUDE.md — Horse Parts Learning Tool

## Project Overview
Interactive horse anatomy learning/quiz tool for HAWS Schallock Center Horse Chore Crew volunteers. Static site — open `index.html` directly in a browser.

## Tech Stack
Plain HTML/CSS/JS. No build step, no frameworks, no external dependencies. System font only (Georgia serif).

## Architecture
Single-page app with hash routing (`#landing`, `#learn`, `#quiz`, `#quiz-play`, `#results`). Pages are `<section>` elements toggled by `.active` class in `js/app.js`.

### File Roles
- **`index.html`** — SPA shell with all 5 page sections. Contains the inline SVG horse silhouette (bezier `<path>` elements for body, mane, tail, ear, eye). The quiz SVG body is cloned from the learn SVG at runtime.
- **`css/style.css`** — All styles. CSS custom properties in `:root`. Barn/pastoral theme. Responsive breakpoints at 768px and 420px. `prefers-reduced-motion` support.
- **`js/horse-data.js`** — `HORSE_PARTS` array (27 items) and `CONTENT_CATEGORIES` wrapper. Each part has: `id`, `name`, `region`, `x`, `y` (in 1000x700 SVG viewBox), `description`, `funFact`, `labelOffset: {dx, dy}`, `labelAnchor`.
- **`js/app.js`** — Hash router, `renderHotspots()` (shared SVG hotspot renderer), `navigateTo()`, `shuffleArray()`, debug grid. All exported to `window`.
- **`js/learn.js`** — `initLearn()` renders labeled hotspots, click/hover populates the info panel.
- **`js/quiz.js`** — Quiz state machine. Setup form reads mode + count, builds shuffled question set. "Find the Part" and "Name the Part" are two code paths in the same file. Results page with score and encouragement.

### Script Load Order (matters)
1. `horse-data.js` — data (no dependencies)
2. `app.js` — routing + utilities (reads `HORSE_PARTS` for debug, defines globals)
3. `learn.js` — uses `renderHotspots`, `HORSE_PARTS`
4. `quiz.js` — uses `renderHotspots`, `navigateTo`, `shuffleArray`, `HORSE_PARTS`

## SVG Coordinate System
- ViewBox: `0 0 1000 700`
- Horse faces **left** in a natural standing pose
- Hotspot coordinates in `horse-data.js` are tuned to match the silhouette path
- Debug mode (`?debug=1` query param) shows a 100px coordinate grid and logs click coords to console
- Hotspot rendering: invisible hit circle (r=22) + visible dot (r=8) + dashed leader line + text label

## Key Patterns
- `renderHotspots(groupId, parts, options)` is the shared renderer used by both learn and quiz modes. Options: `showLabels`, `onClick`, `onHover`, `onLeave`.
- Quiz feedback uses CSS classes on hotspot groups: `.hotspot-correct` (green pop), `.hotspot-wrong` (red shake), `.hotspot-highlight` (golden pulse for "Name the Part" mode), `.hotspot-dimmed` (grayed out non-target dots).
- `CONTENT_CATEGORIES` is the expandability hook — add new categories with the same item shape to extend beyond horse parts.

## Regions
Parts are grouped by `region` field: `head`, `neck`, `body`, `front_leg`, `hind_leg`. The "Name the Part" quiz uses regions to pick distractors from different body areas when possible.

## Common Tasks
- **Adjust a hotspot position**: Edit `x`/`y` in `js/horse-data.js`. Use `?debug=1` to visualize the grid.
- **Adjust a label position**: Edit `labelOffset: {dx, dy}` and `labelAnchor` in `js/horse-data.js`.
- **Change the horse silhouette**: Edit the `<path class="horse-silhouette">` bezier curve in `index.html`.
- **Add a new horse part**: Add an entry to `HORSE_PARTS` in `js/horse-data.js` with all required fields.
- **Add a new content category**: Add a new key to `CONTENT_CATEGORIES` with `title`, `description`, `icon`, and `items` array matching the horse part item shape.
