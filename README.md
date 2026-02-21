# Horse Parts — HAWS Schallock Center

An interactive learning tool for Horse Chore Crew volunteers to learn horse anatomy terminology. Features an SVG horse diagram with 27 labeled body parts, a learn mode, and two quiz modes.

## Quick Start

Open `index.html` in any browser. No server, build step, or dependencies required.

## Features

### Learn Mode
- SVG horse silhouette with 27 labeled hotspot dots and leader lines
- Click or hover any dot to see the part's name, description, and fun fact in an info panel

### Quiz Mode
Two sub-modes, selectable with 10 / 15 / all 27 questions:

- **Find the Part** — Given a part name, click the correct dot on the diagram (labels hidden). Green pop on correct, red shake on wrong with the correct answer shown.
- **Name the Part** — One dot pulses/glows, pick the correct name from 4 multiple-choice buttons. Distractors favor different body regions.

### Results
Score (fraction + percentage), per-question review with checkmarks/X's, encouraging messages scaled to score bracket, and navigation buttons.

## Horse Parts (27)

| Region | Parts |
|--------|-------|
| Head | Poll, Forelock, Ear, Muzzle, Nostril, Throatlatch |
| Neck/Topline | Crest, Mane, Withers, Back, Loin, Croup, Dock, Tail |
| Body | Shoulder, Chest, Barrel, Flank |
| Front Leg | Forearm, Knee, Cannon, Fetlock, Pastern, Hoof |
| Hind Leg | Stifle, Gaskin, Hock |

## File Structure

```
horsequiz/
  index.html            SPA shell, all sections, inline SVG horse silhouette
  css/style.css         Barn-themed styles, animations, responsive
  js/horse-data.js      27 horse parts: name, description, fun fact, SVG coords
  js/app.js             Hash routing, page toggling, SVG hotspot renderer
  js/learn.js           Learn mode: labeled diagram, click for info panel
  js/quiz.js            Quiz setup, both quiz modes, results page
```

## Tech Stack

Plain HTML, CSS, and JavaScript. No frameworks, no build tools, no external dependencies. Georgia serif (system font) for typography.

## Debug Mode

Add `?debug=1` to the URL to show a coordinate grid overlay and enable click-to-log SVG coordinates in the console. Useful for tuning hotspot positions.

## Design

Warm pastoral theme: cream backgrounds, barn-wood textured header, saddle brown and barn red accents, pasture green highlights, horseshoe decorations. Responsive from 320px to 1200px+. Respects `prefers-reduced-motion`.

## Expandability

The `CONTENT_CATEGORIES` object in `horse-data.js` wraps the horse parts data. Future content categories (tack, farm tools, etc.) can be added as new data files with the same item shape, and the landing page can dynamically render category cards.

## Credits

Made for [HAWS Schallock Center](https://www.hawspets.org/) Horse Chore Crew.
