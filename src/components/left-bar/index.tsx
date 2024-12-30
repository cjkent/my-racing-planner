import { ETabs, useUi } from "@/store/ui";
import { For, Stack } from "@chakra-ui/react";
import {
  faCar,
  faFlagCheckered,
  faGear,
  faMoon,
  faRoad,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import LeftBarButton from "../left-bar/left-bar-button";
import { useColorMode } from "../ui/color-mode";
const tabs = [
  { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
  { label: "My Cars", icon: faCar, index: ETabs.MyCars },
  { label: "My Tracks", icon: faRoad, index: ETabs.MyTracks },
  { label: "Settings", icon: faGear, index: ETabs.Settings },
];

function LeftBar() {
  const { selectedTab, setSelectedTab } = useUi();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack
      width="80px"
      height="100%"
      justifyContent="space-between"
      paddingTop="16px"
      paddingBottom="12px"
    >
      <>Top</>
      <Stack justifyContent={"flex-start"} alignItems={"center"}>
        <For
          each={tabs}
          children={(tab) => (
            <LeftBarButton
              key={tab.index}
              label={tab.label}
              icon={tab.icon}
              selected={selectedTab === tab.index}
              onClick={() => setSelectedTab(tab.index)}
            />
          )}
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
