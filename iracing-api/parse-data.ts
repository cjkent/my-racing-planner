import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import CAR_ASSETS_JSON from "./raw/car-assets.json";
import CLASSES_JSON from "./raw/car-classes.json";
import CARS_JSON from "./raw/cars.json";
import LICENSES_JSON from "./raw/licenses.json";
import SERIES_ASSETS_JSON from "./raw/series-assets.json";
import SERIES_SEASON_JSON from "./raw/series-season.json";
import TRACK_ASSETS_JSON from "./raw/track-assets.json";
import TRACKS_JSON from "./raw/tracks.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const classesById = CLASSES_JSON.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.car_class_id]: curr.cars_in_class.map((c) => c.car_id),
    }),
    {},
  );

  const seriesCarsTracksMaps = (SERIES_SEASON_JSON as any[]).reduce(
    (acc, curr) => {
      const seriesId = curr.schedules[0].series_id;

      const cars = [
        ...new Set(
          curr.car_class_ids
            .map((c: keyof typeof classesById) => classesById[c])
            .flat(),
        ),
      ];
      const tracks = curr.schedules.map((w: any) => w.track.track_id);

      acc.seriesCars[seriesId] = cars;

      cars.forEach((car: any) => {
        if (!acc.carSeries[car]) {
          acc.carSeries[car] = [];
        }
        acc.carSeries[car].push(seriesId);
      });

      tracks.forEach((tracks: any) => {
        if (!acc.trackSeries[tracks]) {
          acc.trackSeries[tracks] = [];
        }
        if (!acc.trackSeries[tracks].includes(seriesId)) {
          acc.trackSeries[tracks].push(seriesId);
        }
      });

      return acc;
    },
    {
      seriesCars: {},
      carSeries: {},
      trackSeries: {},
    } as {
      seriesCars: Record<number, number[]>;
      carSeries: Record<number, number[]>;
      trackSeries: Record<number, number[]>;
    },
  );

  const parsedCars = CARS_JSON.filter((car) => car.is_ps_purchasable).map(
    (car) => ({
      id: car.car_id,
      name: car.car_name,
      categories: car.categories,
      free: car.free_with_subscription,
      price: car.price,
      sku: car.sku,
      series: seriesCarsTracksMaps.carSeries[car.car_id],
      logo:
        CAR_ASSETS_JSON[`${car.car_id}` as keyof typeof CAR_ASSETS_JSON]
          ?.logo ?? undefined,
    }),
  );

  const carsById = parsedCars.reduce((acc, curr) => {
    const existing = Object.values(acc).find((item) => item.sku === curr.sku);
    if (existing) {
      acc[curr.id] = { ...curr, group: existing.id };
    } else {
      const skuGroup = parsedCars
        .filter((item) => item.sku === curr.sku)
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {});
      acc[curr.id] = {
        ...curr,
        skuGroup: Object.keys(skuGroup).length > 1 ? skuGroup : undefined,
      };
    }
    return acc;
  }, {} as Record<string, (typeof parsedCars)[0] & { skuGroup?: { [key: string]: string }; group?: number }>);

  const parsedTracks = TRACKS_JSON.filter(
    (track) => track.is_ps_purchasable,
  ).map((track) => ({
    id: track.track_id,
    name: track.track_name,
    config: track.config_name ?? "",
    categories: [track.category],
    free: track.free_with_subscription,
    price: track.price,
    sku: track.sku,
    series: seriesCarsTracksMaps.trackSeries[track.track_id],
    logo:
      TRACK_ASSETS_JSON[`${track.track_id}` as keyof typeof TRACK_ASSETS_JSON]
        ?.logo ?? undefined,
  }));

  const tracksById = parsedTracks.reduce((acc, curr) => {
    const existing = Object.values(acc).find((item) => item.sku === curr.sku);
    if (existing) {
      acc[curr.id] = { ...curr, group: existing.id };
      if (!acc[existing.id].categories.includes(curr.categories[0])) {
        acc[existing.id].categories.push(curr.categories[0]);
      }
    } else {
      const skuGroup = parsedTracks
        .filter((item) => item.sku === curr.sku)
        .reduce((acc, curr) => ({ ...acc, [curr.id]: curr.config }), {});
      acc[curr.id] = {
        ...curr,
        skuGroup: Object.keys(skuGroup).length > 1 ? skuGroup : undefined,
      };
    }
    return acc;
  }, {} as Record<string, (typeof parsedTracks)[0] & { skuGroup?: { [key: string]: string }; group?: number }>);

  const licensesById = LICENSES_JSON.map((group) => ({
    id: group.license_group,
    name: group.group_name,
    letter: group.levels[0].license_letter,
    color: group.levels[0].color,
  })).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

  const seriesById = (SERIES_SEASON_JSON as any[])
    .map((season) => ({
      id: season.schedules[0].series_id,
      name: season.schedules[0].series_name,
      category: season.schedules[0].category,
      laps: season.schedules[0].race_lap_limit,
      duration: season.schedules[0].race_time_limit,
      season: {
        id: season.season_id,
        name: season.season_name,
      },
      official: season.official,
      fixed: season.fixed_setup,
      multiclass: season.multiclass,
      cars: seriesCarsTracksMaps.seriesCars[season.schedules[0].series_id],
      license: licensesById[season.license_group as keyof typeof licensesById],
      logo:
        SERIES_ASSETS_JSON[
          `${season.schedules[0].series_id}` as keyof typeof SERIES_ASSETS_JSON
        ]?.logo ?? undefined,
      weeks: season.schedules.map((week: any) => ({
        weekNum: week.race_week_num,
        date: week.start_date,
        track: {
          id: week.track.track_id,
          name: week.track.track_name,
          config: week.track.config_name,
        },
      })),
    }))
    .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

  await writeFile(
    path.join(dirname, "./parsed/cars.json"),
    JSON.stringify(carsById, null, 2),
  );

  await writeFile(
    path.join(dirname, "./parsed/tracks.json"),
    JSON.stringify(tracksById, null, 2),
  );

  await writeFile(
    path.join(dirname, "./parsed/series.json"),
    JSON.stringify(seriesById, null, 2),
  );
})();
