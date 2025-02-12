import useScreenSize from "@/hooks/useScreenSize";
import { Box, Table, TableColumnHeaderProps } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  faArrowRightArrowLeft,
  faGripLinesVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortableColumnHeader({
  showDragButton,
  dragId,
  children,
  onClickSwap,
  ...rest
}: TableColumnHeaderProps & {
  onClickSwap?: () => void;
  showDragButton: boolean;
  dragId: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dragId });

  const { width } = useScreenSize();

  const showSwapper = showDragButton && !width.md && !!onClickSwap;
  const showDrag = showDragButton && width.md;

  return (
    <Table.ColumnHeader
      {...rest}
      ref={setNodeRef}
      transform={CSS.Transform.toString(transform)}
      transition={transition}
      zIndex={isDragging ? 10 : undefined}
    >
      {showSwapper && (
        <Box
          justifyContent={"center"}
          position={"absolute"}
          transform={"translate(-50%,-50%)"}
          left={0}
          top={"50%"}
          py={1}
          px={2}
          rounded={"full"}
          cursor={"pointer"}
          bg={"bg"}
          color={"fg.muted"}
          border={"fg.muted"}
          borderWidth={1}
          onClick={onClickSwap}
        >
          <FontAwesomeIcon size="sm" icon={faArrowRightArrowLeft} />
        </Box>
      )}
      {showDrag && (
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
