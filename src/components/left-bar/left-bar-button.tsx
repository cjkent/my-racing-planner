import { Icon, Stack, Text } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LeftBarButton({
  icon,
  label,
  selected,
  onClick,
}: {
  label: string;
  icon: IconProp;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Stack
      cursor={"pointer"}
      alignItems={"center"}
      gap={"0"}
      color={selected ? { base: "blue.900", _dark: "blue.300" } : undefined}
      onClick={onClick}
      fontWeight={selected ? "semibold" : "medium"}
      _hover={
        !selected
          ? {
              color: {
                base: "gray.900",
                _dark: "gray.100",
              },
              fontWeight: "semibold",
            }
          : undefined
      }
    >
      <Icon
        height={"22px"}
        width={"22px"}
        borderRadius={"6px"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={selected ? "blue.600/40" : "transparent"}
        _hover={!selected ? { bg: "gray.400/30" } : undefined}
        p={"6px"}
      >
        <FontAwesomeIcon icon={icon} />
      </Icon>
      <Text textAlign={"center"} fontSize="10px">
        {label}
      </Text>
    </Stack>
  );
}

export default LeftBarButton;
