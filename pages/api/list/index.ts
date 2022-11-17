import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "lib/prisma";

// GET,POST /api/list

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {}
