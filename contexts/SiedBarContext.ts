import { createContext } from "react";
import { SideBarStates } from "types/app";

const SideBarContext = createContext<{
  sideBarShown: boolean;
  setSideBarShown: (sideBarShown: boolean) => void;
  sideBarTab: SideBarStates;
  setSideBarTab: (sideBarTab: SideBarStates) => void;
}>({
  sideBarShown: true,
  setSideBarShown: (sideBarShown: boolean) => {},
  sideBarTab: "list",
  setSideBarTab: (sideBarTab: SideBarStates) => {}
});

export default SideBarContext;
