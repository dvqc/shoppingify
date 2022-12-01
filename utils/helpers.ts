import type { NextApiRequest } from "next";
import { Delete, Get, HttpException, Patch, Post, Put, UnauthorizedException } from "next-api-decorators";
import { getSession } from "next-auth/react";
import { RefObject } from "react";
import { HTTP_ERROR_MESSAGES } from "utils/constants";

class MethodNotAllowedException extends HttpException {
  public constructor(message: string = "Method Not Allowed") {
    super(405, message);
  }
}

const throwMethodNotAllowed = () => {
  throw new MethodNotAllowedException();
};

class BasicHandler {
  @Get()
  async get(...args: any[]): Promise<any> {
    throwMethodNotAllowed();
  }

  @Post()
  async post(...args: any[]): Promise<any> {
    throwMethodNotAllowed();
  }

  @Delete()
  async delete(...args: any[]): Promise<any> {
    throwMethodNotAllowed();
  }

  @Put()
  async put(...args: any[]): Promise<any> {
    throwMethodNotAllowed();
  }

  @Patch()
  async patch(...args: any[]): Promise<any> {
    throwMethodNotAllowed();
  }
}

const getUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  const user = session?.user;
  if (!session || !user || user == undefined) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[401]);
  return user;
};

const fetcher = async(input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const res = await fetch(input, init)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.message= await res.json()
    throw error
  }

  return res.json();
};

const afterAnimation = (ref: RefObject<HTMLElement>, callback: () => void) => {
  ref.current?.addEventListener("animationend", callback, {
    once: true
  });
};

export { BasicHandler, getUser, MethodNotAllowedException, throwMethodNotAllowed, fetcher, afterAnimation };
