import { NextApiRequest } from "next";
import { Delete, Get, HttpException, Patch, Post, Put, UnauthorizedException } from "next-api-decorators";
import { getSession } from "next-auth/react";
import { HTTP_ERROR_MESSAGES } from "./constants";

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
  if (!session || !user) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[401]);
  return user;
};

export { MethodNotAllowedException, BasicHandler, getUser };
