# iRaceBuy data update process

This note documents the current manual flow for refreshing iRaceBuy data and archiving each season snapshot.

## What `/updateData` does now

- File: `src/pages/updateData.astro`
- The page imports `test()` from `src/functions/prepareDataSeason.ts`.
- On render, `test()` runs immediately and rebuilds:
  - `src/data/JM_seasonData.json`
  - `src/data/JM_tracks.json`
- The API download calls are present but commented out in the page:
  - `downloadData("series/seasons", "currentSeason")`
  - `downloadData("track/get", "tracks")`
  - `downloadData("track/assets", "tracksAssets")`
  - `downloadData("series/assets", "seriesLogos")`

## Current source files

The generated JSON depends on these inputs:

- `src/data/API_currentSeason.json`
- `src/data/API_tracks.json`
- `src/data/API_tracksAssets.json`
- `src/data/API_seriesLogos.json`

## Update workflow

1. Start the app locally and open `/updateData`.
2. If the API source files are already fresh, let the page run `test()` and regenerate the derived JSON files.
3. If the API source files are stale, refresh them first by enabling the `downloadData(...)` calls in `src/pages/updateData.astro`, then reloading the page.
4. Confirm the console shows:
   - `Preparando base de datos...`
5. Confirm these files were rewritten with the expected timestamp:
   - `src/data/JM_seasonData.json`
   - `src/data/JM_tracks.json`

## Archive step

After a successful refresh, copy the season snapshot into `src/data/archive/` using the current season name.

Existing archive folders already use this pattern:

- `src/data/archive/2026_season_2/`
- `src/data/archive/2026_season_3/`

Each season folder should keep the full snapshot, at minimum:

- `API_currentSeason.json`
- `API_tracks.json`
- `API_tracksAssets.json`
- `API_seriesLogos.json`
- `JM_seasonData.json`
- `JM_tracks.json`

## Default competition IDs check

The default competition selections are hardcoded in:

- `src/components/buyGuide/SeasonWrap/SeasonWrap.jsx`

That file currently sets default IDs per license tab:

- Rookie: `[6265, 6266, 6313, 6314]`
- Class D: `[6273, 6279, 6283, 6319, 6317]`
- Class C: `[6286, 6294, 6298, 6300, 6289]`
- Class B: `[6302, 6306, 6308, 6310, 6301]`
- Class A: `[6337, 6311, 6312, 6338]`
- All: `[6322, 6265, 6289, 6301, 6302, 6311, 6312]`

### Current name mapping

- `6265` = `Global Mazda MX-5 Cup by Fanatec - 2026 Season 3`
- `6266` = `BMW M2 Cup - 2026 Season 3`
- `6313` = `Formula Vee Series by trophi.ai - 2026 Season 3`
- `6314` = `Formula 1600 Rookie Series by Asetek Racing - 2026 Season 3`
- `6273` = `Production Car Challenge by Sim-Lab - 2026 Season 3`
- `6279` = `Rain Master Challenge by Podium 1 - 2026 Season 3`
- `6283` = `Global Sports Car Challenge by Fanatec - 2026 Season 3`
- `6319` = `FIA Formula 4 Challenge - Fixed - 2026 Season 3`
- `6317` = `Motorsport UK FF 1600 Trophy by Thrustmaster - 2026 Season 3`
- `6286` = `GT4 Falken Tyre Challenge - 2026 Season 3`
- `6294` = `Advanced Mazda MX-5 Cup by Heusinkveld - 2026 Season 3`
- `6298` = `iRacing Porsche Cup - Fixed by CONSPIT - 2026 Season 3`
- `6300` = `GT Endurance Series by Simucube - 2026 Season 3`
- `6289` = `IMSA Michelin Pilot Challenge - 2026 Season 3`
- `6302` = `GT3 Challenge Fixed by Fanatec - 2026 Season 3`
- `6306` = `GTE Sprint Series - 2026 Season 3`
- `6308` = `LMP2 Challenge  - 2026 Season 3 - Fixed`
- `6310` = `IMSA Endurance Series - 2026 Season 3`
- `6301` = `GT Sprint Series by Simucube - 2026 Season 3`
- `6337` = `Formula A - Cosworth Cup Grand Prix - 2026 Season 3`
- `6311` = `IMSA iRacing Series - 2026 Season 3`
- `6312` = `IMSA iRacing Series - Fixed - 2026 Season 3`
- `6338` = `Formula A - Cosworth Cup Grand Prix - Fixed - 2026 Season 3`
- `6322` = `FIA F4 Esports Regional Tour - Europe - 2026 Season 3`

### How to find the new IDs next season

When the season is updated, search the fresh `JM_seasonData.json` or `API_currentSeason.json` for the same series names above, then replace the IDs in `SeasonWrap.jsx` with the new values.

### Season changes to expect

- Some series keep the same slot but lose or gain a sponsor in the visible name.
- Some fixed/open pairs keep the base series but change the suffix wording.
- A default series can disappear entirely, so the replacement may be a nearby class entry rather than a one-to-one rename.
- When the exact old name is gone, search by the base series family first, then confirm by `license_group`.

## What to verify before closing the update

- Every default ID still exists in the new `JM_seasonData.json`.
- Each tab points to the intended current series for its license class.
- The planner page and buy guide still render without empty defaults.
- The archive folder was created for the new season and contains the full snapshot.
- The green alert banner in `src/layouts/BaseLayout.astro` points to the current season copy in the locale files.

## Banner copy

When the season changes, update the alert text in:

- `src/locales/lang/es.json`
- `src/locales/lang/en.json`

Keep the banner key the same:

- `alert.actualizacionCompletada2`

Only replace the season number and the wording so the message matches the new archive and default IDs.

If the banner is meant to be temporary, also set `expiresAt` on the `Alert` in `src/layouts/BaseLayout.astro` so it disappears automatically after the chosen window.

## Practical note

`src/functions/prepareDataSeason.ts` reads the `API_*.json` files from disk, so the refresh order matters:

1. Update the API source files.
2. Rebuild `JM_seasonData.json` and `JM_tracks.json`.
3. Archive the whole season snapshot.
4. Update the hardcoded default IDs if the new season changed them.
