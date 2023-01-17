import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest } from "next";
import {
  Body,
  ConflictException,
  createHandler,
  Delete,
  NotFoundException,
  Post,
  Query,
  Req,
  ValidationPipe
} from "next-api-decorators";
import { listData, listDataExpanded } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { ListItemCreateDTO } from "validators";
import prisma from "lib/prisma";

class ActiveListItemsHandler extends BasicHandler {
  @Post()
  async post(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe({ whitelist: true }))
    body: ListItemCreateDTO,
    @Query("expand") expand?: boolean
  ) {
    const user = await getUser(req);
    const { slug } = req.query;

    if (!slug || (slug instanceof Array && slug.length > 1) || slug[0] != "listItems")
      throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const fields = !expand ? listData : listDataExpanded;
    const activeList = await prisma.list.findFirst({
      ...fields,
      where: {
        user: {
          id: user.id
        },
        status: "ACTIVE"
      }
    });
    if (!activeList) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    try {
      await prisma.listItem.create({
        data: { ...body, listId: activeList.id }
      });
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ConflictException(HTTP_ERROR_MESSAGES[409]);
        }
      }
    }

    const updatedActiveList = await prisma.list.findFirst({
      ...fields,
      where: {
        id: activeList.id
      }
    });

    return updatedActiveList;
  }

  @Delete()
  async delete(@Req() req: NextApiRequest, @Query("expand") expand?: boolean) {
    const user = await getUser(req);
    const { slug } = req.query;

    if (!slug || (slug instanceof Array && slug.length > 2) || slug[0] != "listItems")
      throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const fields = !expand ? listData : listDataExpanded;
    const activeList = await prisma.list.findFirst({
      ...fields,
      where: {
        user: {
          id: user.id
        },
        status: "ACTIVE"
      }
    });
    if (!activeList) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

    const updatedActiveList = await prisma.list
      .update({
        data: {
          listItems: {
            delete: [{ id: slug[1] }]
          }
        },
        where: {
          id: activeList.id
        }
      })
      .catch((err: unknown) => {
        if (err instanceof PrismaClientKnownRequestError)
          if (err.code == "P2017") throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
        throw err;
      });

    return updatedActiveList;
  }
}
export default createHandler(ActiveListItemsHandler);
