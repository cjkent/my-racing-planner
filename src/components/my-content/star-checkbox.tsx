import {
  CheckboxCheckedChangeDetails,
  CheckboxRootProps,
  Icon,
} from "@chakra-ui/react";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function StarCheckbox({
  checked,
  onCheckedChange,
  ...rest
}: CheckboxRootProps & {
  checked: boolean;
  onCheckedChange: (details: CheckboxCheckedChangeDetails) => void;
}) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      controlProps={{ border: "0", p: 0, _checked: { bg: "transparent" } }}
      size={"lg"}
      icon={
        <Tooltip
          content={"Favorite"}
          showArrow
          positioning={{ placement: "top" }}
          openDelay={200}
          closeDelay={100}
        >
          <Icon
            _hover={{ color: "yellow" }}
            color={checked ? "orange" : "gray"}
          >
            <FontAwesomeIcon
              icon={checked ? faStar : faStarOutline}
              size="lg"
            />
          </Icon>
        </Tooltip>
      }
      {...rest}
    />
  );
}

export default StarCheckbox;
