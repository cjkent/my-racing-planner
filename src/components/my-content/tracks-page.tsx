import useDebounce from "@/hooks/useDebounce";
import SORTED_TRACKS, { FREE_TRACKS } from "@/ir-data/utils/tracks";
import { ETrackCategories } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import { Flex } from "@chakra-ui/react";
import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ContentFilterPanel from "./content-filter-panel";
import ContentHeader from "./content-header";
import ContentTable from "./content-table";
import ContentTableRow from "./content-table-row";

function TracksPage() {
  const [tabCategory, setTabCategory] = useState<ETrackCategories>(
    ETrackCategories.all,
  );
  const [pop, setOpenPop] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(SORTED_TRACKS);

  const { myTracks, wishTracks, favoriteTracks } = useIr();

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const filteredCars =
      tabCategory === ETrackCategories.all
        ? SORTED_TRACKS
        : SORTED_TRACKS.filter((track) =>
            track.categories.some(
              (v: string) =>
                ETrackCategories[v as keyof typeof ETrackCategories] ===
                tabCategory,
            ),
          );
    const trimmedSearch = debouncedSearch
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredCarsWithSearch = !!trimmedSearch
      ? filteredCars.filter((car) =>
          car.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedSearch),
        )
      : filteredCars;

    setList(filteredCarsWithSearch);
  }, [debouncedSearch, tabCategory]);

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <ContentHeader
        freeCount={FREE_TRACKS}
        ownedCount={myTracks.length ?? 0}
        wishCount={wishTracks.length ?? 0}
        title={"My Tracks"}
        description={
          "Mark the tracks you own and select your favorites. Use the wishlist to preview the content before you buy it."
        }
      />

      <ContentFilterPanel
        tabs={ETrackCategories}
        tab={tabCategory}
        onTabChange={setTabCategory}
        onSearchChange={setSearch}
      />

      <ContentTable
        list={list}
        children={(item) => (
          <ContentTableRow
            key={item.id}
            content="tracks"
            infoUrl={`${IR_URL.members}/shop/tracks?trackId=${item.id}`}
            skuIcon={faRoad}
            id={item.id}
            price={item.price}
            name={item.name}
            logo={item.logo}
            categories={item.categories}
            free={item.free}
            skuGroup={item.skuGroup ? Object.values(item.skuGroup) : undefined}
            series={item.series}
            popOpen={pop === item.id}
            setOpenPop={setOpenPop}
            owned={myTracks.includes(item.id)}
            favorite={favoriteTracks.includes(item.id)}
            wish={wishTracks.includes(item.id)}
          />
        )}
      />
    </Flex>
  );
}

export default TracksPage;
