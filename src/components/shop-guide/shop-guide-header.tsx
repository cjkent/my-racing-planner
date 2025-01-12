import { HStack } from "@chakra-ui/react";
import PageHeader from "../content/page-header";

function ShopGuideHeader() {
  return (
    <HStack
      padding={{ base: "unset", md: 4 }}
      justifyContent={"space-between"}
      alignItems={"start"}
    >
      <PageHeader
        title="Shop Guide"
        description="See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com"
      />
    </HStack>
  );
}

export default ShopGuideHeader;
