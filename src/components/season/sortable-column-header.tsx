import { Box, Table, TableColumnHeaderProps } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortableColumnHeader({
  dragEnabled,
  dragId,
  children,
  ...rest
}: TableColumnHeaderProps & { dragEnabled: boolean; dragId: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dragId });

  return (
    <Table.ColumnHeader
      {...rest}
      ref={setNodeRef}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      zIndex={isDragging ? 10 : undefined}
    >
      {dragEnabled && (
        <Box
          justifyContent={"center"}
          position={"absolute"}
          left={1}
          top={1}
          px={2}
          rounded={"4px"}
          cursor={isDragging ? "grabbing" : "grab"}
          color={"fg.muted"}
          {...attributes}
          {...listeners}
        >
          <FontAwesomeIcon icon={faGripLinesVertical} />
        </Box>
      )}
      {children}
    </Table.ColumnHeader>
  );
}

export default SortableColumnHeader;
