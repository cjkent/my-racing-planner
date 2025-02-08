import { Table, VisuallyHidden } from "@chakra-ui/react";
import { ReactNode } from "react";
import InfinityTable from "../table/infinity-table";

type Dict<T = any> = Record<string, T>;
function ContentTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  filterButton,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
  filterButton?: ReactNode;
}) {
  return (
    <InfinityTable list={list} rows={rows} cols={8}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          {filterButton}
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>Content Logo</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>Name</Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Includes
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Series
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Category
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Price
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"}>
          <VisuallyHidden>Info on iracing.com</VisuallyHidden>
        </Table.ColumnHeader>
      </Table.Row>
    </InfinityTable>
  );
}

export default ContentTable;
