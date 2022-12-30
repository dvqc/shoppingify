import { NotFoundError } from "@prisma/client/runtime";
import { isMongoId } from "class-validator";
import type { NextApiRequest } from "next";
import { createHandler, Delete, Get, NotFoundException, Req } from "next-api-decorators";
import { listItemData } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";

class ListItemIdsHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest) {
    await getUser(req);
    const { params } = req.query;

    if (!params || !(params instanceof Array) || params.length != 2)
      throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const [listId, itemId] = params;

    if (!isMongoId(listId) || !isMongoId(itemId)) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const listItem = await prisma.listItem
      .findUniqueOrThrow({
        ...listItemData,
        where: {
          itemId_listId: { itemId, listId }
        }
      })
      .catch((err) => {
        if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
        console.log(err.message);
        throw err;
      });

    return listItem;
  }

  @Delete()
  async delete(@Req() req: NextApiRequest) {
    await getUser(req);
    const { params } = req.query;

    if (!params || !(params instanceof Array) || params.length != 2)
      throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const [listId, itemId] = params;

    if (!isMongoId(listId) || !isMongoId(itemId)) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const listItem = await prisma.listItem
      .delete({
        ...listItemData,
        where: {
          itemId_listId: { itemId, listId }
        }
      })
      .catch((err) => {
        if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
        throw err;
      });

    return listItem;
  }
}
export default createHandler(ListItemIdsHandler);
