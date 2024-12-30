import { Badge, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function ContentHeader({
  title,
  description,
  freeCount,
  ownedCount,
  wishCount,
}: {
  title: string;
  description: string;
  freeCount: number;
  ownedCount: number;
  wishCount: number;
}) {
  return (
    <HStack padding={4} justifyContent={"space-between"}>
      <Stack>
        <Heading size="4xl" fontFamily="mono" fontWeight="bold">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Stack>
      <Stack>
        <Tooltip
          content={"Available for free with an iRacing subscription"}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
              colorPalette={"green"}
            >
              {freeCount}
            </Badge>
            <Checkbox
              readOnly={true}
              colorPalette={"green"}
              checked={true}
              icon={<FontAwesomeIcon icon={faSackXmark} />}
            >
              <Text>Free</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
        <Tooltip
          content={"Content you already purchased"}
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
            >
              {ownedCount}
            </Badge>
            <Checkbox readOnly={true} checked={true}>
              <Text>Owned</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
        <Tooltip
          content={
            "Content you wish to buy, select to preview it in your series planner"
          }
          showArrow
          positioning={{ placement: "left" }}
          openDelay={200}
          closeDelay={100}
        >
          <HStack>
            <Badge
              size="sm"
              variant="solid"
              minWidth={"28px"}
              justifyContent={"center"}
              colorPalette={"blue"}
            >
              {wishCount}
            </Badge>
            <Checkbox
              readOnly={true}
              colorPalette={"blue"}
              checked={true}
              icon={<FontAwesomeIcon icon={faBookmark} />}
            >
              <Text>Wishlist</Text>
            </Checkbox>
          </HStack>
        </Tooltip>
      </Stack>
    </HStack>
  );
}

export default ContentHeader;
