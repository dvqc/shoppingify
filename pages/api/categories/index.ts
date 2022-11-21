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

// GET /api/categories
class CategoriesHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const categories = await prisma.category.findMany({
      include: { items: true }
    });
    return categories;
  }
}
export default createHandler(CategoriesHandler);
