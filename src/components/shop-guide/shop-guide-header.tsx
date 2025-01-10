import { useIr } from "@/store/ir";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";

function ShopGuideHeader() {
  const { myTracks, wishTracks, favoriteSeries } = useIr();

  const counts = useMemo(
    () =>
      favoriteSeries.reduce(
        (acc, curr) => {
          [
            ...new Set(
              SERIES_JSON[
                curr.toString() as keyof typeof SERIES_JSON
              ].weeks.map((w) => w.track.id),
            ),
          ].forEach((trackId) => {
            const track =
              TRACKS_JSON[trackId.toString() as keyof typeof TRACKS_JSON];
            if (track) {
              const free = track.free ? 0 : 1;
              const owned = myTracks.includes(track.sku) ? 1 : 0;
              const wish = wishTracks.includes(track.sku) ? 1 : 0;
              acc.free = acc.free + free;
              acc.owned = acc.owned + owned;
              acc.wish = acc.wish + wish;
            }
          });
          return acc;
        },
        { free: 0, owned: 0, wish: 0 },
      ),
    [myTracks, wishTracks, favoriteSeries],
  );

  return (
    <HStack padding={4} justifyContent={"space-between"}>
      <Stack>
        <Heading size="4xl" fontFamily="mono" fontWeight="bold">
          Shop Guide
        </Heading>
        <Text>
          See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com
        </Text>
      </Stack>
    </HStack>
  );
}

export default ShopGuideHeader;
