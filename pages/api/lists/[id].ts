import { NotFoundError } from "@prisma/client/runtime";
import prisma from "lib/prisma";
import {
  Body,
  createHandler,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Put,
  Query,
  Req,
  UnauthorizedException,
  ValidationPipe
} from "next-api-decorators";
import type { NextApiRequest } from "next/types";
import { listData, listDataExpanded } from "types/prisma";
import { BasicHandler, getUser } from "utils/api-helpers";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { CreateListDTO, UpdateListDTO } from "validators";

// GET,DELETE /api/lists/:id
class ListHandler extends BasicHandler {
  @Delete()
  async delete(@Query("id") id: string, @Req() req: NextApiRequest) {
    const user = await getUser(req);
    try {
      const listToDelete = await prisma.list.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      if (user.id != listToDelete.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      await prisma.list.delete({
        where: {
          id: id
        }
      });
      return listToDelete;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }

  @Get()
  async get(@Query("id") id: string, @Req() req: NextApiRequest, @Query("expand") expand?: boolean) {
    const user = await getUser(req);
    const fields = !expand ? listData : listDataExpanded;

    try {
      const list = await prisma.list.findUniqueOrThrow({
        ...fields,
        where: {
          id: id
        }
      });
      if (user.id != list.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      return list;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }

  @Patch()
  async patch(
    @Query("id") id: string,
    @Body(ValidationPipe({ whitelist: true }))
    body: UpdateListDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);
    try {
      const listToUpdate = await prisma.list.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      if (user.id != listToUpdate.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      const list = await prisma.list.update({
        data: { ...body },
        where: {
          id: id
        }
      });

      return list;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }

  @Put()
  async put(
    @Query("id") id: string,
    @Body(ValidationPipe({ whitelist: true }))
    body: CreateListDTO,
    @Req() req: NextApiRequest
  ) {
    const user = await getUser(req);
    const { name, listItems } = body;
    try {
      const listToUpdate = await prisma.list.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      if (user.id != listToUpdate.createdBy) throw new UnauthorizedException(HTTP_ERROR_MESSAGES[403]);

      const list = await prisma.list.update({
        data: {
          name: name,
          listItems: {
            deleteMany: {},
            create: listItems
          }
        },
        where: {
          id: id
        }
      });

      return list;
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException(HTTP_ERROR_MESSAGES[404]);
      else throw err;
    }
  }
}
export default createHandler(ListHandler);
