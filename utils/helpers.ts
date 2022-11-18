import type { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { HTTP_ERROR_MESSAGES } from "utils/constants";
import { UnauthorizedException } from "next-api-decorators";

const validateString = (str: string | undefined | null | string[]) => {
  if (!str || str == undefined || str == "") return false;
  return true;
};

const getUser = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  const user = session?.user;
  if (!session || !user || user == undefined)
    throw new UnauthorizedException(HTTP_ERROR_MESSAGES[401]);
  return user;
};

export { validateString, getUser };
