import { ETabs, setSelectedPage, useUi } from "@/store/ui";
import { For, HStack, StackProps } from "@chakra-ui/react";
import {
  faCar,
  faFlagCheckered,
  faRoad,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import MoreMenuButton from "./more-menu-button";
import NavBarButton from "./nav-bar-button";

function BottomNavBar({ ...props }: StackProps) {
  const { selectedPage } = useUi();

  const tabsAction = [
    { label: "My Season", icon: faTableCellsLarge, index: ETabs.MySeason },
    { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
    selectedPage === ETabs.MyTracks
      ? { label: "My Content", icon: faRoad, index: ETabs.MyTracks }
      : { label: "My Content", icon: faCar, index: ETabs.MyCars },
    { label: "Shop Guide", icon: faShoppingBag, index: ETabs.ShopGuide },
  ];

  return (
    <HStack
      {...props}
      justifyContent="space-between"
      paddingTop="16px"
      paddingBottom="12px"
      alignItems={"center"}
      gap={3}
      px={"1rem"}
      color={{ base: "gray.700", _dark: "gray.300" }}
    >
      <For
        each={tabsAction}
        children={(tab) => (
          <NavBarButton
            key={tab.index}
            label={tab.label}
            icon={tab.icon}
            selected={selectedPage === tab.index}
            onClick={() => setSelectedPage(tab.index)}
          />
        )}
      />

      <MoreMenuButton />
    </HStack>
  );
}

export default BottomNavBar;
