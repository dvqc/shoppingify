import { useSWRConfig } from "swr";
import { deleteItem } from "utils/fetch-helpers";
import { getAllItemsKey } from "utils/swr-keys";

export const useDeleteItem = (itemId: string) => {
  const { mutate } = useSWRConfig();
  return () => mutate(getAllItemsKey(), deleteItem(itemId));
};
