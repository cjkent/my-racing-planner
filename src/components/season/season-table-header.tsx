import { IR_URL } from "@/ir-data/utils/urls";
import { useUi } from "@/store/ui";
import { Collapsible, For, Image, Table, Text, VStack } from "@chakra-ui/react";
import SERIES_JSON from "../../ir-data/series.json";
import { useAppLayout } from "../app/useAppLayout";
import { Tooltip } from "../ui/tooltip";
import SeasonCarsPopover from "./season-cars-popover";
import SortableColumnHeader from "./sortable-column-header";

function SeasonTableHeader({
  filteredFavorites,
}: {
  filteredFavorites: number[];
}) {
  const { seasonShowReorder, seasonShowCarsDropdown } = useUi();
  const { scrolled } = useAppLayout();
  return (
    <Table.Header>
      <Table.Row bgColor={"bg.muted"} zIndex="sticky">
        <Table.ColumnHeader
          textAlign={"center"}
          width="60px"
          bgColor={"bg.muted"}
          position={"sticky"}
          left={"0"}
          zIndex="sticky"
        >
          Week
        </Table.ColumnHeader>

        <For
          each={filteredFavorites}
          children={(seriesId) => {
            const series =
              SERIES_JSON[seriesId.toString() as keyof typeof SERIES_JSON];
            return (
              <SortableColumnHeader
                dragId={seriesId}
                dragEnabled={seasonShowReorder}
                key={seriesId}
                width="(100/x)%"
                position={"relative"}
                bgColor={"currentBg"}
              >
                <>
                  <VStack>
                    {series.logo && (
                      <Image
                        loading="lazy"
                        userSelect={"none"}
                        draggable={false}
                        h="40px"
                        fit="contain"
                        src={`${IR_URL.image}/img/logos/series/${series.logo}`}
                      />
                    )}

                    <Collapsible.Root open={!scrolled}>
                      <Collapsible.Content>
                        <Tooltip
                          lazyMount
                          unmountOnExit
                          content={series.name}
                          showArrow
                          positioning={{ placement: "bottom" }}
                          openDelay={200}
                          closeDelay={100}
                        >
                          <Text
                            textAlign={"center"}
                            lineClamp="2"
                            maxW={"200px"}
                          >
                            {series.name}
                          </Text>
                        </Tooltip>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </VStack>
                  {seasonShowCarsDropdown && (
                    <SeasonCarsPopover cars={series.cars} />
                  )}
                </>
              </SortableColumnHeader>
            );
          }}
        />
      </Table.Row>
    </Table.Header>
  );
}

export default SeasonTableHeader;
