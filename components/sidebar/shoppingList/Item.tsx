import Loader from "components/Loader";
import { useState } from "react";
import useSwr, { useSWRConfig } from "swr";
import { ListItemData, ListItemUpdateBody } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import { getListItemKey } from "utils/swrKeys";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem, isEditing }: { listItem: ListItemData; isEditing: boolean }) => {
  const listItemKey = getListItemKey(listItem.id);
  const { data: listItemData, error } = useSwr<ListItemData>(listItemKey, fetcher);
  const { mutate } = useSWRConfig();

  const updateListItem = (payload: ListItemUpdateBody) =>
    fetcher(listItemKey, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

  const [itemChecked, setItemChecked] = useState(false);

  const checkItem = () => {
    setItemChecked(!itemChecked);
  };

  if (error) return <div>Failed to load data</div>;
  if (!listItemData) return <Loader></Loader>;

  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row basis-10 items-center flex-wrap">
      <label className="flex mr-4 cursor-pointer">
        <input className="hidden" type="checkbox" onChange={checkItem} checked={itemChecked} />
        <span className="h-6 w-6 inline-block relative border-2 border-yellow1 rounded-[4px]"></span>
      </label>
      <div className={`text-lg font-medium text-black ${itemChecked ? "line-through" : ""}`}>{listItem.item.name}</div>
      <QuantityBtn
        qty={listItemData.qty}
        isEditing={isEditing}
        setQty={(qty: number) =>
          mutate(listItemKey, updateListItem({ qty: qty }), {
            optimisticData: { ...listItemData, qty: qty },
            rollbackOnError: true
          })
        }
      ></QuantityBtn>
    </li>
  );
};
export default Item;
