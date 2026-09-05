# Frigate RPG Sheet

## Pages
- 🚀 [frigate.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/frigate.html) — The main single-file character sheet: stats, crew skills, technologies, modules, and a tech-hand dock for commanding your ship.
- 🎛️ [admin.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/admin.html) — The player roster manager: add, edit, export, and import individual player sheets.
- 🗺️ [hex-grid-generator.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/hex-grid-generator.html) — A standalone flat-top hex map generator for space combat layouts.

A single-file, web-based character sheet for a tabletop RPG I designed, centered on commanding a **Starship Frigate** in space combat. Everything lives in `frigate.html` — no build step, no dependencies, no server required.

## What it tracks
- 🚢 **Ship header** — name, captain, commissioning date, and hull class (Support / Jump / Striker / Discovery)
- 💠 **Stats** — hull HP, shield, and energy (current/max), plus storage and speed
- 🎓 **Crew skills** — nine skills with points, penalties, and hover tooltips
- 👥 **Traits & Crew** — slots, combat-only tags, and a preset catalog
- ⚙️ **Technologies** — costs, tech types, traits, storage, hull, charges, and deployables; pick from the catalog or get them auto-added by hull class
- 🛡️ **Modules / Deployables** — requirements, shape identifiers, module/deployable toggle, hull/duration/speed/charges, and build/passive/activate effects

## How to use it

### Run it online
The sheet is fully client-side, so you can just open it in a browser:
- 🚀 [frigate.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/frigate.html) — the main character sheet
- 🎛️ [admin.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/admin.html) — the player roster manager
- 🗺️ [hex-grid-generator.html](https://nathan-r1.github.io/Frigate-RPG-Sheet/hex-grid-generator.html) — the hex map generator

### Run it locally
```
python3 serve.py
```
Then open http://localhost:8000 (any static file server works — or just open `frigate.html` directly in a browser). The hex page is served at http://localhost:8000/hex/ and the admin page at http://localhost:8000/admin/.

### Run with Electron on Windows
```
npm install
npm start
```
This installs the Electron dependency and launches the sheet in a desktop window.

<details>
<summary><b>Tip:</b> If you get an error like "npm cannot be loaded because running scripts is disabled on this system"</summary>

Windows PowerShell's default execution policy blocks `.ps1` scripts (which is what `npm`/`npm.cmd` actually invokes). Bypass it by calling the `.cmd` shim explicitly, or allow script execution for your user:

```
npm.cmd install
npm.cmd start
```

or once, to relax the policy:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

then run `npm install` / `npm start` as normal.
</details>

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
