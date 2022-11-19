import type { NextApiRequest } from "next/types";
import prisma from "lib/prisma";
import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Req,
  ValidationPipe
} from "next-api-decorators";
import { BasicHandler, getUser } from "utils/helpers";
import { CreateItemDTO } from "validators";

// GET,POST /api/items
class ItemsHandler extends BasicHandler {
  @HttpCode(201)
  @Post()
  async post(
    @Body(ValidationPipe({ whitelist: true }))
    body: CreateItemDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);
    const item = prisma.item.create({
      data: {
        ...body,
        createdBy: user.id
      }
    });
    return item;
  }

  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const items = await prisma.item.findMany({
      select: {
        id: true,
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
