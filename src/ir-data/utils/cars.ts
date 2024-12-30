import CARS_JSON from "../../ir-data/cars.json";
import { TContent } from "./types";

const SORTED_CARS: TContent[] = Object.values(CARS_JSON)
  .filter((c) => !("group" in c))
  .sort((a, b) => {
    const aHasBracket = a.name.includes("[");
    const bHasBracket = b.name.includes("[");
    if (aHasBracket && !bHasBracket) {
      return 1;
    } else if (!aHasBracket && bHasBracket) {
      return -1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

export default SORTED_CARS;

export const FREE_CARS = SORTED_CARS.filter((c) => c.free).length;
