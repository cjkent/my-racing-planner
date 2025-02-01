import useWindowSize from "@/hooks/useWindowSize";
import { Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";
import PageHeader from "../page/page-header";
import ShopSubPage, { EShopTab } from "./shop-sub-page";
import TracksUsedTable from "./tracks-used/tracks-used-table";
import WishlistPanel from "./wishlist/wishlist-panel";

function ShopPage() {
  const [tab, setTab] = useState<EShopTab>(EShopTab.TracksUsed);
  const { size } = useWindowSize();
  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <PageHeader
        title="Shop Guide"
        description="See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com"
      >
        <ShopSubPage hideFrom={"md"} tab={tab} setTab={setTab} />
      </PageHeader>

      <HStack flex={1} alignItems={"start"} overflow={"hidden"} gap={2}>
        {(tab === EShopTab.TracksUsed || size.md) && <TracksUsedTable />}
        {(tab === EShopTab.WishlistPanel || size.md) && <WishlistPanel />}
      </HStack>
    </Flex>
  );
}

export default ShopPage;
