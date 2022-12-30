import prisma from "lib/prisma";
import { Body, createHandler, Get, HttpCode, Post, Query, Req, ValidationPipe } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { itemData } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
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
  async get(@Req() req: NextApiRequest, @Query("category") category?: string) {
    await getUser(req);
    const items = await prisma.item.findMany({
      ...itemData,
      where: {
        ...(category && { category: { label: category } })
      }
    });
    return items;
  }
}
export default createHandler(ItemsHandler);
