import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "lib/prisma";
import type { ListBody } from "types/prisma.types";
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
import { CreateListDTO } from "validators/list.validator";

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
    const listItemss = listItems.map((l) => {
      return { itemId: l.itemId, qty: parseInt(String(l.qty)) };
    });
    const list = prisma.list.create({
      data: {
        name: name,
        createdBy: user.id,
        listItems: {
          create: listItemss
        }
      }
    });
    return list;
  }

  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const lists = await prisma.list.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        listItems: {
          select: {
            id: true,
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
    return lists;
  }
}
export default createHandler(ListsHandler);
