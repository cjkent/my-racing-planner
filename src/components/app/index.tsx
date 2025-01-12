import { Flex } from "@chakra-ui/react";
import MainContainer from "../main-container";
import NavBar from "../nav-bar";
import BottomNavBar from "../nav-bar/bottom-nav-bar";

function App() {
  return (
    <Flex
      background={{ base: "irbg.light", _dark: "irbg.dark" }}
      width="100vw"
      height="100dvh"
      paddingTop={"env(safe-area-inset-top)"}
      // paddingBottom={"env(safe-area-inset-bottom)"}
      direction={{ base: "column", md: "row" }}
    >
      <NavBar hideBelow="md" minW="80px" height="100%" />
      <MainContainer
        height="100%"
        maxW={"calc(100%-80px)"}
        flex={1}
        overflowX={"auto"}
        padding={{ base: "0", md: "12px" }}
        paddingLeft={{ base: "0", md: "0" }}
      />
      <BottomNavBar hideFrom="md" />
    </Flex>
  );
}

export default App;
