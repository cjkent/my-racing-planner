import { useUi } from "@/store/ui";
import { FormatNumber, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";

function PriceDiscountPanel({ wishList }: { wishList: { price: number }[] }) {
  const { shopLoyaltyDiscount, shopVolumeDiscount } = useUi();
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
            <Separator mt={1} />
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
  );
}

export default PriceDiscountPanel;
