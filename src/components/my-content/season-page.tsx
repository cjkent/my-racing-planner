import useSeason from "@/hooks/useSeason";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import { Center, Flex, For, Image, Table, Text } from "@chakra-ui/react";
import SERIES_JSON from "../../ir-data/series.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Tooltip } from "../ui/tooltip";

function SeasonPage() {
  const { weeksStartDates, seriesDateMap } = useSeason();
  const { favoriteSeries } = useIr();

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <Table.ScrollArea>
        <Table.Root size="sm" fontSize={"14px"} textAlign={"center"}>
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
                            <Image
                              h="24px"
                              fit="contain"
                              src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                            />
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
                  <Table.Row key={date}>
                    <Table.Cell minW="30px">
                      <Tooltip
                        content={date}
                        showArrow
                        positioning={{ placement: "top" }}
                        openDelay={200}
                        closeDelay={100}
                      >
                        <Text>{i + 1}</Text>
                      </Tooltip>
                    </Table.Cell>
                    <For
                      each={favoriteSeries}
                      children={(seriesId) => (
                        <Table.Cell key={seriesId}>
                          <Text lineClamp="2">
                            {
                              TRACKS_JSON[
                                seriesDateMap[
                                  seriesId as keyof typeof seriesDateMap
                                ][date] as keyof typeof TRACKS_JSON
                              ].name
                            }
                          </Text>
                        </Table.Cell>
                      )}
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
