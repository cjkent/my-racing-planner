import { ETabs, setSelectedPage, useUi } from "@/store/ui";
import { For, Image, Stack } from "@chakra-ui/react";
import {
  faCar,
  faCircleQuestion,
  faFlagCheckered,
  faInfoCircle,
  faLanguage,
  faMoon,
  faRoad,
  faShoppingBag,
  faSun,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import HelpDialog from "../help";
import LeftBarButton from "../left-bar/left-bar-button";
import { useColorMode } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";
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
        <Tooltip
          lazyMount
          unmountOnExit
          content={`My Racing Planner v${APP_VERSION}`}
          showArrow
          positioning={{ placement: "bottom" }}
          openDelay={200}
          closeDelay={100}
        >
          <Image
            w={"40px"}
            h={"40px"}
            src="/my-racing-planner-icon.svg"
            alt="my=racing-planner-icon"
            mb={5}
          />
        </Tooltip>
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
        <HelpDialog>
          <LeftBarButton
            key={"help"}
            label={"Help"}
            icon={faCircleQuestion}
            selected={false}
            onClick={(e) => e.currentTarget.blur()}
          />
        </HelpDialog>

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
