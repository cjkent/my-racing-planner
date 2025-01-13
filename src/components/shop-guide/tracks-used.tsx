import { getPreviousTuesday } from "@/hooks/useSeason";
import { setMyTrack, setWishTrack, useIr } from "@/store/ir";
import {
  Badge,
  Flex,
  For,
  HStack,
  Table,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  faBookmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import TRACKS_LIST from "../../ir-data/utils/tracks";
import ContentNameBadge from "../content/content-name-badge";
import { Checkbox } from "../ui/checkbox";
import { EmptyState } from "../ui/empty-state";
import { Tooltip } from "../ui/tooltip";

function TracksUsed() {
  const { myTracks, wishTracks, favoriteSeries } = useIr();

  const tracksMap = useMemo(
    () =>
      favoriteSeries.reduce((acc, curr) => {
        const series = SERIES_JSON[curr.toString() as keyof typeof SERIES_JSON];
        series.weeks.forEach((week) => {
          const track =
            TRACKS_JSON[week.track.id.toString() as keyof typeof TRACKS_JSON];
          if (track.free) {
            return acc;
          }
          const skuId = ("group" in track ? track.group : track.id) as number;
          acc[skuId] = acc[skuId] ?? {
            id: skuId,
            name: track.name,
            sku: track.sku,

            weeks: {},
            used: 0,
          };
          const weekDate = getPreviousTuesday(week.date);
          acc[skuId].weeks[series.id] = acc[skuId].weeks[series.id] ?? [];
          acc[skuId].weeks[series.id].push(weekDate);
          acc[skuId].used++;
        }, null);
        return acc;
      }, {} as { id: number; name: string; sku: number; weeks: { [key: number]: string[] }; used: number }[]),
    [favoriteSeries],
  );

  const tracksList = useMemo(
    () =>
      Object.values(tracksMap)
        .sort(
          (a, b) =>
            b.used +
            Object.keys(b.weeks).length -
            (a.used + Object.keys(a.weeks).length),
        )
        .concat(
          wishTracks
            .map((sku) => {
              const track = TRACKS_LIST.find((t) => t.sku === sku);
              return !!track && !(track.id in tracksMap)
                ? {
                    id: track.id,
                    name: track.name,
                    sku: track.sku,
                    weeks: {},
                    used: 0,
                  }
                : null;
            })
            .filter((t) => !!t),
        ),
    [tracksMap],
  );

  return (
    <Flex
      flex={1}
      borderRadius={"md"}
      // bgColor={"bg.muted"}
      overflowY={"auto"}
      maxH={"100%"}
      w={"100%"}
      h={"100%"}
      alignItems={"start"}
    >
      <Table.ScrollArea borderRadius={"md"} width={"100%"}>
        <Table.Root striped>
          <Table.Header>
            <Table.Row bgColor={"bg.muted"}>
              <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
                <VisuallyHidden>Owned content</VisuallyHidden>
              </Table.ColumnHeader>
              <Table.ColumnHeader width="100%">Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>Used</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              fallback={
                <Table.Row bgColor={"transparent"}>
                  <Table.Cell colSpan={8} minWidth={"100%"}>
                    <EmptyState
                      icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                      title={
                        favoriteSeries.length > 0
                          ? "No paid tracks missing"
                          : "No series selected"
                      }
                      description={
                        favoriteSeries.length > 0
                          ? "You already own all tracks of your favorite series"
                          : "You didn't choose any favorite series"
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              }
              each={tracksList}
              children={(item) => {
                const owned = myTracks.includes(item.sku);
                const wish = wishTracks.includes(item.sku);
                return (
                  <Table.Row bgColor={"transparent"} key={item.id}>
                    <Table.Cell
                      minWidth={"40px"}
                      textAlign={"center"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                    >
                      <Checkbox
                        size={"sm"}
                        mt={"2px"}
                        colorPalette={wish ? "blue" : undefined}
                        checked={owned || wish}
                        controlProps={{
                          borderColor: !wish && !owned ? "gray.400" : undefined,
                        }}
                        icon={
                          wish ? (
                            <FontAwesomeIcon size="xs" icon={faBookmark} />
                          ) : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => {
                          if (owned) {
                            setMyTrack(item.sku, false);
                            setWishTrack(item.sku, true);
                          } else if (wish) {
                            setWishTrack(item.sku, false);
                          } else {
                            setMyTrack(item.sku, true);
                          }
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell
                      display={"flex"}
                      p={1}
                      borderBottom={0}
                      px={"4px"}
                    >
                      <ContentNameBadge name={item.name} />
                    </Table.Cell>
                    <Table.Cell
                      minWidth={"90px"}
                      textAlign={"center"}
                      p={1}
                      borderBottom={0}
                      px={"4px"}
                    >
                      <Tooltip
                        lazyMount
                        unmountOnExit
                        content={Object.keys(item.weeks).map(
                          (seriesId: string) => (
                            <HStack
                              key={seriesId}
                              justifyContent={"space-between"}
                            >
                              <Text textAlign={"left"} truncate>
                                {
                                  SERIES_JSON[
                                    seriesId.toString() as keyof typeof SERIES_JSON
                                  ].name
                                }
                              </Text>
                              <Text textAlign={"right"}>
                                {item.weeks[parseInt(seriesId)].join(", ")}
                              </Text>
                            </HStack>
                          ),
                        )}
                        showArrow
                        positioning={{ placement: "top" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <Badge
                          size="xs"
                          variant={"solid"}
                          _light={{ bg: "gray.600" }}
                        >
                          {item.used}x
                        </Badge>
                      </Tooltip>
                    </Table.Cell>
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

export default TracksUsed;
