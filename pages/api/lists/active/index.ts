import prisma from "lib/prisma";
import { createHandler, Get, NotFoundException, Query, Req } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData, listDataExpanded } from "types/prisma.types";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { BasicHandler, getUser } from "utils/api-helpers";

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
    if (!activeList) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
    return activeList;
  }
}
export default createHandler(ActiveListHandler);
