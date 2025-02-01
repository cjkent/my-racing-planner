import { useContext } from "react";
import { ContainerContext } from "./ContainerProvider";

export const useContainer = () => useContext(ContainerContext);
