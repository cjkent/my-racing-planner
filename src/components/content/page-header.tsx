import useWindowSize from "@/hooks/useWindowSize";
import { Heading, Stack, StackProps, Text } from "@chakra-ui/react";

function PageHeader({
  title,
  description,
  ...rest
}: StackProps & {
  title: string;
  description: string;
}) {
  const { height } = useWindowSize();
  const notSmall = (value: any) => (height <= 680 ? undefined : value);
  return (
    <Stack
      pl={{ base: "0.5rem", md: notSmall("unset") }}
      gap={{ base: "0", md: notSmall("0.5rem") }}
      {...rest}
    >
      <Heading
        size={{ base: "2xl", md: notSmall("4xl") }}
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

export default PageHeader;
