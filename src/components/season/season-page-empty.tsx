import { ETabs, setHelpPresented } from "@/store/ui";
import { Flex, Link, List } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "wouter";
import { EmptyState } from "../ui/empty-state";

function SeasonPageEmpty() {
  const [_, navigate] = useLocation();
  return (
    <Flex
      flex={1}
      borderRadius={"md"}
      bgColor={"bg.muted"}
      p={4}
      justifyContent={"center"}
    >
      <EmptyState
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        title="No series selected"
        description="You didn't choose any favorite series"
      >
        <List.Root variant="marker">
          <List.Item>
            <Link onClick={() => setHelpPresented(false)}>
              Read the Help Page instructions
            </Link>
          </List.Item>
          <List.Item onClick={() => navigate(ETabs.MySeries)}>
            <Link>Go directly to the My Series page</Link>
          </List.Item>
        </List.Root>
      </EmptyState>
    </Flex>
  );
}

export default SeasonPageEmpty;
