import { Flex } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmptyState } from "../ui/empty-state";

function SeasonTableEmpty() {
  return (
    <Flex flex={1} borderRadius={"md"} bgColor={"bg.muted"} p={4}>
      <EmptyState
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        title="No series found"
        description="Try different categories"
      />
    </Flex>
  );
}

export default SeasonTableEmpty;
