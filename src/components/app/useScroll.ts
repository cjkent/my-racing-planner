import { useContext } from "react";
import { ScrollContext } from "./scroll-context";

export const useScroll = () => useContext(ScrollContext);
