/************ Items keys ************/

export const getAllItemsKey = () => {
  return `api/items`;
};

/************ Lists keys ************/
export const getListItemKey = (id: string) => {
  return `api/listItems/${id}`;
};

export const getListKey = (id: string) => {
  return `/api/lists/${id}`;
};

export const getActiveListKey = (expand?: boolean) => {
  return `/api/lists/active${expand ? "?expand=true" : ""}`;
};

/************ Categories keys ************/

export const getCategoriesKey = () => {
  return `/api/categories`;
};
