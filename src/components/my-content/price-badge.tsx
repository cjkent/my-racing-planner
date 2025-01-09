import { Badge, BadgeProps, FormatNumber } from "@chakra-ui/react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PriceBadge({ price, ...rest }: BadgeProps & { price: number }) {
  return price > 0 ? (
    <Badge colorPalette={"orange"} {...rest}>
      <FontAwesomeIcon icon={faShoppingCart} size="xs" />
      <FormatNumber value={price} style="currency" currency="USD" />
    </Badge>
  ) : (
    <Badge colorPalette={"green"} {...rest}>
      Free
    </Badge>
  );
}

export default PriceBadge;
