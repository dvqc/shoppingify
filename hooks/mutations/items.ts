import { useItems } from "hooks/queries";
import { ItemCreateBody } from "types/prisma";
import { createItem, deleteItem } from "utils/fetch-helpers";

export const useDeleteItem = () => {
  const { mutate } = useItems();
  return async (itemId: string) => {
    await deleteItem(itemId);
    mutate();
  };
};

export const useCreateItem = () => {
  const { mutate } = useItems();
  return async (itemData: ItemCreateBody) => {
    const data = await createItem(itemData);
    await mutate();
    return data;
  };
};
