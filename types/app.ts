export const sideBarStates = ["list", "add", "info"] as const;

export type SideBarStates = typeof sideBarStates[number];
