import useSWR from "swr";
import { ListData, ListDataExpanded } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getActiveListKey } from "utils/swr-keys";

export const useActiveList = () => useSWR<ListData>(getActiveListKey(), fetcher);

export const useActiveListExpanded = () => useSWR<ListDataExpanded>(getActiveListKey(true), fetcher);
