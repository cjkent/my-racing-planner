import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ETabs } from "@/store/ui";
import { HStack, Icon, Separator, Stack, StackProps } from "@chakra-ui/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCircleQuestion,
  faFileShield,
  faInfoCircle,
  faLanguage,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation } from "wouter";
import BMCIcon from "../bmc/icon";
import HelpDialog from "../help";
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

function MoreMenuButton({ ...props }: StackProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const [_, navigate] = useLocation();
  return (
    <HStack wrap="wrap" {...props}>
      <DrawerRoot
        placement={"bottom"}
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <NavBarButton
            label={"More"}
            icon={faBars}
            selected={false}
            onClick={() => (document.activeElement as HTMLElement).blur()}
          />
        </DrawerTrigger>
        <DrawerContent
          roundedTop={"l3"}
          // paddingBottom={"env(safe-area-inset-bottom)"}
        >
          <DrawerBody>
            <Stack>
              <MoreMenuItem
                label="About"
                icon={faInfoCircle}
                onClick={() => {
                  setIsOpen(false);
                  navigate(ETabs.About);
                }}
              />
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
              <MoreMenuItem
                label="Privacy"
                icon={faFileShield}
                onClick={() => {
                  setIsOpen(false);
                  navigate(ETabs.Privacy);
                }}
              />
              <Separator />
              <HelpDialog>
                <MoreMenuItem
                  label="Help"
                  icon={faCircleQuestion}
                  onClick={() => (document.activeElement as HTMLElement).blur()}
                />
              </HelpDialog>
              <Separator />
              <MoreMenuItem
                label="Change Language"
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
