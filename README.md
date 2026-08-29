# Frigate RPG Sheet

A single-file, web-based character sheet for a tabletop RPG I designed, centered on commanding a **Starship Frigate** in space combat. Everything lives in `frigate.html` — no build step, no dependencies, no server required.

## What it tracks
- Ship header: name, captain, commissioned date, and hull classification (Support / Jump / Striker / Discovery)
- Stats: hull HP, shields, energy, storage, scanning, turning, and speed
- Crew skills (Cyber, Diplomacy, Engineering, Leadership, Logistics, Navigation, Piloting, Sensors, Science)
- Ship arcs (click to toggle active firing arcs)
- Traits & Crew: add slots, add combat-only tags, and pick from a preset catalog
- Technologies: name, description, energy cost, tech type, traits, storage and deployable flags — pick from the hamburger catalog or get class techs auto-added by selecting a hull class
- Difficulty Class (DC) for class checks

## How to use it

The sheet is fully client-side and offline. To run it locally:

```
python3 serve.py
```

then open http://localhost:8000 (any static file server works — or just open `frigate.html` directly in a browser).

### Fill it out
1. Enter your ship's name, captain, and commissioning date.
2. Choose a hull classification — you'll be prompted to apply that class's stat bonuses and its signature technology.
3. Set stats, crew skills, and toggle your active ship arcs.
4. Add Traits & Crew and Technologies with the **− / + / ☰** controls in each section.

The sheet does **not** auto-save. Nothing is stored on the page itself — to keep your progress you must export and later import a JSON file.

### Save / load (export / import)
- **Export (⇩ Export)** — downloads a `.json` file containing everything on the sheet (stats, skills, crew, techs, arcs, DC, etc.) so you can take it with you or share it.
- **Import (⇧ Import)** — pick a previously exported `.json` file to restore the entire sheet to that saved state.

A good workflow: fill out the sheet, **Export** it, and re-import before each session (or share the JSON with a player/DM).

> Tip: since the page resets on refresh, keep an exported `.json` file for your ship so you can reload it after closing the tab.

## Files
- `frigate.html` — the entire app (markup, styles, and logic)
- `serve.py` — optional minimal local server (port 8000)
- `README.md` — this file
