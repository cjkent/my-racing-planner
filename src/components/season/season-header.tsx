import { useIr } from "@/store/ir";
import { Badge, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { faBookmark, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function SeasonHeader() {
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
          My Season Planner
        </Heading>
        <Text>
          Plan your season weeks, you can drag and drop series columns.
        </Text>
      </Stack>
      <Stack>
        <Tooltip
          lazyMount
          unmountOnExit
          content={"Available for free with an iRacing subscription"}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
              colorPalette={"green"}
            >
              {counts.free}
            </Badge>
            <Checkbox
              readOnly={true}
              colorPalette={"green"}
              checked={true}
              icon={<FontAwesomeIcon icon={faSackXmark} />}
            >
              <Text>Free</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
        <Tooltip
          lazyMount
          unmountOnExit
          content={"Content you already purchased"}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
            >
              {counts.owned}
            </Badge>
            <Checkbox readOnly={true} checked={true}>
              <Text>Owned</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
        <Tooltip
          lazyMount
          unmountOnExit
          content={"Content you wish to buy"}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
              colorPalette={"blue"}
            >
              {counts.wish}
            </Badge>
            <Checkbox
              readOnly={true}
              colorPalette={"blue"}
              checked={true}
              icon={<FontAwesomeIcon icon={faBookmark} />}
            >
              <Text>Wishlist</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
      </Stack>
    </HStack>
  );
}

export default SeasonHeader;
