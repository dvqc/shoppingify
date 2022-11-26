import { useState } from "react";
import { ListItemData } from "types/prisma.types";

const Item = ({ key, listItem }: { key: string; listItem: ListItemData }) => {
  const [itemChecked, setItemChecked] = useState(false);
  const checkItem = () => {
    setItemChecked(!itemChecked);
  };
  return (
    <li key={key} className="my-4 max-h-min flex flex-row items-center">
      <label className="flex mr-4">
        <input className="hidden" type="checkbox" onChange={checkItem} checked={itemChecked} />
        <span className="h-6 w-6 inline-block relative border-2 border-yellow1 rounded-[4px]"></span>
      </label>
      <p className={`text-lg font-medium text-black ${itemChecked ? "line-through" : ""}`}>{listItem.item.name}</p>
      <button className="h-8 w-16 mr-0 ml-auto bg-none text-xs font-bold text-yellow1  border-yellow1 border-2 rounded-3xl ">
        {listItem.qty}
        {" pcs"}
      </button>
    </li>
  );
};
export default Item;
