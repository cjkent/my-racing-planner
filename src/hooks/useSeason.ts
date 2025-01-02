import { useIr } from "@/store/ir";
import { useMemo } from "react";
import SERIES_JSON from "../ir-data/series.json";

const useSeason = () => {
  const { favoriteSeries } = useIr();

  const weeksStartDates = useMemo(
    () => [
      ...new Set(
        favoriteSeries
          .map((seriesId) =>
            SERIES_JSON[
              seriesId.toString() as keyof typeof SERIES_JSON
            ].weeks.map((w) => w.date),
          )
          .flat(),
      ),
    ],
    [favoriteSeries],
  );

  const seriesDateMap = useMemo(
    () =>
      favoriteSeries.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: SERIES_JSON[
            curr.toString() as keyof typeof SERIES_JSON
          ].weeks.reduce(
            (acc2, curr2) => ({ ...acc2, [curr2.date]: curr2.track.id }),
            {},
          ),
        }),
        {},
      ),
    [favoriteSeries],
  );

  return { weeksStartDates, seriesDateMap };
};

export default useSeason;
