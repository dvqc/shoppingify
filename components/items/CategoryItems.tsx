import { ItemData } from "types/prisma";
import Item from "./Item";

const CategoryItemsContainer = ({ category, items }: { category: string; items: ItemData[] }) => {
  if (items.length == 0) return <></>;

  return (
    <div className="w-full mx-0 my-12">
      <h2 className="mx-0 mb-4 p-0 text-lg text-black font-medium">{category}</h2>
      <div className="w-full flex flex-row flex-wrap gap-5 gap-y-11">
        {items.map((item, i) => (
          <Item key={i} item={item}></Item>
        ))}
      </div>
    </div>
  );
};

export default CategoryItemsContainer;
