import { NotFoundError } from "@prisma/client/runtime";
import type { NextApiRequest } from "next";
import { Get, Req, NotFoundException, createHandler } from "next-api-decorators";
import { CategoryCount, ListItemsCount } from "types/app";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import prisma from "lib/prisma";

class CategoriesCountHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest): Promise<CategoryCount[]> {
    const user = await getUser(req);

    try {
      const allListItemsAgg = await prisma.listItem.aggregate({
        _sum: {
          qty: true
        },
        where: {
          list: {
            user: user,
            status: {
              not: "ACTIVE"
            }
          }
        }
      });
      const allListItemsCount = allListItemsAgg._sum.qty;

      if (allListItemsCount === null) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);

      const listItemsAggs = await prisma.listItem.groupBy({
        by: ["itemId"],
        _sum: {
          qty: true
        },
        where: {
          list: {
            user: user
          }
        },
        orderBy: {
          _sum: {
            qty: "desc"
          }
        }
      });
      const categoryCounts: CategoryCount[] = await Promise.all(
        listItemsAggs.map(async (itemAgg) => {
          return {
            categoryId: await prisma.item
              .findUniqueOrThrow({ where: { id: itemAgg.itemId } })
              .then((item) => item.categoryId),
            categoryName: await prisma.item
              .findUniqueOrThrow({ include: { category: true }, where: { id: itemAgg.itemId } })
              .then((item) => item.category.label),
            count: itemAgg._sum.qty ?? 0
          };
        })
      );
      return categoryCounts;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(CategoriesCountHandler);
