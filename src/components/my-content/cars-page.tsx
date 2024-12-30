import useDebounce from "@/hooks/useDebounce";
import SORTED_CARS, { FREE_CARS } from "@/ir-data/utils/cars";
import { ECarCategories } from "@/ir-data/utils/types";
import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import { Flex } from "@chakra-ui/react";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ContentFilterPanel from "./content-filter-panel";
import ContentHeader from "./content-header";
import ContentTable from "./content-table";
import ContentTableRow from "./content-table-row";

function CarsPage() {
  const [tabCategory, setTabCategory] = useState<ECarCategories>(
    ECarCategories.all,
  );
  const [pop, setOpenPop] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(SORTED_CARS);

  const { myCars, wishCars, favoriteCars } = useIr();

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const filteredCars =
      tabCategory === ECarCategories.all
        ? SORTED_CARS
        : SORTED_CARS.filter((car) =>
            car.categories.some(
              (v: string) =>
                ECarCategories[v as keyof typeof ECarCategories] ===
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
        freeCount={FREE_CARS}
        ownedCount={myCars.length ?? 0}
        wishCount={wishCars.length ?? 0}
        title={"My Cars"}
        description={
          "Mark the cars you own and select your favorites. Use the wishlist to preview the content before you buy it."
        }
      />

      <ContentFilterPanel
        tabs={ECarCategories}
        tab={tabCategory}
        onTabChange={setTabCategory}
        onSearchChange={setSearch}
      />

      <ContentTable
        list={list}
        children={(item) => (
          <ContentTableRow
            key={item.id}
            content="cars"
            infoUrl={`${IR_URL.members}/shop/cars?carId=${item.id}`}
            skuIcon={faCar}
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
            owned={myCars.includes(item.id)}
            favorite={favoriteCars.includes(item.id)}
            wish={wishCars.includes(item.id)}
          />
        )}
      />
    </Flex>
  );
}

export default CarsPage;
