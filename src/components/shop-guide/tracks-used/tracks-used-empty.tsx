import { useIr } from "@/store/ir";
import { Flex, Table } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmptyState } from "../../ui/empty-state";

function TracksUsedEmpty() {
  const { favoriteSeries } = useIr();

  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell colSpan={8} minWidth={"100%"}>
        <Flex justifyContent={"start"} height={"100%"}>
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
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}

export default TracksUsedEmpty;
