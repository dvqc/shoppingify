export const sideBarStates = ["list", "add", "info"] as const;

export type SideBarStates = typeof sideBarStates[number];

interface Props {
  children?: React.ReactNode;
  sideBarId: SideBarStates;
}

export interface SideBarElement extends JSX.Element {
  sideBarId: SideBarStates;
}

export type SideBarCompFunc = (props: Props) =>  JSX.Element;
