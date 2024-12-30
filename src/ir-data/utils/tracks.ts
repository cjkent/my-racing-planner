import TRACKS_JSON from "../../ir-data/tracks.json";
import { TContent } from "./types";

const SORTED_TRACKS: TContent[] = Object.values(TRACKS_JSON)
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

export default SORTED_TRACKS;

export const FREE_TRACKS = SORTED_TRACKS.filter((c) => c.free).length;
