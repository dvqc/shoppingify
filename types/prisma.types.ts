import { Prisma } from "@prisma/client";

/******************** category types ********************/
const categoryCreateBody = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    label: true
  }
});

type CategoryCreateBody = Prisma.CategoryGetPayload<typeof categoryCreateBody>;

/******************** item types ********************/
const itemCreateBody = Prisma.validator<Prisma.ItemArgs>()({
  select: {
    name: true,
    note: true,
    image: true,
    category: {
      select: {
        label: true
      }
    }
  }
});

type ItemCreateBody = Prisma.ItemGetPayload<typeof itemCreateBody>;

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

/******************** list types *********************/
const listCreateBody = Prisma.validator<Prisma.ListArgs>()({
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

type ListCreateBody = Prisma.ListGetPayload<typeof listCreateBody>;

const listUpdateBody = Prisma.validator<Prisma.ListArgs>()({
  select: {
    name: true
  }
});

type ListUpdateBody = Prisma.ListGetPayload<typeof listUpdateBody>;

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

export type { ItemCreateBody, ListCreateBody, ListItem, ListUpdateBody, CategoryCreateBody };
export { listData, itemData };
