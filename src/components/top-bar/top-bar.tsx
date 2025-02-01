import useWindowSize from "@/hooks/useWindowSize";
import { Collapsible, HStack, StackProps } from "@chakra-ui/react";
import {
  faCircleQuestion,
  faFileLines,
  faLanguage,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useScroll } from "../app/useScroll";
import ChangelogDialog from "../changelog/changelog-dialog";
import HelpDialog from "../help/help-dialog";
import { useColorMode } from "../ui/color-mode";
import TopBarButton from "./top-bar-button";

function TopBar({ ...props }: StackProps) {
  const { scrolled } = useScroll();
  const { colorMode, toggleColorMode } = useColorMode();
  const { height } = useWindowSize();
  const tiny = height <= 615;

  return (
    !tiny && (
      <Collapsible.Root open={!scrolled}>
        <Collapsible.Content>
          <HStack justifyContent={"end"} {...props}>
            <HelpDialog ids={{ trigger: "help-dialog" }}>
              <TopBarButton
                tooltip={"Open Help Dialog"}
                icon={faCircleQuestion}
                onClick={() => (document.activeElement as HTMLElement).blur()}
                trigger={"help-dialog"}
              />
            </HelpDialog>

            <ChangelogDialog ids={{ trigger: "changelog-dialog" }}>
              <TopBarButton
                tooltip={"Open Change Log Dialog"}
                icon={faFileLines}
                onClick={() => (document.activeElement as HTMLElement).blur()}
                trigger={"changelog-dialog"}
              />
            </ChangelogDialog>

            <TopBarButton
              tooltip={"Switch Language"}
              icon={faLanguage}
              disabled
            />

            <TopBarButton
              tooltip={"Toggle Color Mode"}
              icon={colorMode === "light" ? faSun : faMoon}
              onClick={toggleColorMode}
            />
          </HStack>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  );
}

export default TopBar;
