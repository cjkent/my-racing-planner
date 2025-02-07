import {
  CheckboxCheckedChangeDetails,
  CheckboxRootProps,
  Icon,
} from "@chakra-ui/react";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";

function StarCheckbox({
  checked,
  onCheckedChange,
  gray,
  ...rest
}: CheckboxRootProps & {
  checked: boolean;
  gray?: boolean;
  onCheckedChange: (details: CheckboxCheckedChangeDetails) => void;
}) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      controlProps={{ border: "0", p: 0, _checked: { bg: "transparent" } }}
      size={"lg"}
      icon={
        <Icon
          _hover={{ color: gray ? "fg" : "yellow" }}
          color={checked && !gray ? "orange" : "gray"}
        >
          <FontAwesomeIcon icon={checked ? faStar : faStarOutline} size="lg" />
        </Icon>
      }
      {...rest}
    />
  );
}

export default StarCheckbox;
