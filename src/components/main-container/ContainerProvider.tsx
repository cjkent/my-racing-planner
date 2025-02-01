import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";

export type TContainerContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const ContainerContext = createContext<TContainerContext>(
  {} as TContainerContext,
);

function ContainerProvider({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setScrolled(false);
  }, [location]);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrolled?.(scrolled ? scrollTop > 0 : scrollTop > 150);
  };

  const value = {
    scrolled,
    onScroll,
  };

  return (
    <ContainerContext.Provider value={value}>
      {children}
    </ContainerContext.Provider>
  );
}

export default ContainerProvider;
