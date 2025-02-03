import { Box, Circle, Float, HStack, Icon, Text } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "../ui/button";

function MoreMenuItem({
  label,
  icon,
  disabled,
  small,
  notification,
  children,
  ...rest
}: ButtonProps & {
  label: string;
  icon?: IconProp;
  small?: boolean;
  notification?: boolean;
}) {
  return (
    <Button
      unstyled
      userSelect={"none"}
      {...rest}
      color={disabled ? "gray" : undefined}
      _hover={
        !disabled
          ? {
              base: { bgColor: "blackAlpha.200" },
              _dark: { bgColor: "whiteAlpha.200" },
            }
          : undefined
      }
    >
      <HStack
        flexDir={small ? "column" : undefined}
        gap={small ? 0 : undefined}
      >
        <Box position={"relative"} minW={"40px"}>
          {icon ? (
            <Icon
              height={"22px"}
              width={"22px"}
              alignItems={"center"}
              justifyContent={"center"}
              p={1}
            >
              <FontAwesomeIcon icon={icon} />
            </Icon>
          ) : (
            children
          )}
          {notification && (
            <Float placement="top-end" offsetX="2" offsetY="2">
              <Circle bg="red" size="10px" />
            </Float>
          )}
        </Box>
        <Text fontSize={small ? "10px" : undefined} truncate>
          {label}
        </Text>
      </HStack>
    </Button>
  );
}

export default MoreMenuItem;
