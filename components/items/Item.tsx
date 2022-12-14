import { DetailsItemContext, SideBarContext } from "contexts";
import { useActiveListExpanded, useListItemByRelIds } from "hooks/queries";
import { useContext } from "react";
import { ItemData, ListDataExpanded } from "types/prisma";
import { addItemToActiveList, createList, updateListItem } from "utils/fetch-helpers";

const Item = ({ item }: { item: ItemData }) => {
  const { data: activeList, mutate: mutateActiveList } = useActiveListExpanded();
  const {
    data: activeListItem,
    mutate: mutateActiveListItem,
    error: listItemErr
  } = useListItemByRelIds(activeList ? activeList?.id : "", item.id);

  const { setItemId } = useContext(DetailsItemContext);
  const { setSideBarTab } = useContext(SideBarContext);

  return (
    <div
      className="w-44 h-16 px-4 py-3 flex flex-row justify-between items-center bg-white 
      rounded-xl shadow-base cursor-pointer hover:border-yellow1 hover:border-2 ease-in duration-150"
      onClick={() => {
        setItemId(item.id);
        setSideBarTab("info");
      }}
    >
      <h3 className="m-0 p-0 w-28 text-base font-medium break-words">{item.name}</h3>
      <button
        className="block h-7 w-7 outline-none border-none bg-[url('/images/add.svg')] bg-no-repeat 
      bg-center bg-[length:60%_60%] rounded-lg hover:bg-gray-100 ease-in duration-200"
        onClick={async () => {
          let resActivelist: ListDataExpanded | undefined;
          if (!activeList) {
            resActivelist = await mutateActiveList(createList({ name: "Shopping list", listItems: [] }), {
              optimisticData: { id: "", createdAt: null, createdBy: "", name: "Shopping list", listItems: [] }
            });
          }
          if ((resActivelist || activeList) && activeListItem)
            await mutateActiveListItem(updateListItem(activeListItem.id, { qty: activeListItem.qty + 1 }));
          else await mutateActiveList(addItemToActiveList({ itemId: item.id, qty: 1 }));
        }}
      ></button>
    </div>
  );
};

export default Item;
