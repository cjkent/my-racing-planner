import { ECarCategories } from "@/ir-data/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ETabs {
  MySeason,
  MySeries,
  MyCars,
  MyTracks,
  ShopGuide,
  Wishlist,
  About,
  Settings,
}

export const useUiStore = create(
  persist(
    () => ({
      selectedPage: ETabs.MySeason,
      seasonShowCheckboxes: false,
      seasonShowCarsDropdown: false,
      seasonHighlight: false,
      seasonShowWishlist: true,
      seasonShowOwned: true,
      seasonShowThisWeek: true,
      seasonCategory: ECarCategories.all,
    }),
    {
      name: "ui-settings",
    },
  ),
);

export const setSelectedPage = (index: ETabs) =>
  useUiStore.setState(() => ({ selectedPage: index }));

export const setSeasonShowCheckboxes = (value: boolean) =>
  useUiStore.setState(() => ({ seasonShowCheckboxes: value }));

export const setSeasonShowCarsDropdown = (value: boolean) =>
  useUiStore.setState(() => ({ seasonShowCarsDropdown: value }));

export const setSeasonHighlight = (value: boolean) =>
  useUiStore.setState(() => ({ seasonHighlight: value }));

export const setSeasonShowWishlist = (value: boolean) =>
  useUiStore.setState(() => ({ seasonShowWishlist: value }));

export const setSeasonShowOwned = (value: boolean) =>
  useUiStore.setState(() => ({ seasonShowOwned: value }));

export const setSeasonShowThisWeek = (value: boolean) =>
  useUiStore.setState(() => ({ seasonShowThisWeek: value }));

export const setSeasonCategory = (value: ECarCategories) =>
  useUiStore.setState(() => ({ seasonCategory: value }));

export const useUi = () => {
  const selectedPage = useUiStore((state) => state.selectedPage);
  const seasonShowCheckboxes = useUiStore(
    (state) => state.seasonShowCheckboxes,
  );
  const seasonShowCarsDropdown = useUiStore(
    (state) => state.seasonShowCarsDropdown,
  );
  const seasonHighlight = useUiStore((state) => state.seasonHighlight);
  const seasonShowWishlist = useUiStore((state) => state.seasonShowWishlist);
  const seasonShowOwned = useUiStore((state) => state.seasonShowOwned);
  const seasonShowThisWeek = useUiStore((state) => state.seasonShowThisWeek);
  const seasonCategory = useUiStore((state) => state.seasonCategory);

  return {
    selectedPage,
    seasonShowCheckboxes,
    seasonShowCarsDropdown,
    seasonHighlight,
    seasonShowWishlist,
    seasonShowOwned,
    seasonShowThisWeek,
    seasonCategory,
  };
};
