import useSwr from "swr";
import { ListItemData } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getListItemByRelsKey, getListItemKey } from "utils/swr-keys";

export const useListItem = (id: string) =>
  useSwr<ListItemData>(getListItemKey(id), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });

export const useListItemByRelIds = (listId: string, itemId: string) =>
  useSwr<ListItemData>(getListItemByRelsKey(listId, itemId), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });
