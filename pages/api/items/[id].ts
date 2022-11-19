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
// GET,DELETE /api/items/:id
class ItemHandler extends BasicHandler {
  @Delete()
  async delete(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    try {
      const itemToDelete = await prisma.item.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      if (user.id != itemToDelete.createdBy)
        throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      await prisma.item.delete({
        where: {
          id: id
        }
      });
      return itemToDelete;
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
      const item = await prisma.item.findUniqueOrThrow({
        select: {
          id: true,
          name: true,
          category: true,
          image: true,
          note: true,
          createdBy: true
        },
        where: {
          id: id
        }
      });
      if (user.id != item.createdBy)
        throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      return item;
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(ItemHandler);
