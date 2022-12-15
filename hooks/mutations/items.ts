import { useItems } from "hooks/queries";
import { useSWRConfig } from "swr";
import { ItemCreateBody } from "types/prisma";
import { createItem, deleteItem } from "utils/fetch-helpers";
import { getAllItemsKey } from "utils/swr-keys";

export const useDeleteItem = () => {
  const { mutate } = useItems();
  return async (itemId: string) => {
    await deleteItem(itemId)
    mutate();}
};

export const useCreateItem = () => {
  const { mutate } = useItems();
  return async (itemData: ItemCreateBody) => {
    await createItem(itemData);
    mutate();
  };
};
