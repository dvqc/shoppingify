import { Prisma } from "@prisma/client";

const itemBody = Prisma.validator<Prisma.ItemArgs>()({
  select: {
    name: true,
    note: true,
    image: true,
    categoryId: true
  }
});

type ItemBody = Prisma.ItemGetPayload<typeof itemBody>;

const listBody = Prisma.validator<Prisma.ListArgs>()({
  select: {
    name: true
  }
});
type ListBody = Prisma.ListGetPayload<typeof listBody>;

export type { ItemBody, ListBody };
