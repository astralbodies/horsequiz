# CLAUDE.md — Horse Parts Learning Tool

## Project Overview
Interactive horse anatomy learning/quiz tool for HAWS Schallock Center Horse Chore Crew volunteers. Static site — open `index.html` directly in a browser.

## Tech Stack
Plain HTML/CSS/JS. No build step, no frameworks, no external dependencies. System font only (Georgia serif).

## Architecture
Single-page app with hash routing (`#landing`, `#learn`, `#quiz`, `#quiz-play`, `#results`). Pages are `<section>` elements toggled by `.active` class in `js/app.js`.

### File Roles
- **`index.html`** — SPA shell with all 5 page sections. Contains two SVGs that display `images/blue.jpg` (a photo of Blue from HAWS Schallock Center) as the diagram background. The quiz SVG body is cloned from the learn SVG at runtime.
- **`images/blue.jpg`** — Photo of Blue (a horse at HAWS Schallock Center) used as the anatomy diagram background. The horse faces **right** in this image.
- **`css/style.css`** — All styles. CSS custom properties in `:root`. Barn/pastoral theme. Responsive breakpoints at 768px and 420px. `prefers-reduced-motion` support. Labels and leader lines use white outlines (`paint-order: stroke`) for readability against the photo.
- **`js/horse-data.js`** — `HORSE_PARTS` array (27 items) and `CONTENT_CATEGORIES` wrapper. Each part has: `id`, `name`, `region`, `x`, `y` (in 1000x665 SVG viewBox), `description`, `funFact`, `labelOffset: {dx, dy}`, `labelAnchor`.
- **`js/app.js`** — Hash router, `renderHotspots()` (shared SVG hotspot renderer), `navigateTo()`, `shuffleArray()`, debug grid. All exported to `window`.
- **`js/learn.js`** — `initLearn()` renders labeled hotspots, click/hover populates the info panel.
- **`js/quiz.js`** — Quiz state machine. Setup form reads mode + count, builds shuffled question set. "Find the Part" and "Name the Part" are two code paths in the same file. Results page with score and encouragement.
- **`tools/place-parts.html`** — Standalone coordinate picker tool for remapping hotspot positions onto a horse photo. Drag-and-drop image loading, click-to-place workflow for all 27 parts, JSON export of coordinates.

### Script Load Order (matters)
1. `horse-data.js` — data (no dependencies)
2. `app.js` — routing + utilities (reads `HORSE_PARTS` for debug, defines globals)
3. `learn.js` — uses `renderHotspots`, `HORSE_PARTS`
4. `quiz.js` — uses `renderHotspots`, `navigateTo`, `shuffleArray`, `HORSE_PARTS`

## SVG Coordinate System
- ViewBox: `0 0 1000 665`
- Horse faces **right** (photo of Blue from HAWS Schallock Center)
- Hotspot coordinates in `horse-data.js` are mapped to Blue's photo using the picker tool (`tools/place-parts.html`)
- Debug mode (`?debug=1` query param) shows a 100px coordinate grid and logs click coords to console
- Hotspot rendering: invisible hit circle (r=22) + visible dot (r=8) + white dashed leader line + text label with white outline

## Key Patterns
- `renderHotspots(groupId, parts, options)` is the shared renderer used by both learn and quiz modes. Options: `showLabels`, `onClick`, `onHover`, `onLeave`.
- Quiz feedback uses CSS classes on hotspot groups: `.hotspot-correct` (green pop), `.hotspot-wrong` (red shake), `.hotspot-highlight` (golden pulse for "Name the Part" mode), `.hotspot-dimmed` (grayed out non-target dots).
- `CONTENT_CATEGORIES` is the expandability hook — add new categories with the same item shape to extend beyond horse parts.

## Regions
Parts are grouped by `region` field: `head`, `neck`, `body`, `front_leg`, `hind_leg`. The "Name the Part" quiz uses regions to pick distractors from different body areas when possible.

## Common Tasks
- **Adjust a hotspot position**: Edit `x`/`y` in `js/horse-data.js`. Use `?debug=1` to visualize the grid.
- **Adjust a label position**: Edit `labelOffset: {dx, dy}` and `labelAnchor` in `js/horse-data.js`.
- **Remap all hotspots to a new photo**: Open `tools/place-parts.html`, load the new photo, place all 27 dots, export coordinates, and update `js/horse-data.js`.
- **Change the horse photo**: Replace `images/blue.jpg` and update the `<image>` element dimensions in `index.html` if the aspect ratio changed. Update the viewBox in both SVGs and in the debug grid loop in `js/app.js`.
- **Add a new horse part**: Add an entry to `HORSE_PARTS` in `js/horse-data.js` with all required fields.
- **Add a new content category**: Add a new key to `CONTENT_CATEGORIES` with `title`, `description`, `icon`, and `items` array matching the horse part item shape.
