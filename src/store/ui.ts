import { ECarCategories } from "@/ir-data/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ETabs {
  MySeason,
  MySeries,
  MyCars,
  MyTracks,
  ShopGuide,
  About,
}

export const useUiStore = create(() => ({
  selectedPage: ETabs.MySeason,
}));

export const useUiStorePersist = create(
  persist(
    () => ({
      seasonShowReorder: false,
      seasonShowCheckboxes: false,
      seasonShowCarsDropdown: false,
      seasonHighlight: true,
      seasonShowWishlist: true,
      seasonShowOwned: true,
      seasonShowThisWeek: true,
      seasonCategory: ECarCategories.all,
      shopVolumeDiscount: true,
      shopLoyaltyDiscount: false,
    }),
    {
      name: "ui-settings",
    },
  ),
);

export const setSelectedPage = (index: ETabs) =>
  useUiStore.setState(() => ({ selectedPage: index }));

export const setSeasonShowReorder = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowReorder: value }));

export const setSeasonShowCheckboxes = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowCheckboxes: value }));

export const setSeasonShowCarsDropdown = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowCarsDropdown: value }));

export const setSeasonHighlight = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonHighlight: value }));

export const setSeasonShowWishlist = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowWishlist: value }));

export const setSeasonShowOwned = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowOwned: value }));

export const setSeasonShowThisWeek = (value: boolean) =>
  useUiStorePersist.setState(() => ({ seasonShowThisWeek: value }));

export const setSeasonCategory = (value: ECarCategories) =>
  useUiStorePersist.setState(() => ({ seasonCategory: value }));

export const setShopVolumeDiscount = (value: boolean) =>
  useUiStorePersist.setState(() => ({ shopVolumeDiscount: value }));

export const setShopLoyaltyDiscount = (value: boolean) =>
  useUiStorePersist.setState(() => ({ shopLoyaltyDiscount: value }));

export const useUi = () => {
  const selectedPage = useUiStore((state) => state.selectedPage);
  const seasonShowReorder = useUiStorePersist(
    (state) => state.seasonShowReorder,
  );
  const seasonShowCheckboxes = useUiStorePersist(
    (state) => state.seasonShowCheckboxes,
  );
  const seasonShowCarsDropdown = useUiStorePersist(
    (state) => state.seasonShowCarsDropdown,
  );
  const seasonHighlight = useUiStorePersist((state) => state.seasonHighlight);
  const seasonShowWishlist = useUiStorePersist(
    (state) => state.seasonShowWishlist,
  );
  const seasonShowOwned = useUiStorePersist((state) => state.seasonShowOwned);
  const seasonShowThisWeek = useUiStorePersist(
    (state) => state.seasonShowThisWeek,
  );
  const seasonCategory = useUiStorePersist((state) => state.seasonCategory);
  const shopVolumeDiscount = useUiStorePersist(
    (state) => state.shopVolumeDiscount,
  );
  const shopLoyaltyDiscount = useUiStorePersist(
    (state) => state.shopLoyaltyDiscount,
  );

  return {
    selectedPage,
    seasonShowReorder,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowThisWeek,
    seasonCategory,
    shopVolumeDiscount,
    shopLoyaltyDiscount,
  };
};
