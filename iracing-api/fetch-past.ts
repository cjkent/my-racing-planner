import "dotenv/config";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { apiGetSeriesPastSeasons, authenticate } from "./api";
import SERIES_JSON from "./raw/all-series.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const email = process.env.IRACING_USERNAME ?? "";
  const password = process.env.IRACING_PASSWORD ?? "";

  if (email === "" || password === "") {
    console.error("Missing iRacing credentials");
    return;
  }

  await authenticate(email, password);

  const len = SERIES_JSON.length;
  console.log("Fetching all series past seasons");
  let i = 1;
  for (const seriesItem of SERIES_JSON) {
    const { series_name, series_id } = seriesItem;

    console.log(`[${i++}/${len}] ${series_name} as ${series_id}.json`);
    const series = await apiGetSeriesPastSeasons(series_id.toString());
    await writeFile(
      path.join(dirname, `./raw/past/${series_id}.json`),
      JSON.stringify(series.data, null, 2),
    );
  }
})();
