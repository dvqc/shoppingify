import { DetailsItemContext, SideBarContext } from "contexts";
import { useAddItemToActiveList } from "hooks/mutations";
import { useContext } from "react";
import { ItemData } from "types/prisma";

const Item = ({ item }: { item: ItemData }) => {
  const { setItemId } = useContext(DetailsItemContext);
  const { setSideBarTab } = useContext(SideBarContext);
  const addItem = useAddItemToActiveList(item.id);

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
        onClick={async (e) => {
          e.stopPropagation();
          await addItem();
        }}
      ></button>
    </div>
  );
};

export default Item;
