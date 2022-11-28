import { NotFoundError } from "@prisma/client/runtime";
import prisma from "lib/prisma";
import { createHandler, Get, NotFoundException, Query, Req, UnauthorizedException } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listItemData } from "types/prisma.types";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { BasicHandler, getUser } from "utils/helpers";

// GET /api/listItems/:id
class ListItemHandler extends BasicHandler {
  @Get()
  async get(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    try {
      const listItemUser = await prisma.listItem.findUniqueOrThrow({
        select: {
          item: {
            select: {
              user: true
            }
          }
        },
        where: {
          id: id
        }
      });
      if (user.id != listItemUser.item.user.id) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      const listItem = await prisma.listItem.findUniqueOrThrow({
        ...listItemData,
        where: {
          id: id
        }
      });
      return listItem;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(ListItemHandler);
