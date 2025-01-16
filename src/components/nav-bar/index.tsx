import useWindowSize from "@/hooks/useWindowSize";
import { ETabs } from "@/store/ui";
import { For, Image, Stack, StackProps } from "@chakra-ui/react";
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
import { Link, useLocation } from "wouter";
import BMCIcon from "../bmc/icon";
import HelpDialog from "../help";
import { useColorMode } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";
import MoreMenuButton from "./more-menu-button";
import NavBarButton from "./nav-bar-button";

const tabsTop = [
  { label: "My Season", icon: faTableCellsLarge, index: ETabs.MySeason },
  { label: "My Series", icon: faFlagCheckered, index: ETabs.MySeries },
  { label: "My Cars", icon: faCar, index: ETabs.MyCars },
  { label: "My Tracks", icon: faRoad, index: ETabs.MyTracks },
  { label: "Shop Guide", icon: faShoppingBag, index: ETabs.ShopGuide },
];

function NavBar({ ...props }: StackProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { height } = useWindowSize();
  const tiny = height <= 615;
  const small = !tiny && height <= 680;

  const [location] = useLocation();

  return (
    <Stack
      {...props}
      justifyContent="space-between"
      paddingTop={3}
      paddingBottom={2}
      color={{ base: "gray.700", _dark: "gray.300" }}
      overflowY={"auto"}
    >
      <Stack
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={small ? 1.5 : 3}
      >
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
            userSelect={"none"}
            draggable={false}
            w={"40px"}
            h={"40px"}
            src="/my-racing-planner/my-racing-planner-icon.svg"
            alt="my=racing-planner-icon"
            mb={3}
          />
        </Tooltip>
        <For
          each={tabsTop}
          children={(tab) => (
            <NavBarButton
              key={tab.index}
              label={tab.label}
              icon={tab.icon}
              selected={location === tab.index}
              as={Link}
              href={tab.index}
            />
          )}
        />
      </Stack>

      {tiny ? (
        <Stack justifyContent={"flex-start"} alignItems={"center"}>
          <MoreMenuButton />
        </Stack>
      ) : (
        <Stack
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={small ? 1.5 : 3}
        >
          <NavBarButton
            key={"about"}
            label={"About"}
            icon={faInfoCircle}
            selected={location === ETabs.About}
            as={Link}
            href={ETabs.About}
          />

          <HelpDialog>
            <NavBarButton
              key={"help"}
              label={"Help"}
              icon={faCircleQuestion}
              selected={false}
              onClick={() => (document.activeElement as HTMLElement).blur()}
            />
          </HelpDialog>

          <NavBarButton
            key={"buy-me-a-coffee"}
            label="Support"
            selected={false}
            as="a"
            href="https://buymeacoffee.com/adrianulima"
            target="_blank"
            rel="noreferrer"
          >
            <BMCIcon />
          </NavBarButton>

          <NavBarButton
            key={"language"}
            label={"English"}
            icon={faLanguage}
            selected={false}
            disabled
          />

          <NavBarButton
            key={"color-mode"}
            label={colorMode === "light" ? "Light" : "Dark"}
            icon={colorMode === "light" ? faSun : faMoon}
            selected={false}
            onClick={toggleColorMode}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default NavBar;
