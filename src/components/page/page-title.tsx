import { Heading, Stack, StackProps, Text } from "@chakra-ui/react";
import { useAppLayout } from "../app/useAppLayout";

function PageTitle({
  title,
  description,
  ...rest
}: StackProps & {
  title: string;
  description: string;
}) {
  const {
    screen: { height },
  } = useAppLayout();
  const ifNotSmall = (value: any) => (height.small ? undefined : value);
  return (
    <Stack pl={{ base: "0.5rem", md: ifNotSmall("unset") }} gap={0} {...rest}>
      <Heading
        size={{ base: "2xl", md: ifNotSmall("4xl") }}
        fontFamily="mono"
        fontWeight="bold"
      >
        {title}
      </Heading>
      <Text fontSize={{ base: "xs", md: "unset" }} userSelect={"none"}>
        {description}
      </Text>
    </Stack>
  );
}

export default PageTitle;
