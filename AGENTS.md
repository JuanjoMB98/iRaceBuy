# Season data updates

When updating iRacing season data, keep the Buy Guide's default selections intact.

1. Refresh the API source files and regenerate `src/data/JM_seasonData.json` and `src/data/JM_tracks.json`.
2. Confirm every default `seriesId` in `src/components/buyGuide/SeasonWrap/SeasonWrap.jsx` resolves to exactly one current season in `JM_seasonData.json`.
3. Do not replace the defaults with `season_id` values: season IDs change each season. The UI must use stable `seriesId` values and resolve them to the current season IDs in `SeasonViewer`.
   The planner's `CalendarViewer` follows the same rule and uses the all-category defaults.
   It migrates its saved selection once for each new season, so do not remove its season-version check.
4. If a selected series is retired or its `series_id` changes, identify and document the intended replacement before changing the defaults.
5. When regenerating `JM_tracks.json`, ensure each grouped circuit uses a non-retired variant as its representative map. Legacy map assets can return HTTP 403 even when a current variant in the same circuit folder has a valid map.
6. Keep the season-status alerts dynamic. `BaseLayout.astro` derives the end of the current regular season from the downloaded schedule; do not replace it with fixed dates.
