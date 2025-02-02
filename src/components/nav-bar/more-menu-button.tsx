import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HStack, Icon, Separator, Stack, StackProps } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCircleQuestion,
  faFileLines,
  faInfoCircle,
  faLanguage,
  faMoon,
  faShareFromSquare,
  faShieldHalved,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AboutDialog from "../about/about-dialog";
import BMCIcon from "../bmc/icon";
import ChangelogDialog from "../changelog/changelog-dialog";
import ExportDialog from "../export/export-dialog";
import HelpDialog from "../help/help-dialog";
import PrivacyPolicyAnalog from "../privacy-policy/privacy-policy-dialog";
import { Button, ButtonProps } from "../ui/button";
import { useColorMode } from "../ui/color-mode";
import NavBarButton from "./nav-bar-button";

function MoreMenuItem({
  label,
  icon,
  disabled,
  children,
  ...rest
}: ButtonProps & {
  label: string;
  icon?: IconProp;
}) {
  return (
    <Button
      unstyled
      userSelect={"none"}
      {...rest}
      color={disabled ? "gray" : undefined}
      _hover={
        !disabled
          ? {
              base: { bgColor: "blackAlpha.200" },
              _dark: { bgColor: "whiteAlpha.200" },
            }
          : undefined
      }
    >
      <HStack>
        {icon ? (
          <Icon
            height={"22px"}
            width={"22px"}
            alignItems={"center"}
            justifyContent={"center"}
            p={"6px"}
          >
            <FontAwesomeIcon icon={icon} />
          </Icon>
        ) : (
          children
        )}
        {label}
      </HStack>
    </Button>
  );
}

function MoreMenuButton({
  selected,
  ...props
}: StackProps & { selected?: boolean }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HStack wrap="wrap" {...props}>
      <DrawerRoot
        placement={"bottom"}
        open={isOpen}
        onOpenChange={(e) => {
          (document.activeElement as HTMLElement).blur();
          setIsOpen(e.open);
        }}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <NavBarButton label={"More"} icon={faBars} selected={selected} />
        </DrawerTrigger>
        <DrawerContent roundedTop={"l3"}>
          <DrawerBody>
            <Stack>
              <AboutDialog>
                <MoreMenuItem label="About" icon={faInfoCircle} />
              </AboutDialog>
              <Separator />
              <HelpDialog>
                <MoreMenuItem label="Help" icon={faCircleQuestion} />
              </HelpDialog>
              <Separator />
              <PrivacyPolicyAnalog>
                <MoreMenuItem label="Privacy Policy" icon={faShieldHalved} />
              </PrivacyPolicyAnalog>
              <Separator />
              <ChangelogDialog>
                <MoreMenuItem label="Change Log" icon={faFileLines} />
              </ChangelogDialog>
              <Separator />
              <MoreMenuItem
                label="Buy me a Coffee"
                onClick={() => setIsOpen(false)}
                as={"a"}
                href="https://buymeacoffee.com/adrianulima"
                target="_blank"
                rel="noreferrer"
              >
                <BMCIcon />
              </MoreMenuItem>
              <Separator />
              <ExportDialog>
                <MoreMenuItem
                  label="Export My Content"
                  icon={faShareFromSquare}
                />
              </ExportDialog>
              <Separator />
              <MoreMenuItem
                label="Switch Language"
                icon={faLanguage}
                disabled
              />
              <Separator />
              <MoreMenuItem
                label="Toggle Color Mode"
                icon={colorMode === "light" ? faSun : faMoon}
                onClick={toggleColorMode}
              />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </HStack>
  );
}

export default MoreMenuButton;
