import { NextApiRequest } from "next";
import { HttpException, Get, Post, Delete, Put, Patch, UnauthorizedException } from "next-api-decorators";
import { getSession } from "next-auth/react";
import { ListItemUpdateBody, ListUpdateBody } from "types/prisma.types";
import { HTTP_ERROR_MESSAGES } from "./constants";
import { fetcher } from "./helpers";

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

const updateList = async (url: string, payload: ListUpdateBody) => {
  await fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch((err) => console.log(err));
};

const updateListItem = async (url: string, payload: ListItemUpdateBody) =>
  await fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch((err) => console.log(err));

export { updateList, updateListItem, MethodNotAllowedException, BasicHandler,getUser};
