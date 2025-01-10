import { ETabs, useUi } from "@/store/ui";
import { Flex } from "@chakra-ui/react";
import AboutPage from "../about";
import CarsPage from "../content/cars-page";
import TracksPage from "../content/tracks-page";
import SeasonPage from "../season/season-page";
import SeriesPage from "../series/series-page";
import ShopPage from "../shop-guide/shop-page";

function MainContainer() {
  const { selectedPage } = useUi();
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
        {selectedPage === ETabs.MySeason && <SeasonPage />}
        {selectedPage === ETabs.MySeries && <SeriesPage />}
        {selectedPage === ETabs.MyCars && <CarsPage />}
        {selectedPage === ETabs.MyTracks && <TracksPage />}
        {selectedPage === ETabs.ShopGuide && <ShopPage />}
        {selectedPage === ETabs.About && <AboutPage />}
      </Flex>
    </Flex>
  );
}

export default MainContainer;
