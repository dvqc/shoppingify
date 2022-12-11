import useSwr from "swr";
import { ListItemData } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getActiveListItemByRelsKey, getListItemKey } from "utils/swr-keys";

export const useListItem = (id: string) => useSwr<ListItemData>(getListItemKey(id), fetcher);

export const useListItemByRelIds = (listId: string, itemId: string) =>
  useSwr<ListItemData>(getActiveListItemByRelsKey(listId, itemId), fetcher);
