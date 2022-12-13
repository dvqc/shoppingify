import useSwr from "swr";
import { ItemData } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getAllItemsKey, getItemKey } from "utils/swr-keys";

export const useItems = () =>
  useSwr<ItemData[]>(getAllItemsKey(), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });

export const useItem = (id: string) =>
  useSwr<ItemData>(getItemKey(id), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });
