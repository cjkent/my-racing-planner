import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "wouter";

type TScrollContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const ScrollContext = createContext<TScrollContext>(
  {} as TScrollContext,
);

function ScrollContextProvider({ children }: PropsWithChildren) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setScrolled(false);
  }, [location]);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrolled(scrolled ? scrollTop > 0 : scrollTop > 200);
  };

  return (
    <ScrollContext.Provider value={{ scrolled, onScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollContextProvider;
