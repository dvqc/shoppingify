import { SkeletonLoader } from "components/loader";
import { useItems } from "hooks/queries";
import groupBy from "lodash.groupby";
import CategoryItems from "./CategoryItems";

const AllItemsContainer = () => {
  const { data: items, error } = useItems();

  if (error) return <div>failed to load</div>;
  if (!items)
    return (
      <div className="w-full">
        <SkeletonLoader className="h-8 w-32 mt-10 bg-slate-200" />
        <div className="flex flex-row flex-wrap gap-5 my-6">
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
        </div>
        <SkeletonLoader className="h-8 w-32 mt-10 bg-slate-200" />
        <div className="flex flex-row flex-wrap gap-5 my-6">
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200 " />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
          <SkeletonLoader className="w-44 h-16  bg-slate-200" />
        </div>
      </div>
    );
  const itemsByCategory = groupBy(items, (item) => item.category.label);

  return (
    <div className="w-full">
      {(() => {
        const allItems = [];
        for (const [category, categoryItems] of Object.entries(itemsByCategory)) {
          allItems.push(<CategoryItems key={category} category={category} items={categoryItems}></CategoryItems>);
        }
        return allItems;
      })()}
    </div>
  );
};

export default AllItemsContainer;
