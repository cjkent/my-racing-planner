import SERIES_JSON from "@/ir-data/utils/series";
import { Flex } from "@chakra-ui/react";

function SeriesPage() {
  // console.log(SEASON_JSON);
  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      {SERIES_JSON.map((item: any) => {
        return <p key={item.id}>{JSON.stringify(item)}</p>;
      })}
    </Flex>
  );
}

export default SeriesPage;
