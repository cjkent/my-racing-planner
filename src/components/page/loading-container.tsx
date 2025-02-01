import { Flex, Spinner } from "@chakra-ui/react";

function LoadingContainer() {
  return (
    <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} borderWidth="4px" />
    </Flex>
  );
}

export default LoadingContainer;
