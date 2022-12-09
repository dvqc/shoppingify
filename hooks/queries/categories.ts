import useSWR from "swr";
import { CategoryData } from "types/prisma";
import { fetcher } from "utils/fetch-helpers";
import { getCategoriesKey } from "utils/swr-keys";

export const useCategories = () => useSWR<CategoryData[]>(getCategoriesKey, fetcher);