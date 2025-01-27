import { useIr } from "@/store/ir";
import { useUi } from "@/store/ui";
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
import ShopSettingsPopover from "./shop-settings-popover";

function WishlistPanel() {
  const { wishCars, wishTracks } = useIr();
  const { shopLoyaltyDiscount, shopVolumeDiscount } = useUi();

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

  const totalPrice = useMemo(
    () => wishList.reduce((acc, curr) => acc + curr.price, 0),
    [wishList],
  );
  const discount = shopLoyaltyDiscount
    ? 20
    : !shopVolumeDiscount
    ? 0
    : wishList.length < 3
    ? 0
    : wishList.length < 6
    ? 10
    : wishList.length < 20
    ? 15
    : 20;

  const discountAmount = (totalPrice * discount) / 100;
  const totalPriceDiscount = totalPrice - discountAmount;

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
      <HStack
        mt={2}
        justifyContent={"space-between"}
        fontWeight={"bold"}
        alignItems={"end"}
      >
        <Text textStyle="4xl">Total</Text>
        <Stack alignItems={"end"} gap={0}>
          {(shopVolumeDiscount || shopLoyaltyDiscount) && (
            <>
              <HStack color={"gray"}>
                <FormatNumber
                  style="currency"
                  currency="USD"
                  value={totalPrice}
                />
                <Text>-</Text>
                <FormatNumber
                  style="currency"
                  currency="USD"
                  value={discountAmount}
                />
              </HStack>
              <Text
                color={"gray"}
                textAlign={"center"}
                textStyle="xs"
                fontWeight={"normal"}
              >
                {discount}% discount (
                {shopLoyaltyDiscount ? "loyalty" : `${wishList.length} items`})
              </Text>
              <Separator mt={2} />
            </>
          )}
          <Text fontSize={"2xl"}>
            <FormatNumber
              style="currency"
              currency="USD"
              value={totalPriceDiscount}
            />
          </Text>
        </Stack>
      </HStack>
      <CheckoutButton wishList={wishList} />
    </Stack>
  );
}

export default WishlistPanel;
