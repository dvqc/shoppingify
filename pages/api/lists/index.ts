import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "lib/prisma";
import type { ListBody } from "types/prisma.types";
import {
  Body,
  createHandler,
  Get,
  HttpCode,
  Post,
  Req
} from "next-api-decorators";
import { getUser } from "utils/helpers";

// GET,POST /api/lists
class ListsHandler {
  @Post()
  @HttpCode(201)
  async create(@Body() body: ListBody, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    const { name } = body;
    const item = prisma.list.create({
      data: {
        name: name,
        createdBy: user.id
      }
    });
    return item;
  }

  @Get()
  async getItems(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const items = await prisma.list.findMany({
      select: {
        name: true,
        createdAt: true,
        listItems: {
          select: {
            item: {
              select: {
                name: true,
                category: {
                  select: {
                    label: true
                  }
                }
              }
            },
            qty: true
          }
        }
      },
      where: {
        createdBy: user.id
      }
    });
    return items;
  }
}
export default createHandler(ListsHandler);
