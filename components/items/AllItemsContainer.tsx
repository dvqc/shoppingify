import Loader from "components/loader/SpinLoader";
import { useItems } from "hooks/queries";
import groupBy from "lodash.groupby";
import CategoryItems from "./CategoryItems";

const AllItemsContainer = () => {
  const { data: items, error } = useItems();

  if (error) return <div>failed to load</div>;
  if (!items) return <Loader height="h-24" width="w-24"></Loader>;

  const itemsByCategory = groupBy(items, (item) => item.category.label);

  return (
    <div className="w-full m-0 p-0 z-20">
      {(() => {
        let allItems = [];
        for (const [category, categoryItems] of Object.entries(itemsByCategory)) {
          allItems.push(<CategoryItems key={category} category={category} items={categoryItems}></CategoryItems>);
        }
        return allItems;
      })()}
    </div>
  );
};

export default AllItemsContainer;
