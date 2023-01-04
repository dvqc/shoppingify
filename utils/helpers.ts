import { RefObject } from "react";

const afterAnimation = (ref: RefObject<HTMLElement>, callback: () => void) => {
  ref.current?.addEventListener("animationend", callback, {
    once: true
  });
};

export declare class HttpException extends Error {
  name: string;
  statusCode: number;
  errors?: string[];

  constructor(statusCode: number, message?: string, errors?: string[]);
}

function isValidMonth(
  month: string
): month is "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].includes(month);
}

export { afterAnimation, isValidMonth };
