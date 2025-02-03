import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useScreenSize from "@/hooks/useScreenSize";
import { DialogRootProps } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingContainer from "../page/loading-container";
const ExportContent = lazy(() => import("./export-content"));

function ExportDialog({ children, ...rest }: DialogRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useScreenSize();

  useEffect(() => {
    (document.activeElement as HTMLElement).blur();
  }, [isOpen]);

  return (
    <DialogRoot
      lazyMount
      unmountOnExit
      open={isOpen}
      onOpenChange={(e) => {
        (document.activeElement as HTMLElement).blur();
        setIsOpen(e.open);
      }}
      size={width.lg ? "xl" : width.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
      {...rest}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Export My Content</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Suspense fallback={<LoadingContainer />}>
            <ExportContent />
          </Suspense>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ExportDialog;
