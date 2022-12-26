import { ListDataExpanded } from "types/prisma";
import { addItemToActiveList, createList, updateListItem } from "utils/fetch-helpers";
import { useActiveListExpanded, useListItemByRelIds } from "../queries";

export const useAddItemToActiveList = (itemId: string) => {
  const { data: activeList, mutate: mutateActiveList } = useActiveListExpanded();

  const conditionToQuery = activeList && activeList.listItems?.find((listItem) => listItem.id === itemId);
  const {
    data: activeListItem,
    mutate: mutateActiveListItem,
    error: listItemErr
  } = useListItemByRelIds(conditionToQuery ? activeList.id : undefined, itemId);

  const addItem = async () => {
    let resActivelist: ListDataExpanded | undefined;
    if (!activeList) {
      resActivelist = await mutateActiveList(createList({ name: "Shopping list", listItems: [] }), {
        optimisticData: {
          id: "",
          createdAt: new Date(),
          createdBy: "",
          name: "Shopping list",
          status: "ACTIVE",
          listItems: []
        }
      });
    }
    if ((resActivelist || activeList) && activeListItem)
      await mutateActiveListItem(updateListItem(activeListItem.id, { qty: activeListItem.qty + 1 }));
    else await mutateActiveList(addItemToActiveList({ itemId: itemId, qty: 1 }));
  };
  return addItem;
};
