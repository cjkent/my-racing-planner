import { Badge, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const patterns = {
  "[Retired] ": "Retired",
  "[Legacy] ": "Legacy",
};

function NameWithBadges({ name }: { name: string }) {
  const badge = Object.keys(patterns).find((k) =>
    name.includes(k),
  ) as keyof typeof patterns;
  if (badge) {
    return (
      <>
        <Badge colorPalette="yellow" mr={1}>
          {patterns[badge]}
        </Badge>
        {name.replace(badge, "")}
      </>
    );
  }
  return name;
}

function ContentNameBadge({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <Text fontWeight={"bold"}>
      {children}
      <NameWithBadges name={name} />
    </Text>
  );
}

export default ContentNameBadge;
