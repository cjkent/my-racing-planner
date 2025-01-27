import { List, Table } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmptyState } from "../ui/empty-state";

function PaginatedTableEmpty() {
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell colSpan={8} minWidth={"100%"}>
        <EmptyState
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          title="No results found"
          description="Try adjusting your search"
        >
          <List.Root variant="marker">
            <List.Item>Try removing filters</List.Item>
            <List.Item>Try different categories</List.Item>
          </List.Root>
        </EmptyState>
      </Table.Cell>
    </Table.Row>
  );
}

export default PaginatedTableEmpty;
