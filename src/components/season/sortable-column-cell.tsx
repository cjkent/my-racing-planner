import { Table, TableCellProps } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableColumnCell({
  dragEnabled,
  dragId,
  children,
  ...rest
}: TableCellProps & { dragEnabled: boolean; dragId: number }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: dragId,
  });

  return (
    <Table.Cell
      {...rest}
      ref={setNodeRef}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      zIndex={isDragging ? 10 : undefined}
    >
      {children}
    </Table.Cell>
  );
}

export default SortableColumnCell;
