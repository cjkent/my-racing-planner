import useWindowSize from "@/hooks/useWindowSize";
import { Collapsible, HStack, StackProps } from "@chakra-ui/react";
import {
  faCircleQuestion,
  faFileLines,
  faInfoCircle,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import AboutDialog from "../about/about-dialog";
import { useScroll } from "../app/useScroll";
import ChangelogDialog from "../changelog/changelog-dialog";
import HelpDialog from "../help/help-dialog";
import PrivacyPolicyAnalog from "../privacy-policy/privacy-policy-dialog";
import TopBarButton from "./top-bar-button";
import UserDropdown from "./user-dropdown";

function TopBar({ ...props }: StackProps) {
  const { scrolled } = useScroll();
  const { height } = useWindowSize();
  const tiny = height <= 480; // TODO: Move to context (rename scroll context)

  return (
    !tiny && (
      <Collapsible.Root open={!scrolled}>
        <Collapsible.Content>
          <HStack justifyContent={"end"} {...props}>
            <AboutDialog ids={{ trigger: "about-dialog" }}>
              <TopBarButton
                tooltip={"About"}
                icon={faInfoCircle}
                trigger={"about-dialog"}
              />
            </AboutDialog>

            <HelpDialog ids={{ trigger: "help-dialog" }}>
              <TopBarButton
                tooltip={"Help"}
                icon={faCircleQuestion}
                trigger={"help-dialog"}
              />
            </HelpDialog>

            <PrivacyPolicyAnalog ids={{ trigger: "privacy-policy" }}>
              <TopBarButton
                tooltip={"Privacy Policy"}
                icon={faShieldHalved}
                trigger={"privacy-policy"}
              />
            </PrivacyPolicyAnalog>

            <ChangelogDialog ids={{ trigger: "changelog-dialog" }}>
              <TopBarButton
                tooltip={"Change Log"}
                icon={faFileLines}
                trigger={"changelog-dialog"}
              />
            </ChangelogDialog>

            <UserDropdown />
          </HStack>
        </Collapsible.Content>
      </Collapsible.Root>
    )
  );
}

export default TopBar;
