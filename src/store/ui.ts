import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum ETabs {
  MySeries = 0,
  MyCars = 1,
  MyTracks = 2,
  Settings = 3,
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
