import useScreenSize from "@/hooks/useScreenSize";
import { EHistorySince } from "@/ir-data/utils/history";
import { CategoryIcon } from "@/ir-data/utils/icons";
import { HStack, IconButton, Tabs, Text, VStack } from "@chakra-ui/react";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Radio, RadioGroup } from "../ui/radio";

function HistoryFilterPanel<T extends string>({
  tabs,
  tab,
  since,
  onTabChange,
  onSinceChange,
}: {
  tabs: { [key: string]: string };
  tab: T;
  since: EHistorySince;
  onTabChange: (value: T) => void;
  onSinceChange: (value: EHistorySince) => void;
}) {
  const { width } = useScreenSize();
  const labels = {
    [EHistorySince.Ever]: "All Time",
    [EHistorySince.ThisYear]: "This Year",
    [EHistorySince.LastYear]: "Since Last Year",
    [EHistorySince.ThreeYears]: "Past Three Years",
    [EHistorySince.FiveYears]: "Past Five Years",
    [EHistorySince.TenYears]: "Past Ten Years",
  };
  return (
    <HStack justifyContent={{ md: "space-between", base: "center" }} mb={2}>
      <PopoverRoot
        positioning={{ placement: width.md ? "right-start" : "bottom-start" }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label="Settings"
            variant={"outline"}
            size={"lg"}
            bgColor={{ base: "bg.muted", _hover: "bg" }}
            borderRadius={"md"}
            px={2}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <Text hideBelow={"md"}>{labels[since]}</Text>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <RadioGroup
            value={since}
            onValueChange={(e) => onSinceChange(e.value as EHistorySince)}
          >
            <VStack alignItems={"start"} p={2}>
              <Radio value={EHistorySince.Ever}>
                {labels[EHistorySince.Ever]}
              </Radio>
              <Radio value={EHistorySince.ThisYear}>
                {labels[EHistorySince.ThisYear]}
              </Radio>
              <Radio value={EHistorySince.LastYear}>
                {labels[EHistorySince.LastYear]}
              </Radio>
              <Radio value={EHistorySince.ThreeYears}>
                {labels[EHistorySince.ThreeYears]}
              </Radio>
              <Radio value={EHistorySince.FiveYears}>
                {labels[EHistorySince.FiveYears]}
              </Radio>
              <Radio value={EHistorySince.TenYears}>
                {labels[EHistorySince.TenYears]}
              </Radio>
            </VStack>
          </RadioGroup>
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => onTabChange(e.value as T)}
        variant={"enclosed"}
        width={{ md: "unset", base: "100%" }}
        flex={{ md: "unset", base: 1 }}
      >
        <Tabs.List
          flex={{ md: "unset", base: 1 }}
          width={{ md: "unset", base: "100%" }}
        >
          {Object.entries(tabs).map(([k, tab]: [string, string]) => (
            <Tabs.Trigger
              value={tab}
              key={tab}
              width={{ md: "unset", base: "100%" }}
            >
              <CategoryIcon category={k} />
              <Text
                hideBelow={tab === "All" ? undefined : "md"}
                textWrap={"nowrap"}
                userSelect={"none"}
              >
                {tab}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </HStack>
  );
}

export default HistoryFilterPanel;
