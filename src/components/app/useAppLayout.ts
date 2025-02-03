import { useContext } from "react";
import { AppLayoutContext } from "./app-layout-context";

export const useAppLayout = () => useContext(AppLayoutContext);
