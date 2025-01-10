import { IR_URL } from "@/ir-data/utils/urls";
import { useIr } from "@/store/ir";
import {
  setShopLoyaltyDiscount,
  setShopVolumeDiscount,
  useUi,
} from "@/store/ui";
import {
  Flex,
  For,
  FormatNumber,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  faArrowUpRightFromSquare,
  faCar,
  faGears,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useMemo } from "react";
import CARS_LIST from "../../ir-data/utils/cars";
import TRACKS_LIST from "../../ir-data/utils/tracks";
import { LinkButton } from "../ui/link-button";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

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
      height={"100%"}
      maxH={"100%"}
      bgColor={"bg"}
      p={4}
    >
      <HStack justifyContent={"space-between"}>
        <Text textStyle="3xl">Wishlist</Text>

        <PopoverRoot positioning={{ placement: "left-start" }}>
          <PopoverTrigger asChild>
            <IconButton
              aria-label="Settings"
              variant={"outline"}
              size={"lg"}
              bgColor={{ base: "bg", _hover: "bg.muted" }}
              borderRadius={"md"}
            >
              <FontAwesomeIcon icon={faGears} />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent>
            <VStack alignItems={"start"} p={2}>
              <Tooltip
                lazyMount
                unmountOnExit
                content={"Apply iRacing discounts for bundle purchases"}
                showArrow
                positioning={{ placement: "top" }}
                openDelay={200}
                closeDelay={100}
                ids={{ trigger: "volumeDiscount" }}
              >
                <Switch
                  ids={{ root: "volumeDiscount" }}
                  checked={shopVolumeDiscount}
                  onCheckedChange={({ checked }) =>
                    setShopVolumeDiscount(checked)
                  }
                >
                  Volume discount
                </Switch>
              </Tooltip>
              <Tooltip
                lazyMount
                unmountOnExit
                content={"Apply iRacing loyalty discount"}
                showArrow
                positioning={{ placement: "top" }}
                openDelay={200}
                closeDelay={100}
                ids={{ trigger: "loyaltyDiscount" }}
              >
                <Switch
                  ids={{ root: "loyaltyDiscount" }}
                  checked={shopLoyaltyDiscount}
                  onCheckedChange={({ checked }) =>
                    setShopLoyaltyDiscount(checked)
                  }
                >
                  Loyalty discount
                </Switch>
              </Tooltip>
            </VStack>
          </PopoverContent>
        </PopoverRoot>
      </HStack>

      <Stack overflowY="auto" flex={1}>
        <Separator />
        <For
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
      <LinkButton
        size="lg"
        href={`${IR_URL.store}?skus=${wishList.map((c) => c.sku)}`}
        target="_blank"
        rel="noreferrer"
        colorPalette={"blue"}
      >
        Checkout on iRacing.com store
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </LinkButton>
    </Stack>
  );
}

export default WishlistPanel;
