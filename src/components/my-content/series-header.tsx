import { Heading, HStack, Stack, Text } from "@chakra-ui/react";

function SeriesHeader() {
  return (
    <HStack padding={4} justifyContent={"space-between"}>
      <Stack>
        <Heading size="4xl" fontFamily="mono" fontWeight="bold">
          My Favorite Series
        </Heading>
        <Text>Select the series you wanna see in your season planner</Text>
      </Stack>
    </HStack>
  );
}

export default SeriesHeader;
