import { useSWRConfig } from "swr";
import { ItemCreateBody } from "types/prisma";
import { createItem, deleteItem } from "utils/fetch-helpers";
import { getAllItemsKey } from "utils/swr-keys";

export const useDeleteItem = () => {
  const { mutate } = useSWRConfig();
  return (itemId: string) => mutate(getAllItemsKey(), deleteItem(itemId));
};

export const useCreateItem = () => {
  const { mutate } = useSWRConfig();
  return (itemData: ItemCreateBody) => mutate(getAllItemsKey(), createItem(itemData));
};
