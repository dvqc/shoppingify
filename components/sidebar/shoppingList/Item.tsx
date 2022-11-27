import { useState } from "react";
import { ListItemData } from "types/prisma.types";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem }: { listItem: ListItemData }) => {
  const [itemChecked, setItemChecked] = useState(false);
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
      <QuantityBtn qty={listItem.qty}></QuantityBtn>
    </li>
  );
};
export default Item;
