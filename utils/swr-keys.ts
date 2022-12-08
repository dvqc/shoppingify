const getListItemKey = (id: string) => {
  return `api/listItems/${id}`;
};

const getListKey = (id: string) => {
  return `/api/lists/${id}`;
};

const getCategoriesKey = () => {
  return `/api/categories`;
};

const getActiveListKey = (expand?: boolean) => {
  return `/api/lists/active${expand ? "?expand=true" : ""}`;
};

export { getListItemKey, getListKey, getActiveListKey, getCategoriesKey };
