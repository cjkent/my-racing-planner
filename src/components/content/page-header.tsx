import useWindowSize from "@/hooks/useWindowSize";
import { Collapsible, HStack } from "@chakra-ui/react";
import { useContainer } from "../main-container/useContainer";
import CheckboxCounts from "./checkbox-counts";
import PageTitle from "./page-title";

function PageHeader({
  title,
  description,
  freeCount,
  ownedCount,
  wishCount,
}: {
  title: string;
  description: string;
  freeCount?: number;
  ownedCount?: number;
  wishCount?: number;
}) {
  const { height } = useWindowSize();
  const notSmall = (value: any) => (height <= 680 ? undefined : value);
  const showCounts =
    freeCount != undefined || ownedCount != undefined || wishCount != undefined;
  const { scrolled } = useContainer();
  return (
    <Collapsible.Root open={!scrolled}>
      <Collapsible.Content>
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
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default PageHeader;
