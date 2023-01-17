import { NotFoundError } from "@prisma/client/runtime";
import groupBy from "lodash.groupby";
import type { NextApiRequest } from "next";
import { Get, Query, Req, NotFoundException, createHandler, BadRequestException } from "next-api-decorators";
import { ListItemsCount, ListItemsMonthCount } from "types/app";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { isValidMonth } from "utils/helpers";
import prisma from "lib/prisma";

class ListItemsCountHandler extends BasicHandler {
  @Get()
  async get(
    @Req() req: NextApiRequest,
    @Query("byMonth") byMonth?: number
  ): Promise<ListItemsCount[] | ListItemsMonthCount[]> {
    const user = await getUser(req);

    if (byMonth && (byMonth > 12 || byMonth < 1)) throw new BadRequestException(HTTP_ERROR_MESSAGES[400]);

    if (byMonth) {
      const allListItemsRaw = await prisma.listItem.findMany({
        select: {
          itemId: true,
          qty: true,
          list: {
            select: {
              createdAt: true
            }
          }
        },
        where: {
          list: {
            user: user,
            status: {
              not: "ACTIVE"
            },
            createdAt: {
              gt: new Date(new Date().setMonth(new Date().getMonth() - byMonth))
            }
          }
        }
      });
      const allListItems = allListItemsRaw.map((item) => {
        return { itemId: item.itemId, qty: item.qty, month: new Date(item.list.createdAt).getMonth() };
      });

      const itemsByMonth = groupBy(allListItems, (item) => item.month);
      const countsByMonth: ListItemsMonthCount[] = [];

      for (const [key, value] of Object.entries(itemsByMonth)) {
        const month = Number(key);
        if (isValidMonth(month)) {
          countsByMonth.push({
            month: month,
            count: value.reduce((total, item) => total + item.qty, 0)
          });
        }
      }
      return countsByMonth;
    }

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
      const listItemsCount = listItemsAggs.map((itemAgg) => {
        return {
          itemId: itemAgg.itemId,
          count: itemAgg._sum.qty ?? 0
        };
      });
      return listItemsCount;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(ListItemsCountHandler);
