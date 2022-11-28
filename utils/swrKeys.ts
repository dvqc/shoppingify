const getListItemKey = (id: string) => {
  return `api/listItems/${id}`;
};

const getListKey = (id: string) => {
  return `/api/lists/${id}`;
};

export { getListItemKey, getListKey };
