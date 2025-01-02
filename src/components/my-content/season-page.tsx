import useSeason from "@/hooks/useSeason";
import { IR_URL } from "@/ir-data/utils/urls";
import { setMyTrack, setWishTrack, useIr } from "@/store/ir";
import {
  Flex,
  For,
  HStack,
  Image,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faBookmark,
  faCar,
  faCaretDown,
  faSackXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Checkbox } from "../ui/checkbox";
import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import ContentPopover from "./content-popover";
import SeasonHeader from "./season-header";

function SeasonPage() {
  const { weeksStartDates, seriesDateMap } = useSeason();
  const { myTracks, wishTracks, favoriteSeries } = useIr();

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <SeasonHeader />
      <Table.ScrollArea borderRadius={"md"}>
        <Table.Root size="sm" showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign={"center"} width="60px">
                Week
              </Table.ColumnHeader>
              <For
                each={favoriteSeries}
                children={(seriesId) => {
                  const series =
                    SERIES_JSON[
                      seriesId.toString() as keyof typeof SERIES_JSON
                    ];
                  return (
                    <Table.ColumnHeader
                      key={seriesId}
                      width="(100/x)%"
                      position={"relative"}
                    >
                      <>
                        <VStack>
                          {series.logo && (
                            <Image
                              h="40px"
                              fit="contain"
                              src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                            />
                          )}
                          <Text
                            textAlign={"center"}
                            lineClamp="2"
                            maxW={"200px"}
                          >
                            {series.name}
                          </Text>
                        </VStack>
                        <PopoverRoot lazyMount unmountOnExit>
                          <PopoverTrigger asChild>
                            <HStack
                              gap={1}
                              justifyContent={"center"}
                              cursor={"pointer"}
                              position={"absolute"}
                              right={1}
                              top={1}
                            >
                              <FontAwesomeIcon icon={faCar} />
                              {series.cars.length}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </HStack>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <ContentPopover content="cars" list={series.cars} />
                          </PopoverContent>
                        </PopoverRoot>
                      </>
                    </Table.ColumnHeader>
                  );
                }}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={weeksStartDates}
              children={(date) => {
                const locale = "en-US";
                const longFormat: Intl.DateTimeFormatOptions = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const shortFormat: Intl.DateTimeFormatOptions = {
                  month: "short",
                  day: "numeric",
                };
                const weekStart = new Date(date);
                const weekEndDay = new Date(
                  new Date(weekStart).setUTCDate(weekStart.getDate() + 7),
                );
                return (
                  <Table.Row key={date} height="60px">
                    <Table.Cell width="60px">
                      <Tooltip
                        content={`${weekStart.toLocaleDateString(
                          locale,
                          longFormat,
                        )} - ${weekEndDay.toLocaleDateString(
                          locale,
                          longFormat,
                        )}`}
                        showArrow
                        positioning={{ placement: "top" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <Text textAlign={"right"}>
                          {weekStart.toLocaleDateString("en-US", shortFormat)}
                        </Text>
                      </Tooltip>
                    </Table.Cell>
                    <For
                      each={favoriteSeries}
                      children={(seriesId) => {
                        const trackId =
                          seriesDateMap[seriesId as keyof typeof seriesDateMap][
                            date
                          ];
                        const track =
                          TRACKS_JSON[trackId as keyof typeof TRACKS_JSON];
                        const wish = track && wishTracks.includes(track.sku);
                        const owned = track && myTracks.includes(track.sku);
                        return (
                          <Table.Cell
                            key={seriesId}
                            width="(100/x)%"
                            position={"relative"}
                            color={
                              track && {
                                _dark: track.free
                                  ? "green.400"
                                  : myTracks.includes(track.sku)
                                  ? "green.400"
                                  : wishTracks.includes(track.sku)
                                  ? "teal.400"
                                  : "red.400",
                                base: track.free
                                  ? "green.600"
                                  : myTracks.includes(track.sku)
                                  ? "green.600"
                                  : wishTracks.includes(track.sku)
                                  ? "teal.600"
                                  : "red.600",
                              }
                            }
                            bgColor={
                              track && {
                                base: track.free
                                  ? "green.50"
                                  : myTracks.includes(track.sku)
                                  ? "green.50"
                                  : wishTracks.includes(track.sku)
                                  ? "teal.50"
                                  : "red.50",
                                _dark: track.free
                                  ? "green.800"
                                  : myTracks.includes(track.sku)
                                  ? "green.800"
                                  : wishTracks.includes(track.sku)
                                  ? "teal.800"
                                  : "red.800",
                              }
                            }
                          >
                            {track && (
                              <>
                                <Tooltip
                                  content={track.name}
                                  showArrow
                                  positioning={{ placement: "top" }}
                                  openDelay={200}
                                  closeDelay={100}
                                >
                                  <Text textAlign={"center"} lineClamp="2">
                                    {track.name}
                                  </Text>
                                </Tooltip>
                                <Checkbox
                                  size={"xs"}
                                  position={"absolute"}
                                  right={1}
                                  top={1}
                                  readOnly={track.free}
                                  colorPalette={
                                    track.free
                                      ? "green"
                                      : wish
                                      ? "blue"
                                      : undefined
                                  }
                                  checked={track.free || owned || wish}
                                  controlProps={{
                                    borderColor:
                                      !track.free && !wish && !owned
                                        ? "gray.400"
                                        : undefined,
                                  }}
                                  icon={
                                    track.free ? (
                                      <FontAwesomeIcon
                                        size="xs"
                                        icon={faSackXmark}
                                      />
                                    ) : wish ? (
                                      <FontAwesomeIcon
                                        size="xs"
                                        icon={faBookmark}
                                      />
                                    ) : undefined
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                  onCheckedChange={() => {
                                    if (owned) {
                                      setMyTrack(track.sku, false);
                                      setWishTrack(track.sku, true);
                                    } else if (wish) {
                                      setWishTrack(track.sku, false);
                                    } else {
                                      setMyTrack(track.sku, true);
                                    }
                                  }}
                                />
                              </>
                            )}
                          </Table.Cell>
                        );
                      }}
                    />
                  </Table.Row>
                );
              }}
            />
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Flex>
  );
}

export default SeasonPage;
