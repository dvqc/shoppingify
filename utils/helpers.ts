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

function isValidMonth(month: number): month is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(Number(month));
}

function getPercentage(qty: number, total: number) {
  return Math.round((qty / total) * 100);
}

export { afterAnimation, isValidMonth, getPercentage };
