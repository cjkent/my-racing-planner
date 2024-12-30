import { ETabs, useUi } from "@/store/ui";
import { Flex } from "@chakra-ui/react";
import CarsPage from "../my-content/cars-page";
import TracksPage from "../my-content/tracks-page";
import SeriesPage from "../series/series-page";

function MainContainer() {
  const { selectedTab } = useUi();
  return (
    <Flex
      direction={"column"}
      height="100%"
      width={"100%"}
      padding="12px"
      paddingLeft="0"
    >
      <Flex
        height="100%"
        width={"100%"}
        padding="8px"
        bg={"gray.200"}
        borderColor={"gray.300"}
        _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        borderRadius={"xl"}
        borderWidth={"1px"}
        overflow={"hidden"}
        boxShadow={"rgba(5, 5, 15, 0.16) 0px 12px 24px -2px"}
      >
        {selectedTab === ETabs.MySeries && <SeriesPage />}
        {selectedTab === ETabs.MyCars && <CarsPage />}
        {selectedTab === ETabs.MyTracks && <TracksPage />}
        {selectedTab === ETabs.Settings && <>Settings</>}
      </Flex>
    </Flex>
  );
}

export default MainContainer;
