import { setContentStore } from "@/store/ir";
import { useMemo } from "react";
import { useSearch } from "wouter";

const removeQueryParams = () => {
  const url = window.location.pathname;
  window.history.replaceState(null, "", url);
};

function useContentTransfer() {
  const query = useSearch();

  const params = useMemo(() => {
    const urlSearchParams = new URLSearchParams(query);
    return Object.fromEntries(urlSearchParams);
  }, [query]);

  const hasNewData =
    !!query &&
    ("myCars" in params ||
      "myTracks" in params ||
      "wishCars" in params ||
      "wishTracks" in params ||
      "favoriteSeries" in params);

  const applyData = () => {
    if (!hasNewData) return;
    const myCars = params.myCars
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const myTracks = params.myTracks
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const wishCars = params.wishCars
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const wishTracks = params.wishTracks
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));
    const favoriteSeries = params.favoriteSeries
      ?.split("-")
      .filter(Boolean)
      .map((n) => parseInt(n));

    setContentStore({ myCars, myTracks, wishCars, wishTracks, favoriteSeries });
    removeQueryParams();
  };

  const ignoreData = () => {
    if (!hasNewData) return;
    removeQueryParams();
  };

  return { hasNewData, applyData, ignoreData };
}

export default useContentTransfer;
