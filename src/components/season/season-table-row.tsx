import { ownNurbCombined, wishNurbCombined } from "@/ir-data/utils/tracks";
import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
import { For, Table, Text } from "@chakra-ui/react";
import React from "react";
import TRACKS_JSON from "../../ir-data/tracks.json";
import ContentCheckbox from "../content/content-checkbox";
import SeasonTableCarsPopover from "./season-table-cars-popover";
import SeasonTableRowDateCell from "./season-table-row-date-cell";
import SortableColumnCell from "./sortable-column-cell";
import { formatDate, getPreviousTuesday } from "./useSeason";

function SeasonTableRow({
  date,
  seriesDateMap,
  filteredFavorites,
  highlightTrack,
  setHighlightTrack,
}: {
  date: string;
  seriesDateMap: { [key: number]: any };
  filteredFavorites: number[];
  highlightTrack: number;
  setHighlightTrack: (n: number) => void;
}) {
  const { myTracks, wishTracks } = useIr();
  const {
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowThisWeek,
  } = useUi();

  const thisWeek =
    seasonShowThisWeek && getPreviousTuesday(formatDate(new Date())) === date;

  return (
    <Table.Row
      bgColor={"bg.muted"}
      key={date}
      height="60px"
      borderYWidth={thisWeek ? "2px" : undefined}
      borderColor={thisWeek ? "bg.inverted" : undefined}
    >
      <SeasonTableRowDateCell date={date} thisWeek={thisWeek} />
      <For
        each={filteredFavorites}
        children={(seriesId) => {
          const trackId =
            seriesDateMap[seriesId as keyof typeof seriesDateMap][date];

          const cars: number[] =
            seriesDateMap[seriesId as keyof typeof seriesDateMap][
              `${date}_cars`
            ] || [];

          const track = TRACKS_JSON[trackId as keyof typeof TRACKS_JSON];
          const wish =
            (track && wishTracks.includes(track.sku)) ||
            wishNurbCombined(track.id, wishTracks, myTracks);
          const owned =
            (track && myTracks.includes(track.sku)) ||
            ownNurbCombined(track.id, myTracks);
          const highlight = highlightTrack === track?.sku;
          const color = track && {
            _dark: track.free
              ? "green.400"
              : seasonShowOwned && owned
              ? "teal.400"
              : seasonShowWishlist && wish
              ? "blue.400"
              : "red.400",
            base: track.free
              ? "green.600"
              : seasonShowOwned && owned
              ? "teal.600"
              : seasonShowWishlist && wish
              ? "blue.600"
              : "red.600",
          };
          const bgColor = track && {
            base: track.free
              ? "green.50"
              : seasonShowOwned && owned
              ? "teal.50"
              : seasonShowWishlist && wish
              ? "blue.50"
              : "red.50",
            _dark: track.free
              ? "green.800"
              : seasonShowOwned && owned
              ? "teal.800"
              : seasonShowWishlist && wish
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
                seasonHighlight && setHighlightTrack(track?.sku)
              }
              onMouseLeave={() => seasonHighlight && setHighlightTrack(-1)}
              bgColor={seasonHighlight && highlight ? color : bgColor}
              color={seasonHighlight && highlight ? "bg" : color}
            >
              {track && (
                <>
                  <Text textAlign={"center"} lineClamp="3">
                    {track.name}
                  </Text>

                  {seasonShowCarsDropdown && cars.length > 0 && (
                    <SeasonTableCarsPopover cars={cars} />
                  )}

                  {seasonShowCheckboxes && (
                    <ContentCheckbox
                      size={"xs"}
                      position={"absolute"}
                      left={1}
                      top={1}
                      content={"tracks"}
                      sku={track.sku}
                      contentId={track.id}
                      free={track.free}
                      owned={owned}
                      wish={wish}
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
}

export default React.memo(SeasonTableRow);
