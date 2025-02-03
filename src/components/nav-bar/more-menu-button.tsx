import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useNotifications } from "@/store/notifications";
import { HStack, StackProps } from "@chakra-ui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MoreMenuContent from "./more-menu-content";
import NavBarButton from "./nav-bar-button";

function MoreMenuButton({
  selected,
  ...props
}: StackProps & { selected?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { changelog, privacyPolicy } = useNotifications();
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
          <NavBarButton
            label={"More"}
            icon={faBars}
            selected={selected}
            notification={changelog || privacyPolicy}
          />
        </DrawerTrigger>
        <DrawerContent roundedTop={"l3"}>
          <DrawerBody>
            <MoreMenuContent close={() => setIsOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </HStack>
  );
}

export default MoreMenuButton;
