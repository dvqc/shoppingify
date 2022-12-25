import useSWR from "swr";
import { ListData, ListDataExpanded } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getActiveListKey, getListsKey } from "utils/swr-keys";

export const useActiveList = () => useSWR<ListData>(getActiveListKey(), fetcher);

export const useLists = () => useSWR<ListData[]>(getListsKey(), fetcher);

export const useActiveListExpanded = () =>
  useSWR<ListDataExpanded>(getActiveListKey(true), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });
