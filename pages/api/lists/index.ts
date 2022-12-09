import prisma from "lib/prisma";
import { Body, createHandler, Get, HttpCode, Post, Query, Req, ValidationPipe } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData, listDataExpanded } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { CreateListDTO } from "validators";

// GET,POST /api/lists
class ListsHandler extends BasicHandler {
  @Post()
  @HttpCode(201)
  async post(
    @Body(ValidationPipe({ whitelist: true }))
    body: CreateListDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);
    const { name, listItems } = body;

    const list = prisma.list.create({
      data: {
        name: name,
        user: {
          connect: { id: user.id }
        },
        listItems: {
          create: listItems
        }
      }
    });
    return list;
  }

  @Get()
  async get(@Req() req: NextApiRequest, @Query("expand") expand?: boolean) {
    const user = await getUser(req);
    const fields = !expand ? listData : listDataExpanded;
    const lists = await prisma.list.findMany({
      ...fields,
      where: {
        user: {
          id: user.id
        }
      }
    });
    return lists;
  }
}
export default createHandler(ListsHandler);
