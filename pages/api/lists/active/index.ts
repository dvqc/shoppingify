import prisma from "lib/prisma";
import { createHandler, Get, Req } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData } from "types/prisma.types";
import { BasicHandler, getUser } from "utils/helpers";

// GET /api/lists/active
class ActiveListHandler extends BasicHandler {
  @Get()
  async get(@Req() req: NextApiRequest) {
    const user = await getUser(req);
    const activeList = await prisma.list.findFirst({
      ...listData,
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
