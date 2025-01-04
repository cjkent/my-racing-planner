import { CategoryIcon } from "@/ir-data/utils/icons";
import { ECarCategories } from "@/ir-data/utils/types";
import { setSeasonCategory, useUi } from "@/store/ui";
import { IconButton, Stack, Tabs } from "@chakra-ui/react";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import SeasonSettingsPopover from "./season-settings-popover";

function SeasonFilterPanel() {
  const { seasonCategory } = useUi();

  return (
    <Stack
      justifyContent={{ md: "space-between", base: "center" }}
      alignItems={"center"}
      direction={{ base: "column", md: "row" }}
    >
      <PopoverRoot positioning={{ placement: "right-start" }}>
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
          <SeasonSettingsPopover />
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={seasonCategory}
        onValueChange={(e) => setSeasonCategory(e.value as ECarCategories)}
        variant={"enclosed"}
      >
        <Tabs.List>
          {Object.entries(ECarCategories).map(([k, tab]: [string, string]) => (
            <Tabs.Trigger value={tab} key={tab}>
              <CategoryIcon category={k} />
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Stack>
  );
}

export default SeasonFilterPanel;
