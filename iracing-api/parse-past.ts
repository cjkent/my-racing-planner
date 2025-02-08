import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import SERIES_JSON from "./raw/all-series.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const tracksMap: any = {};

  const len = SERIES_JSON.length;

  console.log("Fetching all series past seasons");
  let i = 1;
  for (const seriesItem of SERIES_JSON) {
    const { series_name, series_id } = seriesItem;

    console.log(`[${i++}/${len}] ${series_name} - Reading ${series_id}.json`);

    const contents = await readFile(
      path.join(dirname, `./raw/past/${series_id}.json`),
      "utf8",
    );

    const { series } = JSON.parse(contents);
    if (!series.official) {
      continue;
    }

    series.seasons.forEach((season: any) => {
      season.race_weeks.forEach((week: any) => {
        const prev = tracksMap[week.track.track_id] ?? {};
        tracksMap[week.track.track_id] = {
          ...prev,
          count: (prev.count ?? 0) + 1,
          [season.season_year]: {
            ...(prev[season.season_year] ?? {}),
            count: (prev[season.season_year]?.count ?? 0) + 1,
            [series.category]:
              (prev[season.season_year]?.[series.category] ?? 0) + 1,
          },
        };
      });
    });

    await writeFile(
      path.join(dirname, "./parsed/stats.json"),
      JSON.stringify(tracksMap, null, 2),
    );
  }
})();
