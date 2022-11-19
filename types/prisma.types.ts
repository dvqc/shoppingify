import { Prisma } from "@prisma/client";

const itemBody = Prisma.validator<Prisma.ItemArgs>()({
  select: {
    name: true,
    note: true,
    image: true,
    categoryId: true
  }
});

const itemData = Prisma.validator<Prisma.ItemArgs>()({
  include: {
    category: true
  }
});
type ItemData = Prisma.ItemGetPayload<typeof itemData>;

type ItemBody = Prisma.ItemGetPayload<typeof itemBody>;

const listBody = Prisma.validator<Prisma.ListArgs>()({
  select: {
    name: true
  }
});
type ListBody = Prisma.ListGetPayload<typeof listBody>;

export type { ItemData, ItemBody, ListBody };
