import { DetailsItemContext, SideBarContext } from "contexts";
import { useContext } from "react";
import { ListItemData } from "types/prisma";

const ListItem = ({ listItem }: { listItem: ListItemData }) => {
  const { setItemId } = useContext(DetailsItemContext);
  const { setSideBarTab, setSideBarShown } = useContext(SideBarContext);

  return (
    <div
      className="sm:w-48 w-full h-16 px-4 py-3 flex flex-row justify-between items-center bg-white 
rounded-xl shadow-base cursor-pointer hover:border-yellow1 hover:border-2 ease-in duration-150"
      onClick={() => {
        setItemId(listItem.item.id);
        setSideBarTab("info");
        setSideBarShown(true);
      }}
    >
      <h3 className="m-0 p-0 w-28 text-base font-medium break-words">{listItem.item.name}</h3>
      <span className="text-yellow1 text-sm font-semibold">{listItem.qty} pcs</span>
    </div>
  );
};

export default ListItem;
