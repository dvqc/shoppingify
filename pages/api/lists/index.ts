import type { NextApiRequest, NextApiResponse } from "next/types";
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
import { CreateListDTO } from "validators";
import { listData } from "types/prisma.types";

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
        createdBy: user.id,
        listItems: {
          create: listItems
        }
      }
    });
    return list;
  }

  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const lists = await prisma.list.findMany({
      ...listData,
      where: {
        createdBy: user.id
      }
    });
    return lists;
  }
}
export default createHandler(ListsHandler);
