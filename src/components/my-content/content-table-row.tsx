import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import {
  setFavoriteCar,
  setFavoriteTrack,
  setMyCar,
  setMyTrack,
  setWishCar,
  setWishTrack,
} from "@/store/ir";
import { Badge, Center, For, Image, Table, Text } from "@chakra-ui/react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faFlagCheckered,
  faSackXmark,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import ContentNameBadge from "./content-name-badge";
import InfoButton from "./info-button";
import PriceBadge from "./price-badge";
import SeriesPopover from "./series-popover";
import StarCheckbox from "./star-checkbox";

function ContentTableRow({
  content,
  id,
  price,
  name,
  logo,
  categories,
  free,
  skuGroup,
  series,
  skuIcon,
  infoUrl,
  popOpen,
  setOpenPop,
  owned,
  favorite,
  wish,
}: {
  content: "cars" | "tracks";
  id: number;
  price: number;
  name: string;
  logo?: string;
  categories: string[];
  free: boolean;
  owned: boolean;
  favorite: boolean;
  wish: boolean;
  skuGroup?: string[];
  series?: number[];
  skuIcon: IconDefinition;
  infoUrl: string;
  popOpen: boolean;
  setOpenPop: (i: number) => void;
}) {
  const [setMy, setWish, setFavorite] =
    content === "cars"
      ? [setMyCar, setWishCar, setFavoriteCar]
      : [setMyTrack, setWishTrack, setFavoriteTrack];

  return (
    <Table.Row>
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
              <FontAwesomeIcon icon={faSackXmark} />
            ) : wish ? (
              <FontAwesomeIcon icon={faBookmark} />
            ) : undefined
          }
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => {
            if (owned) {
              setMy(id, false);
              setWish(id, true);
            } else if (wish) {
              setWish(id, false);
            } else {
              setMy(id, true);
            }
          }}
        />
      </Table.Cell>
      <Table.Cell minWidth={"60px"} textAlign={"center"}>
        {logo && (
          <Center>
            <Tooltip
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
      <Table.Cell width={"100%"} display={"flex"} alignItems={"center"}>
        <ContentNameBadge name={name} />
        <StarCheckbox
          onClick={(e) => e.stopPropagation()}
          checked={favorite}
          onCheckedChange={(e) => setFavorite(id, !!e.checked)}
        />
      </Table.Cell>
      <Table.Cell minWidth={"100px"} textAlign={"center"}>
        {series && (
          <HoverCardRoot
            unmountOnExit
            openDelay={200}
            open={popOpen}
            onOpenChange={(e) => (e.open ? setOpenPop(id) : setOpenPop(-1))}
            lazyMount
          >
            <HoverCardTrigger asChild>
              <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
                <FontAwesomeIcon icon={faFlagCheckered} />
                {series.length}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent p={2} maxW={"100%"}>
              <HoverCardArrow />
              <SeriesPopover id={id} content={content} />
            </HoverCardContent>
          </HoverCardRoot>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"100px"} textAlign={"center"}>
        {skuGroup && (
          <Tooltip
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
              <FontAwesomeIcon icon={skuIcon} />
              {skuGroup.length}
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"100px"} textAlign={"center"}>
        <For
          each={categories}
          children={(category, i) => (
            <Tooltip
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
      <Table.Cell minWidth={"100px"} textAlign={"center"}>
        <PriceBadge price={price} />
      </Table.Cell>
      <Table.Cell minWidth={"100px"} textAlign="end">
        <InfoButton href={infoUrl} />
      </Table.Cell>
    </Table.Row>
  );
}

export default React.memo(ContentTableRow);
