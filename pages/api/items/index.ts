import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "lib/prisma";
import {
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  Req
} from "next-api-decorators";
import type { ItemBody } from "types/prisma.types";
import { BasicHandler, getUser } from "utils/helpers";

// GET,POST /api/items
class ItemsHandler extends BasicHandler {
  @HttpCode(201)
  async post(@Body() body: ItemBody, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    const { name, note, image, categoryId } = body;
    const item = prisma.item.create({
      data: {
        name: name,
        note: note,
        image: image,
        categoryId: categoryId,
        createdBy: user.id
      }
    });
    return item;
  }

  @Get()
  async getItems(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const items = await prisma.item.findMany({
      select: {
        name: true,
        category: true,
        image: true,
        note: true
      },
      where: {
        createdBy: user.id
      }
    });
    return items;
  }
}
export default createHandler(ItemsHandler);
