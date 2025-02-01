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
import { DialogRootProps, Heading, List, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { useState } from "react";

function ChangelogDialog({ children, ...rest }: DialogRootProps) {
  const [open, setOpen] = useState(false);
  const { size } = useWindowSize();
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
          <DialogTitle>My Racing Planner Change Log</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <Markdown
            options={{
              overrides: {
                h1: { component: "h1", props: { hidden: true } },
                h2: { component: Heading, props: { size: "md", mt: 2 } },
                p: { component: Text },
                ul: { component: List.Root },
                li: { component: List.Item },
              },
            }}
          >
            {CHANGELOG}
          </Markdown>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ChangelogDialog;
