import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ItemCreateBody } from "./prisma";

export const sideBarStates = ["list", "add", "info"] as const;

export type SideBarStates = typeof sideBarStates[number];

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export interface SelectProps extends InputProps {
  options: string[];
  onOption: (newValue: string) => void;
}

export interface AddItemFormActionI {
  type: keyof ItemCreateBody | "reset";
  value: string;
}

export interface ListItemsCount {
  itemId: string;
  count: number;
}

export interface ListItemsCountByMonth {
  month:  "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  count: number;
}
