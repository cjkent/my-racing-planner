import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ETabs, setHelpPresented, setSelectedPage, useUi } from "@/store/ui";
import { PropsWithChildren, useEffect, useState } from "react";
import HelpContent from "./help-content";

function HelpDialog({ children }: PropsWithChildren) {
  const { helpPresented } = useUi();
  const [open, setOpen] = useState(!helpPresented);

  useEffect(() => {
    if (!helpPresented) {
      setOpen(true);
      setHelpPresented(true);
      setSelectedPage(ETabs.MySeries);
    }
  }, [helpPresented]);

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size="lg"
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Welcome to My Racing Planner</DialogTitle>
        </DialogHeader>
        <DialogBody px={10}>
          <HelpContent />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default HelpDialog;
