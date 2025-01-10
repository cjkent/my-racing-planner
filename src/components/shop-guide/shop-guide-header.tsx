import { Heading, HStack, Stack, Text } from "@chakra-ui/react";

function ShopGuideHeader() {
  return (
    <HStack padding={4} justifyContent={"space-between"}>
      <Stack>
        <Heading size="4xl" fontFamily="mono" fontWeight="bold">
          Shop Guide
        </Heading>
        <Text>
          See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com
        </Text>
      </Stack>
    </HStack>
  );
}

export default ShopGuideHeader;
