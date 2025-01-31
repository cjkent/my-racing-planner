import { useIr } from "@/store/ir";
import { Badge, HStack, Table, Text } from "@chakra-ui/react";
import SERIES_JSON from "../../ir-data/series.json";
import ContentCheckbox from "../content/content-checkbox";
import ContentNameBadge from "../content/content-name-badge";
import { Tooltip } from "../ui/tooltip";

function TracksUsedRow({
  item,
}: {
  item: {
    id: number;
    name: string;
    sku: number;
    weeks: { [key: number]: string[] };
    used: number;
  };
}) {
  const { myTracks, wishTracks } = useIr();

  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell textAlign={"center"} p={0} borderBottom={0} px={"4px"}>
        <ContentCheckbox
          size={"sm"}
          mt={"2px"}
          content={"tracks"}
          sku={item.sku}
          contentId={item.id}
          free={false}
          owned={myTracks.includes(item?.sku)}
          wish={wishTracks.includes(item?.sku)}
        />
      </Table.Cell>
      <Table.Cell
        width="100%"
        display={"flex"}
        p={1}
        borderBottom={0}
        px={"4px"}
      >
        <ContentNameBadge name={item.name} />
      </Table.Cell>
      <Table.Cell textAlign={"center"} p={1} borderBottom={0} px={"4px"}>
        <Tooltip
          lazyMount
          unmountOnExit
          content={Object.keys(item.weeks).map((seriesId: string) => (
            <HStack key={seriesId} justifyContent={"space-between"}>
              <Text textAlign={"left"} truncate>
                {
                  SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON]
                    .name
                }
              </Text>
              <Text textAlign={"right"}>
                {item.weeks[parseInt(seriesId)].join(", ")}
              </Text>
            </HStack>
          ))}
          showArrow
          positioning={{ placement: "top" }}
          openDelay={200}
          closeDelay={100}
        >
          <Badge size="xs" variant={"solid"} _light={{ bg: "gray.600" }}>
            {item.used}x
          </Badge>
        </Tooltip>
      </Table.Cell>
    </Table.Row>
  );
}

export default TracksUsedRow;
