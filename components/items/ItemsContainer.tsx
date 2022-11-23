import Loader from "components/Loader";
import useSWR from "swr";
import { ItemData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import Item from "./Item";

const ItemsContainer = ({ category }: { category: string }) => {
  const { data, error } = useSWR<ItemData[], Error>("/api/items", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loader></Loader>;

  console.log(data);
  return (
    <div className="w-full mx-0 my-12">
      <h2 className="mx-0 mb-4 p-0 text-lg font-medium">{category}</h2>
      <div className="w-full flex flex-row flex-wrap gap-5 gap-y-11">
        {data.map((item, i) => (
          <Item key={i} item={item}></Item>
        ))}
      </div>
    </div>
  );
};

export default ItemsContainer;
