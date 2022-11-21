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
import { itemData } from "types/prisma.types";

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
    const { category, ...rest } = body;
    const item = prisma.item.create({
      data: {
        ...rest,
        user: {
          connect: { id: user.id }
        },
        category: {
          connectOrCreate: {
            where: {
              label: category.label
            },
            create: {
              ...category
            }
          }
        }
      },
      ...itemData
    });
    return item;
  }

  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const items = await prisma.item.findMany({
      ...itemData,
      where: {
        createdBy: user.id
      }
    });
    console.log(user, items);
    return items;
  }
}
export default createHandler(ItemsHandler);
