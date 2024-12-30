import { Badge, Text } from "@chakra-ui/react";

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
        <Badge colorPalette="yellow">{patterns[badge]}</Badge>{" "}
        {name.replace(badge, "")}
      </>
    );
  }
  return name;
}

function ContentNameBadge({ name }: { name: string }) {
  return (
    <Text fontWeight={"bold"}>
      <NameWithBadges name={name} />
    </Text>
  );
}

export default ContentNameBadge;
