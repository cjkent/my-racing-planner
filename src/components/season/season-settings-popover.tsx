import {
  setSeasonHighlight,
  setSeasonShowCarsDropdown,
  setSeasonShowCheckboxes,
  setSeasonShowOwned,
  setSeasonShowReorder,
  setSeasonShowThisWeek,
  setSeasonShowWishlist,
  useUi,
} from "@/store/ui";
import { For, VStack } from "@chakra-ui/react";
import { Switch } from "../ui/switch";
import { Tooltip } from "../ui/tooltip";

function SeasonSettingsPopover() {
  const {
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowThisWeek,
    seasonShowWishlist,
    seasonShowOwned,
  } = useUi();

  const settingsList = [
    {
      id: "reorder",
      text: "Drag and drop to reorder",
      tooltip: "Enable columns drag and drop to reorder series",
      checked: seasonShowReorder,
      setChecked: setSeasonShowReorder,
    },
    {
      id: "checkboxes",
      text: "Show content checkboxes",
      tooltip: "Show track checkboxes to quickly switch tracks you own",
      checked: seasonShowCheckboxes,
      setChecked: setSeasonShowCheckboxes,
    },
    {
      id: "cars",
      text: "Show cars dropdown",
      tooltip: "Show cars dropdown to quickly switch cars you own",
      checked: seasonShowCarsDropdown,
      setChecked: setSeasonShowCarsDropdown,
    },
    {
      id: "hover",
      text: "Highlight on track hover",
      tooltip: "Highlight all cells with the same hovered track",
      checked: seasonHighlight,
      setChecked: setSeasonHighlight,
    },
    {
      id: "thisWeek",
      text: "Show current week",
      tooltip: "Highlight current week",
      checked: seasonShowThisWeek,
      setChecked: setSeasonShowThisWeek,
    },
    {
      id: "wishlist",
      text: "Show wishlist",
      tooltip: "Either wishlist items should be colored",
      checked: seasonShowWishlist,
      setChecked: setSeasonShowWishlist,
    },
    {
      id: "owned",
      text: "Show owned",
      tooltip: "Either owned items should be colored",
      checked: seasonShowOwned,
      setChecked: setSeasonShowOwned,
    },
  ];

  return (
    <VStack alignItems={"start"} p={2}>
      <For
        each={settingsList}
        children={(settings) => (
          <Tooltip
            lazyMount
            unmountOnExit
            key={settings.id}
            content={settings.tooltip}
            showArrow
            positioning={{ placement: "top" }}
            openDelay={200}
            closeDelay={100}
            ids={{ trigger: settings.id }}
          >
            <Switch
              ids={{ root: settings.id }}
              checked={settings.checked}
              onCheckedChange={({ checked }) => settings.setChecked(checked)}
            >
              {settings.text}
            </Switch>
          </Tooltip>
        )}
      />
    </VStack>
  );
}

export default SeasonSettingsPopover;
