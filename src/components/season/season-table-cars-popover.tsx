import { useIr } from "@/store/ir";
import { StackProps } from "@chakra-ui/react";
import CARS_JSON from "../../ir-data/cars.json";
import SeasonCarsPopover from "./season-cars-popover";

function SeasonTableCarsPopover({
  cars,
  ...rest
}: StackProps & { cars: number[] }) {
  const { myCars, wishCars } = useIr();
  const freeAny = cars.some(
    (carId) => CARS_JSON[carId.toString() as keyof typeof CARS_JSON].free,
  );
  const ownAny = cars.some((carId) =>
    myCars.includes(CARS_JSON[carId.toString() as keyof typeof CARS_JSON].sku),
  );
  const wishAny = cars.some((carId) =>
    wishCars.includes(
      CARS_JSON[carId.toString() as keyof typeof CARS_JSON].sku,
    ),
  );

  const colorCar =
    cars.length > 0
      ? {
          base: freeAny
            ? "green.400"
            : ownAny
            ? "teal.400"
            : wishAny
            ? "blue.400"
            : "red.400",
          _dark: freeAny
            ? "green.600"
            : ownAny
            ? "teal.600"
            : wishAny
            ? "blue.600"
            : "red.600",
        }
      : undefined;

  return (
    <SeasonCarsPopover cars={cars} bgColor={colorCar} color={"fg"} {...rest} />
  );
}

export default SeasonTableCarsPopover;
