import { Box, BoxProps, Tabs, Text } from "@chakra-ui/react";

export enum EShopTab {
  TracksUsed = "TracksUsed",
  WishlistPanel = "WishlistPanel",
}

function ShopSubPage({
  tab,
  setTab,
  ...rest
}: BoxProps & {
  tab: EShopTab;
  setTab: (t: EShopTab) => void;
}) {
  return (
    <Box {...rest}>
      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => setTab(e.value as EShopTab)}
        variant={"enclosed"}
        width={"100%"}
        flex={1}
      >
        <Tabs.List flex={1} width={"100%"}>
          <Tabs.Trigger value={EShopTab.TracksUsed} width={"100%"}>
            <Text textWrap={"nowrap"}>Tracks Used</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value={EShopTab.WishlistPanel} width={"100%"}>
            <Text textWrap={"nowrap"}>Wishlist</Text>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
}

export default ShopSubPage;
