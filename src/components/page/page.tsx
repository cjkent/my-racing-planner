import { Flex } from "@chakra-ui/react";
import { createContext, ReactNode, useState } from "react";

export type TPageContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const PageContext = createContext<TPageContext>({} as TPageContext);

function Page({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const scrollTop = event.currentTarget.scrollTop;
    setScrolled(scrolled ? scrollTop > 0 : scrollTop > 150);
  };

  return (
    <PageContext.Provider value={{ scrolled, onScroll }}>
      <Flex direction="column" height="100%" width="100%">
        {children}
      </Flex>
    </PageContext.Provider>
  );
}

export default Page;
