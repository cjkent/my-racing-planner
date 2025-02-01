import { Table, VisuallyHidden } from "@chakra-ui/react";
import PaginatedTable from "../table/paginated-table";

type Dict<T = any> = Record<string, T>;
function SeriesTable<T extends string | number | Dict | undefined>({
  list,
  rows,
}: {
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
}) {
  return (
    <PaginatedTable list={list} rows={rows}>
      <Table.Row bgColor={"bg.muted"}>
        <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
          <VisuallyHidden>Favorite</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
          <VisuallyHidden>Series Logo</VisuallyHidden>
        </Table.ColumnHeader>
        <Table.ColumnHeader width={"100%"}>Name</Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Setup
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Cars
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Tracks
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Category
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          Duration
        </Table.ColumnHeader>
        <Table.ColumnHeader minWidth={"90px"} textAlign={"center"}>
          License
        </Table.ColumnHeader>
      </Table.Row>
    </PaginatedTable>
  );
}

export default SeriesTable;
