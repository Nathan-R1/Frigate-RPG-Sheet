# Frigate RPG Sheet

A single-file, web-based character sheet for a tabletop RPG I designed, centered on commanding a **Starship Frigate** in space combat. Everything lives in `frigate.html` — no build step, no dependencies, no server required.

## What it tracks
- Ship header: name, captain, commissioned date, and hull classification (Support / Jump / Striker / Discovery)
- Stats: hull HP, base shield, and energy (each current/max), plus storage and speed
- Crew skills (Cyber, Diplomacy, Engineering, Leadership, Logistics, Navigation, Piloting, Sensors, Science), each with point and penalty values and hover tooltips
- Traits & Crew: add slots, add combat-only tags, and pick from a preset catalog
- Technologies: name, description, energy cost, tech type, traits, storage, hull, charges, and deployable flags — pick from the hamburger catalog or get class techs auto-added by selecting a hull class
- Modules / Deployables: requirements, shape identifier, module/deployable toggle, hull/duration/speed/charges, and on-build/passive/on-activate effects
- Exhaustion state on technologies and modules, with a refresh button (start-of-turn) that clears all of them
- Tech Hand: a bottom dock showing your unbuilt technologies; sort them, pop them out to read them, and double-click to build one
- Collapsible turn rules ("At the start of your turn" / "During your turn") with one-click energy recharge and exhaust refresh
- Difficulty Class (DC) for class checks

## How to use it

The sheet is fully client-side and offline. To run it locally:

```
python3 serve.py
```

then open http://localhost:8000 (any static file server works — or just open `frigate.html` directly in a browser). A bonus standalone **hex map generator** is served at http://localhost:8000/hex/.

### Fill it out
1. Enter your ship's name, captain, and commissioning date.
2. Choose a hull classification — you'll be prompted to apply that class's stat bonuses and its signature technology.
3. Set stats and crew skills.
4. Add Traits & Crew and Technologies with the **− / + / ☰** controls in each section.
5. Unbuilt technologies go to the bottom **Tech Hand** dock — open it, sort (Name/Trait/Type), hover or click a card to read it, and double-click a card to build it (it moves back onto the grid).
6. Use **Exhaust** / **Refresh** and the turn-rule shortcuts to track state during combat.

The sheet does **not** auto-save. Nothing is stored on the page itself — to keep your progress you must export and later import a JSON file.

### Save / load (export / import)
- **Export (⇩ Export)** — downloads a `.json` file containing everything on the sheet (stats, skills, crew, techs, mods, DC, etc.) so you can take it with you or share it.
- **Import (⇧ Import)** — pick a previously exported `.json` file to restore the entire sheet to that saved state.

A good workflow: fill out the sheet, **Export** it, and re-import before each session (or share the JSON with a player/DM).

> Tip: since the page resets on refresh, keep an exported `.json` file for your ship so you can reload it after closing the tab.

## Files
- `frigate.html` — the entire app (markup, styles, and logic)
- `hand-popout.html` — a standalone "tech hand" popup that syncs with `frigate.html` over a BroadcastChannel
- `hex-grid-generator.html` — standalone hex map generator (served at `/hex/`)
- `serve.py` — optional minimal local server (port 8000; also serves the hex page at `/hex/`)
- `README.md` — this file
- `Notes.AI` — developer scratchpad describing the app's structure for AI-assisted editing (keep in sync when the sheet changes)
