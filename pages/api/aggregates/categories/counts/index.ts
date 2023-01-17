import { NotFoundError } from "@prisma/client/runtime";
import type { NextApiRequest } from "next";
import { Get, Req, NotFoundException, createHandler } from "next-api-decorators";
import { CategoryCount } from "types/app";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import prisma from "lib/prisma";
import groupBy from "lodash.groupby";

class CategoriesCountHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest): Promise<CategoryCount[]> {
    const user = await getUser(req);
    try {
      const listItems = await prisma.listItem.findMany({
        include: {
          item: {
            include: {
              category: true
            }
          }
        },
        where: {
          list: {
            user: user
          }
        }
      });

      const groupedListItems = groupBy(listItems, (listItem) => listItem.item.categoryId);
      const categoryCounts: CategoryCount[] = [];
      for (const [categoryId, listItems] of Object.entries(groupedListItems)) {
        const count = listItems.map((lisitem) => lisitem.qty).reduce((acc, curr) => acc + curr, 0);
        categoryCounts.push({ categoryId: categoryId, categoryName: listItems[0].item.category.label, count: count });
      }
      return categoryCounts;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(CategoriesCountHandler);
