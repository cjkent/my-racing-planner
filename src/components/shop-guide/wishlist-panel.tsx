import { useIr } from "@/store/ir";
import {
  Flex,
  For,
  FormatNumber,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  faCar,
  faMagnifyingGlass,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useMemo } from "react";
import CARS_LIST from "../../ir-data/utils/cars";
import TRACKS_LIST from "../../ir-data/utils/tracks";
import { EmptyState } from "../ui/empty-state";
import CheckoutButton from "./checkout-button";
import PriceDiscountPanel from "./price-discount-panel";
import ShopSettingsPopover from "./shop-settings-popover";

function WishlistPanel() {
  const { wishCars, wishTracks } = useIr();
  const wishList = useMemo(
    () =>
      TRACKS_LIST.filter((t) => wishTracks.includes(t.sku))
        .map((c) => ({ ...c, isCar: false }))
        .concat(
          CARS_LIST.filter((c) => wishCars.includes(c.sku)).map((c) => ({
            ...c,
            isCar: true,
          })),
        ),
    [wishTracks, wishCars],
  );

  return (
    <Stack
      flex={1}
      borderRadius={"md"}
      w={"100%"}
      h={"100%"}
      maxH={"100%"}
      bgColor={"bg.muted"}
      p={4}
    >
      <HStack justifyContent={"space-between"}>
        <Text textStyle="3xl">Wishlist</Text>
        <ShopSettingsPopover />
      </HStack>

      <Stack overflowY="auto" flex={1}>
        <Separator />
        <For
          fallback={
            <EmptyState
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              title={"Empty wishlist"}
              description={"Add some cars or tracks to your wishlist"}
            />
          }
          each={wishList}
          children={(item) => (
            <Fragment key={item.id}>
              <HStack>
                <FontAwesomeIcon icon={item.isCar ? faCar : faRoad} size="sm" />
                <Flex flex={1}>{item.name}</Flex>
                <FormatNumber
                  style="currency"
                  currency="USD"
                  value={item.price}
                />
              </HStack>
              <Separator />
            </Fragment>
          )}
        />
      </Stack>
      <PriceDiscountPanel wishList={wishList} />
      <CheckoutButton wishList={wishList} />
    </Stack>
  );
}

export default WishlistPanel;
