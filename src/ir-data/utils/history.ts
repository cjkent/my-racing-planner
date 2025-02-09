import STATS_JSON from "../stats.json";
import { ECarCategories } from "./types";
export enum EHistorySince {
  Ever = "ever",
  TenYears = "tenYears",
  FiveYears = "fiveYears",
  ThreeYears = "threeYears",
  LastYear = "lastYear",
  ThisYear = "thisYear",
}

function getKeyFromValue(value: ECarCategories): string | undefined {
  const entry = Object.entries(ECarCategories).find(
    ([_, val]) => val === value,
  );
  return entry ? entry[0] : undefined;
}

const thisYear = new Date().getUTCFullYear();

export const getSortedHistory = (
  category: ECarCategories = ECarCategories.all,
  since: EHistorySince = EHistorySince.Ever,
) => {
  return Object.values(STATS_JSON)
    .map((item: any) => ({
      sku: item.sku,
      id: item.id,
      released: item.released,
      usagePerYear: item.all.ever / Math.max(thisYear - item.released + 1, 1),
      count: item[getKeyFromValue(category) ?? "_"]?.[since] ?? 0,
    }))
    .sort((a, b) => (a.count < b.count ? 1 : -1));
};
