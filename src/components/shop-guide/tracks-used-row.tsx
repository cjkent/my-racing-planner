import { setMyTrack, setWishTrack, useIr } from "@/store/ir";
import { Badge, HStack, Table, Text } from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SERIES_JSON from "../../ir-data/series.json";
import ContentNameBadge from "../content/content-name-badge";
import { Checkbox } from "../ui/checkbox";
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
            wish ? <FontAwesomeIcon size="xs" icon={faBookmark} /> : undefined
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
      <Table.Cell display={"flex"} p={1} borderBottom={0} px={"4px"}>
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
