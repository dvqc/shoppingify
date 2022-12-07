import { RefObject } from "react";

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.message = await res.json();
    throw error;
  }

  return res.json();
};

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

export { fetcher, afterAnimation };
