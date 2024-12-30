import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  apiGetCarAssets,
  apiGetCarClasses,
  apiGetCars,
  apiGetLicenses,
  apiGetSeriesAssets,
  apiGetSeriesSeasons,
  apiGetTrackAssets,
  apiGetTracks,
  authenticate,
} from "./api";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const email = process.env.IR_EMAIL ?? "";
  const password = process.env.IR_PASSWORD ?? "";

  await authenticate(email, password);

  const cars = await apiGetCars();
  await writeFile(
    path.join(dirname, "./raw/cars.json"),
    JSON.stringify(cars.data, null, 2),
  );

  const carAssets = await apiGetCarAssets();
  await writeFile(
    path.join(dirname, "./raw/car-assets.json"),
    JSON.stringify(carAssets.data, null, 2),
  );

  const tracks = await apiGetTracks();
  await writeFile(
    path.join(dirname, "./raw/tracks.json"),
    JSON.stringify(tracks.data, null, 2),
  );

  const trackAssets = await apiGetTrackAssets();
  await writeFile(
    path.join(dirname, "./raw/track-assets.json"),
    JSON.stringify(trackAssets.data, null, 2),
  );

  // const series = await apiGetSeries();
  // await writeFile(
  //   path.join(dirname, "./raw/series.json"),
  //   JSON.stringify(series.data, null, 2),
  // );

  const seriesSeason = await apiGetSeriesSeasons();
  await writeFile(
    path.join(dirname, "./raw/series-season.json"),
    JSON.stringify(seriesSeason.data, null, 2),
  );

  const seriesAssets = await apiGetSeriesAssets();
  await writeFile(
    path.join(dirname, "./raw/series-assets.json"),
    JSON.stringify(seriesAssets.data, null, 2),
  );

  const carClass = await apiGetCarClasses();
  await writeFile(
    path.join(dirname, "./raw/car-classes.json"),
    JSON.stringify(carClass.data, null, 2),
  );

  const lookupLicenses = await apiGetLicenses();
  await writeFile(
    path.join(dirname, "./raw/licenses.json"),
    JSON.stringify(lookupLicenses.data, null, 2),
  );

  // const seasons = await apiGetSeasons("2025", "1");
  // await writeFile(
  //   path.join(dirname, "./raw/seasons.json"),
  //   JSON.stringify(seasons.data, null, 2),
  // );
})();
