import useSwr from "swr";
import { ListItemData } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getListItemKey } from "utils/swr-keys";

export const useListItem = (id: string) => useSwr<ListItemData>(getListItemKey(id), fetcher);
