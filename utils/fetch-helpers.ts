import { ListDataExpanded, ListItemUpdateBody, ListUpdateBody } from "types/prisma";
import { getListItemKey, getListKey } from "./swr-keys";

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.message = await res.json();
    throw error;
  }

  return res.json();
};

const updateList = async (id: string, payload: ListUpdateBody) => {
  const data: ListDataExpanded = await fetcher(getListKey(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

const updateListItem = async (id: string, payload: ListItemUpdateBody) =>
  await fetcher(getListItemKey(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

export { fetcher, updateList, updateListItem };
