import useWindowSize from "@/hooks/useWindowSize";
import { Badge, HStack, Stack, Text } from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function CheckboxCounts({
  freeCount,
  ownedCount,
  wishCount,
}: {
  freeCount: number;
  ownedCount: number;
  wishCount: number;
}) {
  const { height } = useWindowSize();
  const notSmall = (value: any) => (height <= 680 ? undefined : value);
  return (
    <Stack gap={{ base: "4px", md: notSmall("8px") }}>
      <Tooltip
        lazyMount
        unmountOnExit
        content={"Available for free with an iRacing subscription"}
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: notSmall("8px") }}>
          <Badge
            size={{ base: "xs", md: notSmall("sm") }}
            variant="solid"
            minWidth={{ base: "24px", md: notSmall("28px") }}
            justifyContent={"center"}
            colorPalette={"green"}
          >
            {freeCount}
          </Badge>
          <Checkbox
            size={{ base: "sm", md: notSmall("md") }}
            readOnly={true}
            colorPalette={"green"}
            checked={true}
            icon={<FontAwesomeIcon size={"xs"} icon={faSackXmark} />}
          >
            <Text hideBelow={"md"}>Free</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
      <Tooltip
        lazyMount
        unmountOnExit
        content={"Content you already purchased"}
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: notSmall("8px") }}>
          <Badge
            size={{ base: "xs", md: notSmall("sm") }}
            variant="solid"
            minWidth={{ base: "24px", md: notSmall("28px") }}
            justifyContent={"center"}
          >
            {ownedCount}
          </Badge>
          <Checkbox
            size={{ base: "sm", md: notSmall("md") }}
            readOnly={true}
            checked={true}
          >
            <Text hideBelow={"md"}>Owned</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
      <Tooltip
        lazyMount
        unmountOnExit
        content={
          "Content you wish to buy, select to preview it in your season planner"
        }
        showArrow
        positioning={{ placement: "left" }}
        openDelay={200}
        closeDelay={100}
      >
        <HStack gap={{ base: "4px", md: notSmall("8px") }}>
          <Badge
            size={{ base: "xs", md: notSmall("sm") }}
            variant="solid"
            minWidth={{ base: "24px", md: notSmall("28px") }}
            justifyContent={"center"}
            colorPalette={"blue"}
          >
            {wishCount}
          </Badge>
          <Checkbox
            size={{ base: "sm", md: notSmall("md") }}
            readOnly={true}
            colorPalette={"blue"}
            checked={true}
            icon={<FontAwesomeIcon size={"xs"} icon={faBookmark} />}
          >
            <Text hideBelow={"md"}>Wishlist</Text>
          </Checkbox>
        </HStack>
      </Tooltip>
    </Stack>
  );
}

export default CheckboxCounts;
