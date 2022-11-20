import { Prisma } from "@prisma/client";

/******************** item types ********************/
const itemBody = Prisma.validator<Prisma.ItemArgs>()({
  select: {
    name: true,
    note: true,
    image: true,
    categoryId: true
  }
});

const itemData = Prisma.validator<Prisma.ItemArgs>()({
  select: {
    id: true,
    name: true,
    category: true,
    image: true,
    note: true,
    createdBy: true
  }
});

type ItemBody = Prisma.ItemGetPayload<typeof itemBody>;

/******************** list types *********************/
const listBody = Prisma.validator<Prisma.ListArgs>()({
  select: {
    name: true,
    listItems: {
      select: {
        itemId: true,
        qty: true
      }
    }
  }
});
type ListBody = Prisma.ListGetPayload<typeof listBody>;

const listItem = Prisma.validator<Prisma.ListItemArgs>()({
  select: {
    itemId: true,
    qty: true
  }
});
type ListItem = Prisma.ListItemGetPayload<typeof listItem>;

const listData = Prisma.validator<Prisma.ListArgs>()({
  select: {
    id: true,
    name: true,
    createdAt: true,
    createdBy: true,
    listItems: {
      select: {
        id: true,
        item: {
          select: {
            name: true,
            category: {
              select: {
                label: true
              }
            }
          }
        },
        qty: true
      }
    }
  }
});

export type { ItemBody, ListBody, ListItem };
export { listData, itemData };
