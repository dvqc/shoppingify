import prisma from "lib/prisma";
import { createHandler, Get, Query, Req } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData, listDataExpanded } from "types/prisma.types";
import { BasicHandler, getUser } from "utils/helpers";

// GET /api/lists/active
class ActiveListHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest, @Query("expand") expand?: boolean) {
    const user = await getUser(req);
    const fields = !expand ? listData : listDataExpanded;
    const activeList = await prisma.list.findFirst({
      ...fields,
      where: {
        user: {
          id: user.id
        },
        status: "ACTIVE"
      }
    });
    return activeList;
  }
}
export default createHandler(ActiveListHandler);
