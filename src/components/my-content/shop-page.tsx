import { getPreviousTuesday } from "@/hooks/useSeason";
import { setMyTrack, setWishTrack, useIr } from "@/store/ir";
import {
  Badge,
  Flex,
  For,
  HStack,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import TRACKS_LIST from "../../ir-data/utils/tracks";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import ContentNameBadge from "./content-name-badge";
import PriceBadge from "./price-badge";
import ShopGuideHeader from "./shop-guide-header";
import WishlistPanel from "./wishlist-panel";

function ShopPage() {
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
            price: track.price,
            weeks: {},
            used: 0,
          };
          const weekDate = getPreviousTuesday(week.date);
          acc[skuId].weeks[series.id] = acc[skuId].weeks[series.id] ?? [];
          acc[skuId].weeks[series.id].push(weekDate);
          acc[skuId].used++;
        }, null);
        return acc;
      }, {} as { id: number; name: string; price: number; sku: number; weeks: { [key: number]: string[] }; used: number }[]),
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
                    price: track.price,
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
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <ShopGuideHeader />
      <HStack flex={1} alignItems={"start"}>
        <Stack flex={1} borderRadius={"md"} minH={"100%"} bgColor={"bg"}>
          <Table.ScrollArea borderRadius={"md"}>
            <Table.Root size="sm" striped>
              <Table.Header fontSize={"xs"}>
                <Table.Row>
                  <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
                    <VisuallyHidden>Owned content</VisuallyHidden>
                  </Table.ColumnHeader>
                  <Table.ColumnHeader width="100%">Name</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"} width="180px">
                    Used
                  </Table.ColumnHeader>
                  <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
                    Price
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body fontSize={"xs"}>
                <For
                  each={tracksList}
                  children={(item) => {
                    const owned = myTracks.includes(item.sku);
                    const wish = wishTracks.includes(item.sku);
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell
                          minWidth={"40px"}
                          textAlign={"center"}
                          p={0}
                          borderBottom={0}
                          px={"4px"}
                        >
                          <Checkbox
                            size={"xs"}
                            mt={"4px"}
                            colorPalette={wish ? "blue" : undefined}
                            checked={owned || wish}
                            controlProps={{
                              borderColor:
                                !wish && !owned ? "gray.400" : undefined,
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
                          width={"100%"}
                          display={"flex"}
                          alignItems={"center"}
                          p={0}
                          borderBottom={0}
                          px={"4px"}
                        >
                          <ContentNameBadge name={item.name} />
                        </Table.Cell>
                        <Table.Cell
                          minWidth={"90px"}
                          textAlign={"center"}
                          p={0}
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
                        <Table.Cell
                          minWidth={"90px"}
                          textAlign={"center"}
                          p={0}
                          borderBottom={0}
                          px={"4px"}
                        >
                          <PriceBadge size="xs" price={item.price} />
                        </Table.Cell>
                      </Table.Row>
                    );
                  }}
                />
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Stack>
        <WishlistPanel />
      </HStack>
    </Flex>
  );
}

export default ShopPage;
