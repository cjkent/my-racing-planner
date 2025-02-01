import useWindowSize from "@/hooks/useWindowSize";
import { Flex, HStack, Stack, Tabs, Text } from "@chakra-ui/react";
import { useState } from "react";
import PageHeader from "../content/page-header";
import TracksUsedTable from "./tracks-used-table";
import WishlistPanel from "./wishlist-panel";

enum ETab {
  TracksUsed = "TracksUsed",
  WishlistPanel = "WishlistPanel",
}

function ShopPage() {
  const [tab, setTab] = useState<ETab>(ETab.TracksUsed);
  const { size } = useWindowSize();
  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <PageHeader
        title="Shop Guide"
        description="See the tracks most used by your favorite series. Checkout your
          wishlist items at iracing.com"
      />
      <Stack hideFrom={"md"}>
        <Tabs.Root
          size={"sm"}
          value={tab}
          onValueChange={(e) => setTab(e.value as ETab)}
          variant={"enclosed"}
          width={"100%"}
          flex={1}
        >
          <Tabs.List flex={1} width={"100%"}>
            <Tabs.Trigger value={ETab.TracksUsed} width={"100%"}>
              <Text textWrap={"nowrap"}>Tracks Used</Text>
            </Tabs.Trigger>
            <Tabs.Trigger value={ETab.WishlistPanel} width={"100%"}>
              <Text textWrap={"nowrap"}>Wishlist</Text>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </Stack>

      <HStack flex={1} alignItems={"start"} overflow={"hidden"} gap={2}>
        {(tab === ETab.TracksUsed || size.md) && <TracksUsedTable />}
        {(tab === ETab.WishlistPanel || size.md) && <WishlistPanel />}
      </HStack>
    </Flex>
  );
}

export default ShopPage;
