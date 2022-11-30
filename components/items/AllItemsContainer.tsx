import Loader from "components/Loader";
import useSWR from "swr";
import { CategoryData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import CategoryItems from "./CategoryItems";

const AllItemsContainer = () => {
  const { data: categories, error } = useSWR<CategoryData[], Error>(`/api/categories`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!categories) return <Loader height="h-24" width="w-24"></Loader>;

  return (
    <div className="w-full m-0 p-0">
      {categories.map((category, i) => (
        <CategoryItems key={i} category={category}></CategoryItems>
      ))}
    </div>
  );
};

export default AllItemsContainer;
