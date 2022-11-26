import { Prisma } from "@prisma/client";

/******************** category types ********************/
const categoryCreateBody = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    label: true
  }
});

type CategoryCreateBody = Prisma.CategoryGetPayload<typeof categoryCreateBody>;

const categoryData = Prisma.validator<Prisma.CategoryArgs>()({
  select: {
    id: true,
    label: true
  }
});

type CategoryData = Prisma.CategoryGetPayload<typeof categoryData>;

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

type ItemData = Prisma.ItemGetPayload<typeof itemData>;

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

const listItemBody = Prisma.validator<Prisma.ListItemArgs>()({
  select: {
    itemId: true,
    qty: true
  }
});

type ListItemBody = Prisma.ListItemGetPayload<typeof listItemBody>;

const listItemData = Prisma.validator<Prisma.ListItemArgs>()({
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
});

type ListItemData = Prisma.ListItemGetPayload<typeof listItemData>;

const listData = Prisma.validator<Prisma.ListArgs>()({
  select: {
    id: true,
    name: true,
    createdAt: true,
    createdBy: true,
    listItems: {
      ...listItemData
    }
  }
});
type ListData = Prisma.ListGetPayload<typeof listData>;

export type {
  ItemCreateBody,
  ListCreateBody,
  ListItemBody,
  ListItemData,
  ListUpdateBody,
  CategoryCreateBody,
  ItemData,
  CategoryData,
  ListData
};
export { listData, itemData, categoryData };
