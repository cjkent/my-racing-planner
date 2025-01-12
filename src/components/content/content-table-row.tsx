import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { setMyCar, setMyTrack, setWishCar, setWishTrack } from "@/store/ir";
import {
  Badge,
  Center,
  For,
  HStack,
  Image,
  Table,
  Text,
} from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretDown,
  faFlagCheckered,
  faSackXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PriceBadge from "../badges/price-badge";
import SeriesPopover from "../series/series-popover";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import ContentNameBadge from "./content-name-badge";
import InfoButton from "./info-button";

function ContentTableRow({
  content,
  id,
  sku,
  price,
  name,
  logo,
  categories,
  free,
  skuGroup,
  series,
  skuIcon,
  infoUrl,
  owned,
  wish,
}: {
  content: "cars" | "tracks";
  id: number;
  sku: number;
  price: number;
  name: string;
  logo?: string;
  categories: string[];
  free: boolean;
  owned: boolean;
  wish: boolean;
  skuGroup?: string[];
  series?: number[];
  skuIcon: IconDefinition;
  infoUrl: string;
}) {
  const [setMy, setWish] =
    content === "cars" ? [setMyCar, setWishCar] : [setMyTrack, setWishTrack];

  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <Checkbox
          readOnly={free}
          colorPalette={free ? "green" : wish ? "blue" : undefined}
          checked={free || owned || wish}
          controlProps={{
            borderColor: !free && !wish && !owned ? "gray.400" : undefined,
          }}
          icon={
            free ? (
              <FontAwesomeIcon size={"xs"} icon={faSackXmark} />
            ) : wish ? (
              <FontAwesomeIcon size={"xs"} icon={faBookmark} />
            ) : undefined
          }
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => {
            if (owned) {
              setMy(sku, false);
              setWish(sku, true);
            } else if (wish) {
              setWish(sku, false);
            } else {
              setMy(sku, true);
            }
          }}
        />
      </Table.Cell>
      <Table.Cell minWidth={"60px"} textAlign={"center"}>
        {logo && (
          <Center>
            <Tooltip
              lazyMount
              unmountOnExit
              key={logo}
              content={
                <Image
                  h={"80px"}
                  w={"160px"}
                  fit="contain"
                  src={`${IR_URL.image}${logo}`}
                />
              }
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Image h="24px" fit="contain" src={`${IR_URL.image}${logo}`} />
            </Tooltip>
          </Center>
        )}
      </Table.Cell>
      <Table.Cell width={"100%"}>
        <ContentNameBadge name={name} />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {skuGroup && (
          <Tooltip
            lazyMount
            unmountOnExit
            content={skuGroup.map((c) => (
              <Text key={c} as="p">
                {c}
              </Text>
            ))}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
              <FontAwesomeIcon icon={skuIcon} size="sm" />
              {skuGroup.length}
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {series && (
          <PopoverRoot lazyMount unmountOnExit>
            <PopoverTrigger asChild>
              <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
                <FontAwesomeIcon icon={faFlagCheckered} />
                {series.length}
                <FontAwesomeIcon icon={faCaretDown} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent p={2}>
              <PopoverArrow />
              <SeriesPopover id={id} content={content} />
            </PopoverContent>
          </PopoverRoot>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <For
          each={categories}
          children={(category, i) => (
            <Tooltip
              lazyMount
              unmountOnExit
              key={`${category}`}
              content={Category[category as keyof typeof Category]}
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <CategoryIcon
                fontSize="16px"
                ml={i > 0 ? "6px" : undefined}
                category={category}
              />
            </Tooltip>
          )}
        />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <PriceBadge price={price} />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign="end">
        <InfoButton href={infoUrl} />
      </Table.Cell>
    </Table.Row>
  );
}

export default React.memo(ContentTableRow);
