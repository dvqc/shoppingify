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