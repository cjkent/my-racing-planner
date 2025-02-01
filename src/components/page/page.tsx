import { Flex, FlexProps } from "@chakra-ui/react";
import { createContext } from "react";

export type TPageContext = {
  scrolled: boolean;
  onScroll: React.UIEventHandler<HTMLDivElement>;
};

export const PageContext = createContext<TPageContext>({} as TPageContext);

function Page({ ...props }: FlexProps) {
  return <Flex direction="column" height="100%" width="100%" {...props} />;
}

export default Page;
