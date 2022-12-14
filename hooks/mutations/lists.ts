import { ListDataExpanded } from "types/prisma";
import { addItemToActiveList, createList, updateListItem } from "utils/fetch-helpers";
import { useActiveListExpanded, useListItemByRelIds } from "../queries";

export const useAddItemToActiveList = (itemId: string) => {
  const { data: activeList, mutate: mutateActiveList } = useActiveListExpanded();
  const {
    data: activeListItem,
    mutate: mutateActiveListItem,
    error: listItemErr
  } = useListItemByRelIds(activeList ? activeList?.id : "", itemId);

  const addItem = async () => {
    let resActivelist: ListDataExpanded | undefined;
    if (!activeList) {
      resActivelist = await mutateActiveList(createList({ name: "Shopping list", listItems: [] }), {
        optimisticData: { id: "", createdAt: null, createdBy: "", name: "Shopping list", listItems: [] }
      });
    }
    if ((resActivelist || activeList) && activeListItem)
      await mutateActiveListItem(updateListItem(activeListItem.id, { qty: activeListItem.qty + 1 }));
    else await mutateActiveList(addItemToActiveList({ itemId: itemId, qty: 1 }));
  };
  return addItem;
};

