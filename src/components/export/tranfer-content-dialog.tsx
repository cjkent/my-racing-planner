import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import useContentTransfer from "./useContentTransfer";

function TransferContentDialog() {
  const { hasNewData, applyData, ignoreData } = useContentTransfer();
  return (
    <DialogRoot role="alertdialog" open={hasNewData}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Replace Current Preferences</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Loading this transfer will replace all your current preferences with
            the new ones. This action cannot be undone. Do you want to continue?
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={ignoreData} variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button onClick={applyData}>Apply</Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={ignoreData} />
      </DialogContent>
    </DialogRoot>
  );
}

export default TransferContentDialog;
