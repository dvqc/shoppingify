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
  include: {
    category: true
  }
});
type ItemData = Prisma.ItemGetPayload<typeof itemData>;

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

const listItemData = Prisma.validator<Prisma.ListItemArgs>()({
  select: {
    itemId: true,
    qty: true
  }
});
type ListItem = Prisma.ListItemGetPayload<typeof listItemData>;

const listRes = Prisma.validator<Prisma.ListArgs>()({
  select: {
    id: true,
    name: true,
    createdBy: true,
    listItems: {
      select: {
        item: {
          include: {
            category: true
          }
        },
        qty: true
      }
    }
  }
});
export type { ItemData, ItemBody, ListBody, ListItem };
export { listRes };
