import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import {
  For,
  HStack,
  List,
  Stack,
  Table,
  VisuallyHidden,
} from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { EmptyState } from "../ui/empty-state";

type Dict<T = any> = Record<string, T>;
function SeriesTable<T extends string | number | Dict | undefined>({
  list,
  children,
}: {
  list: T[] | readonly T[] | undefined;
  children: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
}) {
  const [page, setPage] = useState<number>(1);
  const pageSize = 40;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const each = list?.slice(start, end);

  useEffect(() => {
    setPage(1);
  }, [list]);

  return (
    <Stack alignItems={"end"} overflow={"auto"} gap={2}>
      <Table.ScrollArea width="100%" borderRadius={"md"}>
        <Table.Root stickyHeader size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader minWidth={"40px"} textAlign={"center"}>
                <VisuallyHidden>License</VisuallyHidden>
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"60px"} textAlign={"center"}>
                <VisuallyHidden>Series Logo</VisuallyHidden>
              </Table.ColumnHeader>
              <Table.ColumnHeader width={"100%"}>Name</Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"} textAlign={"center"}>
                Setup
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"} textAlign={"center"}>
                Cars
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"} textAlign={"center"}>
                Tracks
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"} textAlign={"center"}>
                Category
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"} textAlign={"center"}>
                Duration
              </Table.ColumnHeader>
              <Table.ColumnHeader minWidth={"100px"}>
                <VisuallyHidden>Info on iracing.com</VisuallyHidden>
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              fallback={
                <Table.Row>
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
              }
              each={each}
              children={children}
            />
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <PaginationRoot
        count={list?.length ?? 0}
        pageSize={pageSize}
        page={page}
        maxW="240px"
        onPageChange={(e) => setPage(e.page)}
      >
        <HStack>
          <PaginationPageText format="long" flex="1" />
          <PaginationPrevTrigger />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  );
}

export default SeriesTable;
