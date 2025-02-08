import SORTED_CARS, { FREE_CARS_COUNT } from "@/ir-data/utils/cars";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import ContentPage from "./content-page";

function CarsPage() {
  const { myCars, wishCars } = useIr();
  return (
    <ContentPage
      allTab={ECarCategories.all}
      content={"cars"}
      contentListJson={SORTED_CARS}
      description={
        "Mark the cars you own and select your favorites. Use the wishlist to preview the content before you buy it."
      }
      freeCount={FREE_CARS_COUNT}
      myContent={myCars}
      skuIcon={faCar}
      tabs={ECarCategories}
      title={"My Cars"}
      wish={wishCars}
    />
  );
}

export default CarsPage;
