import { useContext } from "react";
import { PageContext } from "./page";

export const usePageScroll = () => useContext(PageContext);
