import { CategoryIcon } from "@/ir-data/utils/icons";
import { ECarCategories } from "@/ir-data/utils/types";
import { setSeasonCategory, useUi } from "@/store/ui";
import { HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import SeasonSettingsPopover from "./season-settings-popover";

function SeasonFilterPanel() {
  const { seasonCategory } = useUi();

  return (
    <HStack
      justifyContent={{ md: "space-between", base: "center" }}
      alignItems={"start"}
    >
      <PopoverRoot positioning={{ placement: "right-start" }}>
        <PopoverTrigger asChild>
          <IconButton
            aria-label="Settings"
            variant={"outline"}
            size={"lg"}
            bgColor={{ base: "bg.muted", _hover: "bg" }}
            borderRadius={"md"}
          >
            <FontAwesomeIcon icon={faGears} />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <SeasonSettingsPopover />
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={seasonCategory}
        onValueChange={(e) => setSeasonCategory(e.value as ECarCategories)}
        variant={"enclosed"}
        width={{ md: "unset", base: "100%" }}
        flex={{ md: "unset", base: 1 }}
      >
        <Tabs.List
          flex={{ md: "unset", base: 1 }}
          width={{ md: "unset", base: "100%" }}
        >
          {Object.entries(ECarCategories).map(([k, tab]: [string, string]) => (
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

export default SeasonFilterPanel;
