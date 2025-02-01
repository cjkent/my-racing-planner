import useWindowSize from "@/hooks/useWindowSize";
import { Collapsible, HStack, Stack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import CheckboxCounts from "./checkbox-counts";
import PageTitle from "./page-title";
import { usePageScroll } from "./usePageScroll";

function PageHeader({
  title,
  description,
  freeCount,
  ownedCount,
  wishCount,
  children,
}: PropsWithChildren<{
  title: string;
  description: string;
  freeCount?: number;
  ownedCount?: number;
  wishCount?: number;
}>) {
  const { height } = useWindowSize();
  const notSmall = (value: any) => (height <= 680 ? undefined : value);
  const showCounts =
    freeCount != undefined || ownedCount != undefined || wishCount != undefined;
  const { scrolled } = usePageScroll();
  return (
    <Collapsible.Root open={!scrolled}>
      <Collapsible.Content>
        <Stack gap={1} pb={2}>
          <HStack
            padding={{ base: "unset", md: notSmall(4) }}
            justifyContent={"space-between"}
            alignItems={"start"}
          >
            <PageTitle title={title} description={description} />
            {showCounts && (
              <CheckboxCounts
                freeCount={freeCount ?? 0}
                ownedCount={ownedCount ?? 0}
                wishCount={wishCount ?? 0}
              />
            )}
          </HStack>
          {children}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default PageHeader;
