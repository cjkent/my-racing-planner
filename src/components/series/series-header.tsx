import { HStack } from "@chakra-ui/react";
import PageHeader from "../content/page-header";

function SeriesHeader() {
  return (
    <HStack
      padding={{ base: "unset", md: 4 }}
      justifyContent={"space-between"}
      alignItems={"start"}
    >
      <PageHeader
        title="My Favorite Series"
        description="Select the series you wanna see in your season planner"
      />
    </HStack>
  );
}

export default SeriesHeader;
