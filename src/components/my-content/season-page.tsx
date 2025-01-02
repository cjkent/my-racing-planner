import useSeason from "@/hooks/useSeason";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import {
  Center,
  Flex,
  For,
  Image,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Tooltip } from "../ui/tooltip";

function SeasonPage() {
  const { weeksStartDates, seriesDateMap } = useSeason();
  const { myTracks, wishTracks, favoriteSeries } = useIr();

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <Table.ScrollArea>
        <Table.Root size="sm" showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Week</Table.ColumnHeader>
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
                      minWidth={"90px"}
                      textAlign={"center"}
                    >
                      {series.logo && (
                        <Center>
                          <Tooltip
                            content={series.name}
                            showArrow
                            positioning={{ placement: "top" }}
                            openDelay={200}
                            closeDelay={100}
                          >
                            <VStack>
                              <Image
                                h="40px"
                                fit="contain"
                                src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                              />
                              <Text truncate maxW={"200px"}>
                                {series.name}
                              </Text>
                            </VStack>
                          </Tooltip>
                        </Center>
                      )}
                    </Table.ColumnHeader>
                  );
                }}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={weeksStartDates}
              children={(date, i) => {
                return (
                  <Table.Row key={date} height="60px">
                    <Table.Cell minW="30px">
                      <Tooltip
                        content={date}
                        showArrow
                        positioning={{ placement: "top" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <Text textAlign={"right"}>{i + 1}</Text>
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
                        return (
                          <Table.Cell
                            key={seriesId}
                            textAlign={"center"}
                            bgColor={
                              track.free
                                ? "green.100"
                                : myTracks.includes(track.sku)
                                ? "green.200"
                                : wishTracks.includes(track.sku)
                                ? "blue.200"
                                : undefined
                            }
                          >
                            <Text lineClamp="2">{track.name}</Text>
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
