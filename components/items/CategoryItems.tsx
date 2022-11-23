import Loader from "components/Loader";
import useSWR from "swr";
import { CategoryData, ItemData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import Item from "./Item";

const CategoryItemsContainer = ({ category }: { category: CategoryData }) => {
  const { data: items, error } = useSWR<ItemData[], Error>(`/api/items?category=${category.label}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!items) return <Loader></Loader>;
  if (items.length == 0) return <></>;

  return (
    <div className="w-full mx-0 my-12">
      <h2 className="mx-0 mb-4 p-0 text-lg font-medium">{category.label}</h2>
      <div className="w-full flex flex-row flex-wrap gap-5 gap-y-11">
        {items.map((item, i) => (
          <Item key={i} item={item}></Item>
        ))}
      </div>
    </div>
  );
};

export default CategoryItemsContainer;
