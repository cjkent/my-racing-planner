import { IR_URL } from "@/ir-data/utils/urls";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";

function CheckoutButton({ wishList }: { wishList: { sku: number }[] }) {
  return (
    <Button
      as={"a"}
      disabled={wishList.length < 1}
      size="lg"
      href={
        wishList.length > 0
          ? `${IR_URL.store}?skus=${wishList.map((c) => c.sku)}`
          : undefined
      }
      target="_blank"
      rel="noreferrer"
      colorPalette={"blue"}
    >
      Checkout on iRacing.com store
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </Button>
  );
}

export default CheckoutButton;
