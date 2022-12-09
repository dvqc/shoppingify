import prisma from "lib/prisma";
import { Body, createHandler, HttpCode, Post, Req, ValidationPipe } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { BasicHandler, getUser } from "utils/api-helpers";
import { ListItemCreateDTO } from "validators";

// POST /api/listItems
class ListItemsHandler extends BasicHandler {
  @Post()
  @HttpCode(201)
  async post(
    @Body(ValidationPipe({ whitelist: true }))
    body: ListItemCreateDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);

    const listItem = prisma.listItem.create({
      data: {
        ...body
      }
    });
    return listItem;
  }
}
export default createHandler(ListItemsHandler);
