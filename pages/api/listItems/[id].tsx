import { NotFoundError } from "@prisma/client/runtime";
import prisma from "lib/prisma";
import {
  Body,
  createHandler,
  Get,
  NotFoundException,
  Put,
  Query,
  Req,
  UnauthorizedException,
  ValidationPipe
} from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listItemData } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { listItemUpdateDTO } from "validators";

// GET /api/listItems/:id
class ListItemHandler extends BasicHandler {
  @Get()
  async get(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    try {
      const listItemUser = await prisma.listItem.findUniqueOrThrow({
        select: {
          item: true
        },
        where: {
          id: id
        }
      });
      if (user.id != listItemUser.item.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

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
  @Put()
  async put(
    @Query("id") id: string,
    @Body(ValidationPipe({ whitelist: true }))
    body: listItemUpdateDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);
    try {
      const listItemToUpdate = await prisma.listItem.findUniqueOrThrow({
        select: {
          item: true
        },
        where: {
          id: id
        }
      });
      if (user.id != listItemToUpdate.item.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      const listItem = await prisma.listItem.update({
        data: {
          ...body
        },
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
