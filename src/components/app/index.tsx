import { Flex } from "@chakra-ui/react";
import LeftBar from "../left-bar";
import MainContainer from "../main-container";

function App() {
  return (
    <Flex
      background={{ base: "gray.300", _dark: "gray.900" }}
      width="100vw"
      height="100vh"
    >
      <LeftBar />
      <MainContainer />
    </Flex>
  );
}

export default App;
