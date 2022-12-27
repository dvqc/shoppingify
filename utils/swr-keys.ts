/************ Items keys ************/

export const getAllItemsKey = () => {
  return `/api/items`;
};

export const getItemKey = (id: string) => {
  return `/api/items/${id}`;
};

/************ ListItems keys ************/

export const getListItemKey = (id: string) => {
  return `/api/listItems/${id}`;
};

export const getListItemByRelsKey = (listId: string, itemId: string) => {
  return `/api/listItems/${listId}/${itemId}`;
};

/************ Lists keys ************/

export const getListsKey = () => {
  return `/api/lists`;
};

export const getListKey = (id: string) => {
  return `/api/lists/${id}`;
};

export const getActiveListKey = (expand?: boolean) => {
  return `/api/lists/active${expand ? "?expand=true" : ""}`;
};

export const getActiveListItemsKey = (expand?: boolean) => {
  return `/api/lists/active/listItems${expand ? "?expand=true" : ""}`;
};

export const getActiveListItemKey = (id: string, expand?: boolean) => {
  return `/api/lists/active/listItems/${id}${expand ? "?expand=true" : ""}`;
};

/************ Categories keys ************/

export const getCategoriesKey = () => {
  return `/api/categories`;
};
