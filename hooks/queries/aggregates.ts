import useSwr from "swr";
import { ListItemsCount, ListItemsMonthCount } from "types/app";
import { fetcher } from "utils/fetch-helpers";
import { getListItemsCounts } from "utils/swr-keys";

export const useListItemsCounts = () =>
  useSwr<ListItemsCount[]>(getListItemsCounts(), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });

export const useListItemsCountsByMonth = (byMonth: number) =>
  useSwr<ListItemsMonthCount[]>(getListItemsCounts(byMonth), fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    errorRetryCount: 1,
    revalidateOnFocus: false
  });
