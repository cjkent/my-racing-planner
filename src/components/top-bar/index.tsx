import useWindowSize from "@/hooks/useWindowSize";
import { Collapsible, HStack, StackProps } from "@chakra-ui/react";
import {
  faCircleQuestion,
  faLanguage,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useScroll } from "../app/useScroll";
import HelpDialog from "../help";
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
