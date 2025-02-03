import { Circle, Float, IconButton, IconButtonProps } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "../ui/tooltip";

function TopBarButton({
  tooltip,
  icon,
  trigger,
  notification,
  ...rest
}: IconButtonProps & {
  tooltip: string;
  icon: IconProp;
  trigger?: string;
  notification?: boolean;
}) {
  return (
    <Tooltip
      lazyMount
      unmountOnExit
      content={tooltip}
      showArrow
      positioning={{ placement: "bottom" }}
      openDelay={200}
      closeDelay={100}
      ids={trigger ? { trigger } : undefined}
    >
      <IconButton
        size={"sm"}
        variant={"ghost"}
        rounded="full"
        {...rest}
        color={{ base: "gray.700", _dark: "gray.300" }}
      >
        <FontAwesomeIcon icon={icon} />
        {notification && (
          <Float placement="top-end" offsetX="2" offsetY="2">
            <Circle bg="red" size="10px" />
          </Float>
        )}
      </IconButton>
    </Tooltip>
  );
}

export default TopBarButton;
