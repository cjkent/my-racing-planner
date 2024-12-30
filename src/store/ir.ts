import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IMyContentStore {
  myCars: number[];
  myTracks: number[];
  wishCars: number[];
  wishTracks: number[];
  favoriteCars: number[];
  favoriteTracks: number[];
  favoriteSeries: number[];
}

export const useIrStore = create(
  persist<IMyContentStore>(
    () => ({
      myCars: [],
      myTracks: [],
      wishCars: [],
      wishTracks: [],
      favoriteCars: [],
      favoriteTracks: [],
      favoriteSeries: [],
    }),
    { name: "my-content" },
  ),
);

export const setMyCar = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    myCars: enabled
      ? [...state.myCars, id]
      : state.myCars.filter((car: number) => car !== id),
  }));

export const setMyTrack = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    myTracks: enabled
      ? [...state.myTracks, id]
      : state.myTracks.filter((track: number) => track !== id),
  }));

export const setWishCar = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    wishCars: enabled
      ? [...state.wishCars, id]
      : state.wishCars.filter((car: number) => car !== id),
  }));

export const setWishTrack = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    wishTracks: enabled
      ? [...state.wishTracks, id]
      : state.wishTracks.filter((track: number) => track !== id),
  }));

export const setFavoriteCar = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    favoriteCars: enabled
      ? [...state.favoriteCars, id]
      : state.favoriteCars.filter((car: number) => car !== id),
  }));

export const setFavoriteTrack = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    favoriteTracks: enabled
      ? [...state.favoriteTracks, id]
      : state.favoriteTracks.filter((track: number) => track !== id),
  }));

export const setFavoriteSeriesItem = (id: number, enabled: boolean) =>
  useIrStore.setState((state: IMyContentStore) => ({
    favoriteSeries: enabled
      ? [...state.favoriteSeries, id]
      : state.favoriteSeries.filter((series: number) => series !== id),
  }));

export const useIr = () => {
  const myCars = useIrStore((state) => state.myCars);
  const myTracks = useIrStore((state) => state.myTracks);
  const wishCars = useIrStore((state) => state.wishCars);
  const wishTracks = useIrStore((state) => state.wishTracks);
  const favoriteCars = useIrStore((state) => state.favoriteCars);
  const favoriteTracks = useIrStore((state) => state.favoriteTracks);
  const favoriteSeries = useIrStore((state) => state.favoriteSeries);

  return {
    myCars,
    myTracks,
    wishCars,
    wishTracks,
    favoriteCars,
    favoriteTracks,
    favoriteSeries,
  };
};
