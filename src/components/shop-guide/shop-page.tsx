import useScreenSize from "@/hooks/useScreenSize";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import ShopSubPage, { EShopTab } from "./shop-sub-page";
import TracksUsedTable from "./tracks-used/tracks-used-table";
import WishlistPanel from "./wishlist/wishlist-panel";

function ShopPage() {
  const [tab, setTab] = useState<EShopTab>(EShopTab.TracksUsed);
  const { width } = useScreenSize();
  return (
    <Page>
      <PageHeader
        title="Shop Guide"
        description="See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com"
      >
        <ShopSubPage hideFrom={"md"} tab={tab} setTab={setTab} />
      </PageHeader>

      <HStack flex={1} alignItems={"start"} overflow={"hidden"} gap={2}>
        {(tab === EShopTab.TracksUsed || width.md) && <TracksUsedTable />}
        {(tab === EShopTab.WishlistPanel || width.md) && <WishlistPanel />}
      </HStack>
    </Page>
  );
}

export default ShopPage;
