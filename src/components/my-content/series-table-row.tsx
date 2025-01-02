import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { Category } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { setFavoriteSeriesItem } from "@/store/ir";
import { Badge, Center, HStack, Image, Table } from "@chakra-ui/react";
import {
  faCar,
  faCaretDown,
  faLock,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Tooltip } from "../ui/tooltip";
import ContentNameBadge from "./content-name-badge";
import ContentPopover from "./content-popover";
import DurationBadge from "./duration-badge";
import InfoButton from "./info-button";
import LicenseBadge from "./license-badge";
import StarCheckbox from "./star-checkbox";

function SeriesTableRow({
  id,
  logo,
  name,
  cars,
  tracks,
  favorite,
  fixed,
  category,
  infoUrl,
  license,
  color,
  duration,
  laps,
  official,
}: {
  id: number;
  logo?: string;
  name: string;
  cars: number[];
  tracks: number[];
  favorite: boolean;
  fixed: boolean;
  category: string;
  infoUrl: string;
  license: string;
  color: string;
  duration: number | null;
  laps: number | null;
  official: boolean;
}) {
  return (
    <Table.Row>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <StarCheckbox
          onClick={(e) => e.stopPropagation()}
          checked={favorite}
          onCheckedChange={(e) => setFavoriteSeriesItem(id, !!e.checked)}
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
                  src={`${IR_URL.image}/img/logos/series/${logo}`}
                />
              }
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Image
                h="24px"
                fit="contain"
                src={`${IR_URL.image}/img/logos/series/${logo}`}
              />
            </Tooltip>
          </Center>
        )}
      </Table.Cell>
      <Table.Cell width={"100%"} display={"flex"} alignItems={"center"}>
        {!official && (
          <Badge colorPalette="yellow" mr={1}>
            Unranked
          </Badge>
        )}
        <ContentNameBadge name={name} />
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        {fixed && (
          <Tooltip
            content={"Fixed Setup"}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
          >
            <Badge variant={"solid"} _light={{ bg: "gray.600" }}>
              <FontAwesomeIcon icon={faLock} size="sm" />
              Fixed
            </Badge>
          </Tooltip>
        )}
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faCar} />
              {cars.length}
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent p={2}>
            <PopoverArrow />
            <ContentPopover content="cars" list={cars} />
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <PopoverRoot lazyMount unmountOnExit>
          <PopoverTrigger asChild>
            <HStack gap={1} justifyContent={"center"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faRoad} />
              {tracks.length}
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </PopoverTrigger>
          <PopoverContent p={2}>
            <PopoverArrow />
            <ContentPopover content="tracks" list={tracks} />
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <Tooltip
          key={`${category}`}
          content={Category[category as keyof typeof Category]}
          showArrow
          positioning={{ placement: "top" }}
          openDelay={200}
          closeDelay={100}
        >
          <CategoryIcon fontSize="16px" category={category} />
        </Tooltip>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign={"center"}>
        <DurationBadge duration={duration} laps={laps} />
      </Table.Cell>
      <Table.Cell minWidth={"40px"} textAlign={"center"}>
        <LicenseBadge letter={license} color={color}>
          {license}
        </LicenseBadge>
      </Table.Cell>
      <Table.Cell minWidth={"90px"} textAlign="end">
        <InfoButton href={infoUrl} />
      </Table.Cell>
    </Table.Row>
  );
}

export default React.memo(SeriesTableRow);
