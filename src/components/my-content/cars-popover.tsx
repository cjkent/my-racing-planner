import { setFavoriteCar, setMyCar, setWishCar, useIr } from "@/store/ir";
import { For, Table, Text } from "@chakra-ui/react";
import { faBookmark, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CARS_JSON from "../../ir-data/cars.json";
import { Checkbox } from "../ui/checkbox";
import StarCheckbox from "./star-checkbox";

function CarsPopover({ list }: { list: number[] }) {
  const { favoriteCars, wishCars, myCars } = useIr();

  return (
    <Table.Root size="sm" striped>
      <Table.Body fontSize={"xs"}>
        <For
          each={list}
          children={(item: number) => {
            const car = CARS_JSON[item.toString() as keyof typeof CARS_JSON];
            const wish = wishCars.includes(car?.id);
            const owned = myCars.includes(car?.id);
            return (
              car && (
                <Table.Row key={item}>
                  <Table.Cell
                    w={"20px"}
                    textAlign={"center"}
                    p={0}
                    borderBottom={0}
                    px={"4px"}
                  >
                    <StarCheckbox
                      size={"xs"}
                      mt={"4px"}
                      checked={favoriteCars.includes(item)}
                      onCheckedChange={(e) =>
                        setFavoriteCar(car.id, !!e.checked)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell
                    width={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    p={0}
                    borderBottom={0}
                    px={"4px"}
                    fontWeight={"bold"}
                    maxW={"264px"}
                  >
                    <Text truncate>{car.name}</Text>
                  </Table.Cell>
                  <Table.Cell w={"20px"} p={0} borderBottom={0} px={"4px"}>
                    <Checkbox
                      size={"xs"}
                      mt={"4px"}
                      readOnly={car.free}
                      colorPalette={
                        car.free ? "green" : wish ? "blue" : undefined
                      }
                      checked={car.free || owned || wish}
                      controlProps={{
                        borderColor:
                          !car.free && !wish && !owned ? "gray.400" : undefined,
                      }}
                      icon={
                        car.free ? (
                          <FontAwesomeIcon size="xs" icon={faSackXmark} />
                        ) : wish ? (
                          <FontAwesomeIcon size="xs" icon={faBookmark} />
                        ) : undefined
                      }
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => {
                        if (owned) {
                          setMyCar(car.id, false);
                          setWishCar(car.id, true);
                        } else if (wish) {
                          setWishCar(car.id, false);
                        } else {
                          setMyCar(car.id, true);
                        }
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            );
          }}
        />
      </Table.Body>
    </Table.Root>
  );
}

export default CarsPopover;
