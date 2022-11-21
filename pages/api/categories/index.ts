import prisma from "lib/prisma";
import { createHandler, Get, Req } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { BasicHandler, getUser } from "utils/helpers";

// GET /api/categories
class CategoriesHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest) {
    await getUser(req);
    const categories = await prisma.category.findMany({});
    return categories;
  }
}
export default createHandler(CategoriesHandler);
