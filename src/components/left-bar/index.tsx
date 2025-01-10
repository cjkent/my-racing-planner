import { ETabs, setSelectedPage, useUi } from "@/store/ui";
import { For, Stack } from "@chakra-ui/react";
import {
  faCar,
  faFlagCheckered,
  faInfoCircle,
  faLanguage,
  faMoon,
  faRoad,
  faShoppingBag,
  faSun,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import LeftBarButton from "../left-bar/left-bar-button";
import { useColorMode } from "../ui/color-mode";
const tabsTop = [
  { label: "My Season", icon: faTableCellsLarge, index: ETabs.MySeason },
  { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
  { label: "My Cars", icon: faCar, index: ETabs.MyCars },
  { label: "My Tracks", icon: faRoad, index: ETabs.MyTracks },
  { label: "Shop Guide", icon: faShoppingBag, index: ETabs.ShopGuide },
];

function LeftBar() {
  const { selectedPage } = useUi();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack
      minW="80px"
      height="100%"
      justifyContent="space-between"
      paddingTop="16px"
      paddingBottom="12px"
    >
      <Stack justifyContent={"flex-start"} alignItems={"center"} gap={3}>
        <For
          each={tabsTop}
          children={(tab) => (
            <LeftBarButton
              key={tab.index}
              label={tab.label}
              icon={tab.icon}
              selected={selectedPage === tab.index}
              onClick={() => setSelectedPage(tab.index)}
            />
          )}
        />
      </Stack>
      <Stack justifyContent={"flex-start"} alignItems={"center"} gap={3}>
        <LeftBarButton
          key={"about"}
          label={"About"}
          icon={faInfoCircle}
          selected={selectedPage === ETabs.About}
          onClick={() => setSelectedPage(ETabs.About)}
        />
        <LeftBarButton
          key={"language"}
          label={"English"}
          icon={faLanguage}
          selected={false}
          disabled
        />
        <LeftBarButton
          key={"color-mode"}
          label={colorMode === "light" ? "Light" : "Dark"}
          icon={colorMode === "light" ? faSun : faMoon}
          selected={false}
          onClick={toggleColorMode}
        />
      </Stack>
    </Stack>
  );
}

export default LeftBar;
