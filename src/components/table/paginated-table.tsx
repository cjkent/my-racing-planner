import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { For, HStack, Stack, Table } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "../app/useScroll";
import PaginatedTableEmpty from "./paginated-table-empty";

type Dict<T = any> = Record<string, T>;
function PaginatedTable<T extends string | number | Dict | undefined>({
  list,
  rows,
  children,
}: PropsWithChildren<{
  list: T[] | readonly T[] | undefined;
  rows: (item: Exclude<T, undefined>, index: number) => React.ReactNode;
}>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const { onScroll } = useScroll();

  const pageSize = 40;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const each = useMemo(() => list?.slice(start, end), [list, start, end]);

  useEffect(() => {
    setPage(1);
  }, [list]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [list, page]);

  return (
    <Stack alignItems={"end"} overflow={"auto"} gap={2}>
      <Table.ScrollArea
        width="100%"
        borderRadius={"md"}
        ref={scrollRef}
        onScroll={onScroll}
      >
        <Table.Root stickyHeader size="sm" striped>
          <Table.Header>{children}</Table.Header>
          <Table.Body>
            <For
              fallback={<PaginatedTableEmpty />}
              each={each}
              children={rows}
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

export default PaginatedTable;
