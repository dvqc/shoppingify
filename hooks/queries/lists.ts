import useSWR from "swr";
import { ListData, ListDataExpanded } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getActiveListKey, getListKey, getListsKey } from "utils/swr-keys";

export const useLists = () => useSWR<ListData[]>(getListsKey(), fetcher);

export const useList = (id: string) => useSWR<ListData>(getListKey(id), fetcher);

export const useListExpanded = (id: string) => useSWR<ListDataExpanded>(getListKey(id, true), fetcher);

export const useActiveList = () => useSWR<ListData>(getActiveListKey(), fetcher);

export const useActiveListExpanded = () =>
  useSWR<ListDataExpanded>(getActiveListKey(true), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });
