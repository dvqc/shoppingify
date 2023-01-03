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

export { afterAnimation };
