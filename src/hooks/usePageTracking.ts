import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";

export const usePageTracking = () => {
  const [location] = useLocation();
  const search = useSearch();

  useEffect(() => {
    window.gtag("event", "page_view", {
      page_path: location + search,
      page_search: search,
      page_hash: location,
    });
  }, [location, search]);
};
