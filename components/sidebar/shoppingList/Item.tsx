import { useState } from "react";
import { ListItemData } from "types/prisma.types";

const Item = ({ listItem }: { listItem: ListItemData }) => {
  const [itemChecked, setItemChecked] = useState(false);
  const checkItem = () => {
    setItemChecked(!itemChecked);
  };
  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row items-center">
      <label className="flex mr-4 cursor-pointer">
        <input className="hidden" type="checkbox" onChange={checkItem} checked={itemChecked} />
        <span className="h-6 w-6 inline-block relative border-2 border-yellow1 rounded-[4px]"></span>
      </label>
      <p className={`text-lg font-medium text-black  break-words ${itemChecked ? "line-through" : ""}`}>
        {listItem.item.name}
      </p>
      <div className="h-10 flex flex-row mr-0 ml-auto bg-none text-xs font-bold bg-white rounded-xl">
        <button
          className="w-8 bg-[url('/images/delete.svg')] bg-yellow1 bg-no-repeat bg-[length:60%_60%] 
        bg-center rounded-xl"
        ></button>
        <button className="w-8 bg-[url('/images/minus.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center"></button>
        <button
          className="w-14 text-yellow1  
        border-yellow1 border-2 rounded-3xl "
        >
          {listItem.qty}
          {" pcs"}
        </button>
        <button className="w-8 bg-[url('/images/addPcs.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center"></button>
      </div>
    </li>
  );
};
export default Item;
