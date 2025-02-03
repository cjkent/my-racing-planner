import useScreenSize, { TScreenSize } from "@/hooks/useScreenSize";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "wouter";

type TAppLayoutContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
  screen: TScreenSize;
};

export const AppLayoutContext = createContext<TAppLayoutContext>(
  {} as TAppLayoutContext,
);

function AppLayoutContextProvider({ children }: PropsWithChildren) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const screen = useScreenSize();

  useEffect(() => {
    setScrolled(false);
  }, [location]);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrolled(scrolled ? scrollTop > 0 : scrollTop > 200);
  };

  return (
    <AppLayoutContext.Provider value={{ scrolled, onScroll, screen }}>
      {children}
    </AppLayoutContext.Provider>
  );
}

export default AppLayoutContextProvider;
