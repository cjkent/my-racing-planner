import { ESortHistory } from "@/ir-data/utils/history";
import { HStack, Table, Text, VisuallyHidden } from "@chakra-ui/react";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfinityTable from "../table/infinity-table";

type Dict<T = any> = Record<string, T>;
function HistoryTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  sortBy,
  setSortBy,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  sortBy: ESortHistory;
  setSortBy: (v: ESortHistory) => void;
}) {
  const boldIf = (value: ESortHistory) =>
    sortBy === value ? "bold" : undefined;
  return (
    <InfinityTable list={list} rows={rows} cols={7}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          <VisuallyHidden>Owned Content Checkbox</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>Content Logo</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>Name</Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Category
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.Released)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.Released)}>Released</Text>
            {sortBy === ESortHistory.Released && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.UsagePerYear)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.UsagePerYear)}>
              Usage/Year
            </Text>
            {sortBy === ESortHistory.UsagePerYear && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
        <Table.ColumnHeader
          minWidth={"90px"}
          textAlign={"center"}
          cursor={"pointer"}
          onClick={() => setSortBy(ESortHistory.Usage)}
        >
          <HStack gap={1} justifyContent={"center"}>
            <Text fontWeight={boldIf(ESortHistory.Usage)}>Used</Text>
            {sortBy === ESortHistory.Usage && (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
          </HStack>
        </Table.ColumnHeader>
      </Table.Row>
    </InfinityTable>
  );
}

export default HistoryTable;
