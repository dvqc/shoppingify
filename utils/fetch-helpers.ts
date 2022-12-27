import {
  ItemCreateBody,
  ItemData,
  ListCreateBody,
  ListDataExpanded,
  ListItemBody,
  ListItemData,
  ListItemUpdateBody,
  ListUpdateBody
} from "types/prisma";
import {
  getActiveListItemKey,
  getActiveListItemsKey,
  getActiveListKey,
  getAllItemsKey,
  getItemKey,
  getListItemKey,
  getListKey,
  getListsKey
} from "./swr-keys";

export const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  const url = input.toString().startsWith("/") ? window.location.origin + input : input;
  const res = await fetch(url, init);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = await res.json();
    throw error;
  }

  return res.json();
};

/************ Lists functions ************/

export const createList = async (payload: ListCreateBody) => {
  const data: ListDataExpanded = await fetcher(getListsKey(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

export const updateList = async (id: string, payload: ListUpdateBody) => {
  const data: ListDataExpanded = await fetcher(getListKey(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

export const updateActiveList = async (payload: ListUpdateBody) => {
  const data: ListDataExpanded = await fetcher(getActiveListKey(true), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

export const addItemToActiveList = async (payload: ListItemBody) => {
  const data: ListDataExpanded = await fetcher(getActiveListItemsKey(true), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

export const removeItemFromActiveList = async (id: string) => {
  const data: ListDataExpanded = await fetcher(getActiveListItemKey(id, true), {
    method: "DELETE"
  });
  return data;
};

/************ ListItems functions ************/

export const updateListItem = async (id: string, payload: ListItemUpdateBody) => {
  const data: ListItemData = await fetcher(getListItemKey(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

/************ Items functions ************/

export const createItem = async (payload: ItemCreateBody) => {
  const data: ItemData = await fetcher(getAllItemsKey(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return data;
};

export const deleteItem = async (id: string) => {
  const data: ItemData = await fetcher(getItemKey(id), {
    method: "DELETE"
  });
  return data;
};
