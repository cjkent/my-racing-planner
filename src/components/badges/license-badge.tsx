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
  const dark = darkenHexColor(`#${color}`, 0.3);
  const light = lightenHexColor(`#${color}`, 0.7);
  return (
    <Badge
      bg={{ base: light, _dark: dark }}
      color={{ base: dark, _dark: light }}
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
