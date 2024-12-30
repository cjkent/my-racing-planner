import { Badge, FormatNumber } from "@chakra-ui/react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PriceBadge({ price }: { price: number }) {
  return price > 0 ? (
    <Badge colorPalette={"orange"}>
      <FontAwesomeIcon icon={faShoppingCart} size="xs" />
      <FormatNumber value={price} style="currency" currency="USD" />
    </Badge>
  ) : (
    <Badge colorPalette={"green"}>Free</Badge>
  );
}

export default PriceBadge;
