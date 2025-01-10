import { darkenHexColor, lightenHexColor } from "@/utils/color";
import { Badge, BadgeProps } from "@chakra-ui/react";

function LicenseBadge({
  letter,
  color,
  ...rest
}: BadgeProps & {
  letter: string;
  color: string;
}) {
  return (
    <Badge
      bg={darkenHexColor(`#${color}`, 0.3)}
      color={lightenHexColor(`#${color}`, 0.7)}
      borderColor={`#${color}`}
      borderWidth={1}
      fontWeight={"bold"}
      {...rest}
    >
      {letter}
    </Badge>
  );
}

export default LicenseBadge;
