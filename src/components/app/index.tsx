import { Flex } from "@chakra-ui/react";
import MainContainer from "../main-container";
import NavBar from "../nav-bar";
import BottomNavBar from "../nav-bar/bottom-nav-bar";

function App() {
  return (
    <Flex
      background={{ base: "gray.300", _dark: "gray.900" }}
      width="100vw"
      height="100vh"
      overflow={"hidden"}
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
