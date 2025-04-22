import { HStack, StackProps } from "@chakra-ui/react";
import { faCar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentPopover from "../content/content-popover";
import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";

function SeasonCarsPopover({ cars, ...rest }: StackProps & { cars: number[] }) {
  return (
    <PopoverRoot lazyMount unmountOnExit>
      <PopoverTrigger asChild>
        <HStack
          gap={1}
          justifyContent={"center"}
          cursor={"pointer"}
          position={"absolute"}
          right={1}
          top={1}
          px={2}
          rounded={"4px"}
          bgColor={"bg.muted"}
          {...rest}
        >
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
  );
}

export default SeasonCarsPopover;
