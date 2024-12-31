import { setFavoriteSeriesItem, useIr } from "@/store/ir";
import { For, Table, Text } from "@chakra-ui/react";
import CARS_JSON from "../../ir-data/cars.json";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import LicenseBadge from "./license-badge";
import StarCheckbox from "./star-checkbox";

function SeriesPopover({
  content,
  id,
}: {
  content: "cars" | "tracks";
  id: number;
}) {
  const list: any =
    content === "cars"
      ? CARS_JSON[id.toString() as keyof typeof CARS_JSON]
      : TRACKS_JSON[id.toString() as keyof typeof TRACKS_JSON];

  const { favoriteSeries } = useIr();

  return (
    <Table.Root size="sm" striped>
      <Table.Body fontSize={"xs"}>
        <For
          each={list.series}
          children={(item: number) => {
            const series =
              SERIES_JSON[item.toString() as keyof typeof SERIES_JSON];
            return (
              series && (
                <Table.Row key={item}>
                  <Table.Cell
                    textAlign={"center"}
                    p={0}
                    borderBottom={0}
                    px={"4px"}
                  >
                    <StarCheckbox
                      size={"xs"}
                      checked={favoriteSeries.includes(item)}
                      mt={"4px"}
                      onCheckedChange={({ checked }) => {
                        setFavoriteSeriesItem(series.id, !!checked);
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
                    fontWeight={"bold"}
                  >
                    <Text textWrap={"nowrap"}>{series.name}</Text>
                  </Table.Cell>
                  <Table.Cell p={0} borderBottom={0} px={"4px"}>
                    <LicenseBadge
                      letter={series.license.letter}
                      color={series.license.color}
                      size={"xs"}
                    >
                      {series.license.letter}
                    </LicenseBadge>
                  </Table.Cell>
                </Table.Row>
              )
            );
          }}
        />
      </Table.Body>
    </Table.Root>
  );
}

export default SeriesPopover;
