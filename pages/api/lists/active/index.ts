import prisma from "lib/prisma";
import { Body, createHandler, Get, NotFoundException, Patch, Query, Req, ValidationPipe } from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData, listDataExpanded } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { UpdateListDTO } from "validators";

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

  @Patch()
  async patch(
    @Req() req: NextApiRequest,
    @Body(ValidationPipe({ whitelist: true }))
    body: UpdateListDTO,
    @Query("expand") expand?: boolean
  ) {
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
    const updatedActiveList = await prisma.list.update({
      data: { ...body },
      where: {
        id: activeList.id
      }
    });
    return updatedActiveList;
  }
}
export default createHandler(ActiveListHandler);
