import { Heading, Stack, StackProps, Text } from "@chakra-ui/react";

function PageHeader({
  title,
  description,
  ...rest
}: StackProps & {
  title: string;
  description: string;
}) {
  return (
    <Stack
      pl={{ base: "0.5rem", md: "unset" }}
      gap={{ base: "0", md: "0.5rem" }}
      {...rest}
    >
      <Heading
        size={{ base: "2xl", md: "4xl" }}
        fontFamily="mono"
        fontWeight="bold"
      >
        {title}
      </Heading>
      <Text fontSize={{ base: "xs", md: "unset" }}>{description}</Text>
    </Stack>
  );
}

export default PageHeader;
