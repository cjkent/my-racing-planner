import useSeason, { formatDate, getPreviousTuesday } from "@/hooks/useSeason";
import { ECarCategories } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import {
  setFavoriteSeriesItem,
  setFavoriteSeriesList,
  setMyTrack,
  setWishTrack,
  useIr,
} from "@/store/ir";
import { ETabs, setHelpPresented, useUi } from "@/store/ui";
import {
  Flex,
  For,
  HStack,
  Image,
  Link,
  List,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  faBookmark,
  faCar,
  faCaretDown,
  faMagnifyingGlass,
  faSackXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import CARS_JSON from "../../ir-data/cars.json";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import ContentPopover from "../content/content-popover";
import { Checkbox } from "../ui/checkbox";
import { EmptyState } from "../ui/empty-state";
import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import SeasonFilterPanel from "./season-filter-panel";
import SeasonHeader from "./season-header";
import SortableColumnCell from "./sortable-column-cell";
import SortableColumnHeader from "./sortable-column-header";

function SeasonPage() {
  const { weeksStartDates, seriesDateMap } = useSeason();
  const { myCars, wishCars, myTracks, wishTracks, favoriteSeries } = useIr();
  const [highlightTrack, setHighlightTrack] = useState<number>(-1);
  const {
    seasonStickyHeader,
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowThisWeek,
    seasonCategory,
  } = useUi();

  const [_, navigate] = useLocation();

  const [filteredFavorites, setFilteredFavorites] = useState(favoriteSeries);
  useEffect(() => {
    const filtered =
      seasonCategory === ECarCategories.all
        ? favoriteSeries
        : favoriteSeries.filter(
            (seriesId: any) =>
              ECarCategories[
                SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON]
                  .category as keyof typeof ECarCategories
              ] === seasonCategory,
          );
    setFilteredFavorites(filtered);
  }, [seasonCategory, favoriteSeries]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active?.id !== over?.id) {
      setFavoriteSeriesItem;
      const oldIndex = favoriteSeries.indexOf(active.id as number);
      const newIndex = favoriteSeries.indexOf(over.id as number);
      setFavoriteSeriesList(arrayMove(favoriteSeries, oldIndex, newIndex));
    }
  }

  const [hideHeaderText, setHideHeaderText] = useState(false);
  const [tableScroll, setTableScroll] = useState(false);
  const handleScroll = (event: any) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrolled = tableScroll ? scrollTop > 0 : scrollTop > 60;
    setTableScroll(scrolled);
  };

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <SeasonHeader />
      {favoriteSeries.length === 0 && (
        <Flex
          flex={1}
          borderRadius={"md"}
          bgColor={"bg.muted"}
          p={4}
          justifyContent={"center"}
        >
          <EmptyState
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            title="No series selected"
            description="You didn't choose any favorite series"
          >
            <List.Root variant="marker">
              <List.Item>
                <Link onClick={() => setHelpPresented(false)}>
                  Read the Help Page instructions
                </Link>
              </List.Item>
              <List.Item onClick={() => navigate(ETabs.MySeries)}>
                <Link>Go directly to the My Series page</Link>
              </List.Item>
            </List.Root>
          </EmptyState>
        </Flex>
      )}
      {favoriteSeries.length > 0 && <SeasonFilterPanel />}

      {favoriteSeries.length > 0 && filteredFavorites.length === 0 && (
        <Flex flex={1} borderRadius={"md"} bgColor={"bg.muted"} p={4}>
          <EmptyState
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            title="No series found"
            description="Try different categories"
          />
        </Flex>
      )}

      {filteredFavorites.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}
        >
          <SortableContext
            items={filteredFavorites}
            strategy={horizontalListSortingStrategy}
            disabled={!seasonShowReorder}
          >
            <Table.ScrollArea
              borderRadius={"md"}
              onScroll={seasonStickyHeader ? handleScroll : undefined}
            >
              <Table.Root
                size="sm"
                showColumnBorder
                stickyHeader={seasonStickyHeader}
              >
                <Table.Header>
                  <Table.Row bgColor={"bg.muted"}>
                    <Table.ColumnHeader textAlign={"center"} width="60px">
                      Week
                    </Table.ColumnHeader>

                    <For
                      each={filteredFavorites}
                      children={(seriesId) => {
                        const series =
                          SERIES_JSON[
                            seriesId.toString() as keyof typeof SERIES_JSON
                          ];
                        return (
                          <SortableColumnHeader
                            dragId={seriesId}
                            dragEnabled={seasonShowReorder}
                            key={seriesId}
                            width="(100/x)%"
                            position={"relative"}
                            bgColor={"currentBg"}
                          >
                            <>
                              <VStack>
                                {series.logo && (
                                  <Image
                                    loading="lazy"
                                    userSelect={"none"}
                                    draggable={false}
                                    h="40px"
                                    fit="contain"
                                    src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                                  />
                                )}

                                <Tooltip
                                  lazyMount
                                  unmountOnExit
                                  content={series.name}
                                  showArrow
                                  positioning={{ placement: "bottom" }}
                                  openDelay={200}
                                  closeDelay={100}
                                >
                                  <Text
                                    textAlign={"center"}
                                    lineClamp="2"
                                    maxW={"200px"}
                                    opacity={
                                      !seasonStickyHeader || !tableScroll
                                        ? 1
                                        : 0
                                    }
                                    transition={"opacity 0.2s linear"}
                                    onTransitionEnd={() =>
                                      setHideHeaderText(tableScroll)
                                    }
                                  >
                                    {(!seasonStickyHeader ||
                                      !tableScroll ||
                                      !hideHeaderText) &&
                                      series.name}
                                  </Text>
                                </Tooltip>
                              </VStack>
                              {seasonShowCarsDropdown && (
                                <PopoverRoot lazyMount unmountOnExit>
                                  <PopoverTrigger asChild>
                                    <HStack
                                      gap={1}
                                      justifyContent={"center"}
                                      cursor={"pointer"}
                                      position={"absolute"}
                                      right={1}
                                      top={1}
                                      bgColor={"bg.muted"}
                                      px={2}
                                      rounded={"4px"}
                                    >
                                      <FontAwesomeIcon icon={faCar} />
                                      {series.cars.length}
                                      <FontAwesomeIcon icon={faCaretDown} />
                                    </HStack>
                                  </PopoverTrigger>
                                  <PopoverContent p={2}>
                                    <PopoverArrow />
                                    <ContentPopover
                                      content="cars"
                                      list={series.cars}
                                    />
                                  </PopoverContent>
                                </PopoverRoot>
                              )}
                            </>
                          </SortableColumnHeader>
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
                      const thisWeek =
                        seasonShowThisWeek &&
                        getPreviousTuesday(formatDate(new Date())) === date;

                      return (
                        <Table.Row
                          bgColor={"bg.muted"}
                          key={date}
                          height="60px"
                          borderYWidth={thisWeek ? "2px" : undefined}
                          borderColor={thisWeek ? "bg.inverted" : undefined}
                        >
                          <Table.Cell
                            width="60px"
                            bgColor={thisWeek ? "bg.inverted" : undefined}
                            color={thisWeek ? "bg" : undefined}
                          >
                            <Tooltip
                              lazyMount
                              unmountOnExit
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
                                {weekStart.toLocaleDateString(
                                  "en-US",
                                  shortFormat,
                                )}
                              </Text>
                            </Tooltip>
                          </Table.Cell>
                          <For
                            each={filteredFavorites}
                            children={(seriesId) => {
                              const trackId =
                                seriesDateMap[
                                  seriesId as keyof typeof seriesDateMap
                                ][date];

                              const cars: number[] =
                                seriesDateMap[
                                  seriesId as keyof typeof seriesDateMap
                                ][`${date}_cars`] || [];
                              const freeAny = cars.some(
                                (carId) =>
                                  CARS_JSON[
                                    carId.toString() as keyof typeof CARS_JSON
                                  ].free,
                              );
                              const ownAny = cars.some((carId) =>
                                myCars.includes(
                                  CARS_JSON[
                                    carId.toString() as keyof typeof CARS_JSON
                                  ].sku,
                                ),
                              );
                              const wishAny = cars.some((carId) =>
                                wishCars.includes(
                                  CARS_JSON[
                                    carId.toString() as keyof typeof CARS_JSON
                                  ].sku,
                                ),
                              );

                              const colorCar =
                                cars.length > 0
                                  ? {
                                      base: freeAny
                                        ? "green.400"
                                        : ownAny
                                        ? "teal.400"
                                        : wishAny
                                        ? "blue.400"
                                        : "red.400",
                                      _dark: freeAny
                                        ? "green.600"
                                        : ownAny
                                        ? "teal.600"
                                        : wishAny
                                        ? "blue.600"
                                        : "red.600",
                                    }
                                  : undefined;

                              const track =
                                TRACKS_JSON[
                                  trackId as keyof typeof TRACKS_JSON
                                ];
                              const wish =
                                track && wishTracks.includes(track.sku);
                              const owned =
                                track && myTracks.includes(track.sku);
                              const highlight = highlightTrack === track?.sku;
                              const color = track && {
                                _dark: track.free
                                  ? "green.400"
                                  : seasonShowOwned &&
                                    myTracks.includes(track.sku)
                                  ? "teal.400"
                                  : seasonShowWishlist &&
                                    wishTracks.includes(track.sku)
                                  ? "blue.400"
                                  : "red.400",
                                base: track.free
                                  ? "green.600"
                                  : seasonShowOwned &&
                                    myTracks.includes(track.sku)
                                  ? "teal.600"
                                  : seasonShowWishlist &&
                                    wishTracks.includes(track.sku)
                                  ? "blue.600"
                                  : "red.600",
                              };
                              const bgColor = track && {
                                base: track.free
                                  ? "green.50"
                                  : seasonShowOwned &&
                                    myTracks.includes(track.sku)
                                  ? "teal.50"
                                  : seasonShowWishlist &&
                                    wishTracks.includes(track.sku)
                                  ? "blue.50"
                                  : "red.50",
                                _dark: track.free
                                  ? "green.800"
                                  : seasonShowOwned &&
                                    myTracks.includes(track.sku)
                                  ? "teal.800"
                                  : seasonShowWishlist &&
                                    wishTracks.includes(track.sku)
                                  ? "blue.800"
                                  : "red.800",
                              };
                              return (
                                <SortableColumnCell
                                  dragEnabled={seasonShowReorder}
                                  dragId={seriesId}
                                  key={seriesId}
                                  width="(100/x)%"
                                  position={"relative"}
                                  onMouseEnter={() =>
                                    seasonHighlight &&
                                    setHighlightTrack(track?.sku)
                                  }
                                  onMouseLeave={() =>
                                    seasonHighlight && setHighlightTrack(-1)
                                  }
                                  bgColor={
                                    seasonHighlight && highlight
                                      ? color
                                      : bgColor
                                  }
                                  color={
                                    seasonHighlight && highlight ? "bg" : color
                                  }
                                >
                                  {track && (
                                    <>
                                      <Text textAlign={"center"} lineClamp="3">
                                        {track.name}
                                      </Text>

                                      {seasonShowCarsDropdown &&
                                        cars.length > 0 && (
                                          <PopoverRoot lazyMount unmountOnExit>
                                            <PopoverTrigger asChild>
                                              <HStack
                                                gap={1}
                                                justifyContent={"center"}
                                                cursor={"pointer"}
                                                position={"absolute"}
                                                right={1}
                                                top={1}
                                                bgColor={colorCar}
                                                color={"fg"}
                                                px={2}
                                                rounded={"4px"}
                                              >
                                                <FontAwesomeIcon icon={faCar} />
                                                {cars.length}
                                                <FontAwesomeIcon
                                                  icon={faCaretDown}
                                                />
                                              </HStack>
                                            </PopoverTrigger>
                                            <PopoverContent p={2}>
                                              <PopoverArrow />
                                              <ContentPopover
                                                content="cars"
                                                list={cars}
                                              />
                                            </PopoverContent>
                                          </PopoverRoot>
                                        )}

                                      {seasonShowCheckboxes && (
                                        <Checkbox
                                          size={"xs"}
                                          position={"absolute"}
                                          left={1}
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
                                      )}
                                    </>
                                  )}
                                </SortableColumnCell>
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
          </SortableContext>
        </DndContext>
      )}
    </Flex>
  );
}

export default SeasonPage;
