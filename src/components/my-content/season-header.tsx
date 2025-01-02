import { Heading, HStack, Stack, Text } from "@chakra-ui/react";

function SeasonHeader() {
  return (
    <HStack padding={4} justifyContent={"space-between"}>
      <Stack>
        <Heading size="4xl" fontFamily="mono" fontWeight="bold">
          My Season Planner
        </Heading>
        <Text>Plan your season weeks</Text>
      </Stack>
    </HStack>
  );
}

export default SeasonHeader;
