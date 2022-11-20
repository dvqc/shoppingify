import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "lib/prisma";
import {
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Query,
  Req,
  UnauthorizedException
} from "next-api-decorators";
import { BasicHandler, getUser } from "utils/helpers";
import { NotFoundError } from "@prisma/client/runtime";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { listData } from "types/prisma.types";

// GET,DELETE /api/lists/:id
class ListHandler extends BasicHandler {
  @Delete()
  async delete(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    try {
      const listToDelete = await prisma.list.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      if (user.id != listToDelete.createdBy)
        throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      await prisma.list.delete({
        where: {
          id: id
        }
      });
      return listToDelete;
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }

  @Get()
  async get(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);

    try {
      const list = await prisma.list.findUniqueOrThrow({
      ...listData,
        where: {
          id: id
        }
      });
      if (user.id != list.createdBy)
        throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      return list;
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(ListHandler);
