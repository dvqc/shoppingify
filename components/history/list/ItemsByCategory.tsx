import { ListItemData } from "types/prisma";
import ListItem from "./ListItem";

const ItemsByCategory = ({ category, listItems }: { category: string; listItems: ListItemData[] }) => {
  return (
    <div className="my-14">
      <h2 className="text-black text-lg font-medium">{category}</h2>
      <div className="w-full flex flex-row flex-wrap gap-5 gap-y-11 mt-4">
        {listItems.map((listItem) => (
          <ListItem key={listItem.id} listItem={listItem} />
        ))}
      </div>
    </div>
  );
};
export default ItemsByCategory;
