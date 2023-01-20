import { createContext } from "react";
import { SideBarStates } from "types/app";

const SideBarContext = createContext<{ sideBarTab: SideBarStates; setSideBarTab: (sideBarTab: SideBarStates) => void }>(
  { sideBarTab: "list", setSideBarTab: (sideBarTab: SideBarStates) => {} }
);

export default SideBarContext;
