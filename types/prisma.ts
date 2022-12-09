import { Prisma } from "@prisma/client";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

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
/****************** listItem types *******************/
const listItemBody = Prisma.validator<Prisma.ListItemArgs>()({
  select: {
    itemId: true,
    qty: true
  }
});

type ListItemBody = Prisma.ListItemGetPayload<typeof listItemBody>;

const listItemUpdateBody = Prisma.validator<Prisma.ListItemArgs>()({
  select: {
    qty: true
  }
});
type ListItemUpdateBody = Prisma.ListItemGetPayload<typeof listItemUpdateBody>;

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
    name: true,
    status: true
  }
});

type ListUpdateBody = PartialBy<Prisma.ListGetPayload<typeof listUpdateBody>, "status" | "name">;

const listData = Prisma.validator<Prisma.ListArgs>()({
  select: {
    id: true,
    name: true,
    createdAt: true,
    createdBy: true,
    listItems: {
      select: {
        id: true
      }
    }
  }
});
type ListData = Prisma.ListGetPayload<typeof listData>;

const listDataExpanded = Prisma.validator<Prisma.ListArgs>()({
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
type ListDataExpanded = Prisma.ListGetPayload<typeof listDataExpanded>;

export type {
  ItemCreateBody,
  ListCreateBody,
  ListItemBody,
  ListItemData,
  ListUpdateBody,
  CategoryCreateBody,
  ItemData,
  CategoryData,
  ListData,
  ListDataExpanded,
  ListItemUpdateBody
};
export { listData, listDataExpanded, itemData, categoryData, listItemData, listItemUpdateBody };
