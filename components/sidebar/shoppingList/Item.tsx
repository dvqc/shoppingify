import { useState } from "react";
import useSwr from "swr";
import { ListItemData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem, isEditing }: { listItem: ListItemData; isEditing: boolean }) => {
  const [itemChecked, setItemChecked] = useState(false);
  const [qty, setQty] = useState(listItem.qty);
  const { data, error } = useSwr(`api/listItems/${listItem.id}`, fetcher);

  const checkItem = () => {
    setItemChecked(!itemChecked);
  };
  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row basis-10 items-center flex-wrap">
      <label className="flex mr-4 cursor-pointer">
        <input className="hidden" type="checkbox" onChange={checkItem} checked={itemChecked} />
        <span className="h-6 w-6 inline-block relative border-2 border-yellow1 rounded-[4px]"></span>
      </label>
      <div className={`text-lg font-medium text-black ${itemChecked ? "line-through" : ""}`}>{listItem.item.name}</div>
      <QuantityBtn qty={qty} isEditing={isEditing} setQty={setQty}></QuantityBtn>
    </li>
  );
};
export default Item;
