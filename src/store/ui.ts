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
  persist(() => ({ selectedTab: ETabs.MyCars }), { name: "ui-settings" }),
);

const setSelectedTab = (index: ETabs) =>
  useUiStore.setState(() => ({ selectedTab: index }));

export const useUi = () => {
  const selectedTab = useUiStore((state) => state.selectedTab);

  return {
    selectedTab,
    setSelectedTab,
  };
};
