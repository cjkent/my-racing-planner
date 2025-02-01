import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useWindowSize from "@/hooks/useWindowSize";
import { ETabs, setHelpPresented, useUi } from "@/store/ui";
import { DialogRootProps } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "wouter";
import LoadingContainer from "../page/loading-container";
const HelpContent = lazy(() => import("./help-content"));

function HelpDialog({ children, ...rest }: DialogRootProps) {
  const { helpPresented } = useUi();
  const [open, setOpen] = useState(!helpPresented);
  const { size } = useWindowSize();
  const [_, navigate] = useLocation();

  useEffect(() => {
    if (!helpPresented) {
      setOpen(true);
      setHelpPresented(true);
      navigate(ETabs.MySeries);
    }
  }, [helpPresented]);

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={size.lg ? "xl" : size.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
      {...rest}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Welcome to My Racing Planner</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Suspense fallback={<LoadingContainer />}>
            <HelpContent close={() => setOpen(false)} />
          </Suspense>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default HelpDialog;
