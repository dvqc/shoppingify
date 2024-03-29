import { Error, NotFound, Unauthorized } from "components/errors";
import { ListDate } from "components/history";
import { ItemsByCategory } from "components/history/list";
import { SkeletonLoader } from "components/loader";
import { BackBtn } from "components/sidebar/itemDetails";
import { useListExpanded } from "hooks/queries";
import groupBy from "lodash.groupby";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ListHistory: NextPage = () => {
  const router = useRouter();
  const id = router.query["id"];

  if (!id || id instanceof Array) return <NotFound />;
  const { data: list, error } = useListExpanded(id);

  if (error) {
    if (error.message.statusCode == "401") return <Unauthorized />;
    if (error.message.statusCode == "404") return <NotFound />;
    return <Error errMsg={error.message.message} />;
  }

  if (!list)
    return (
      <div className="w-full mt-10">
        <div className="mt-24 mb-12">
          <SkeletonLoader className="h-10 w-40 my-6 bg-slate-200" />
          <SkeletonLoader className="h-6 w-32 bg-slate-200" />
        </div>
        <SkeletonLoader className="h-8 w-32 mt-10 bg-slate-200" />
        <div className="flex flex-row flex-wrap gap-5 my-6">
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
        </div>
      </div>
    );

  const listItemsByCategory = groupBy(list.listItems, (listItem) => listItem.item.category.label);

  return (
    <main className="grow">
      <div className="mt-10 mb-9">
        <BackBtn onClick={() => router.back()}></BackBtn>
      </div>
      <h1 className="text-dark2 text-2xl font-bold">{list.name}</h1>
      <div className="mt-5 mb-14">
        <ListDate date={new Date(list.createdAt)} />
      </div>
      {Object.entries(listItemsByCategory).map(([category, listItems]) => {
        return <ItemsByCategory key={category} category={category} listItems={listItems} />;
      })}
    </main>
  );
};

export default ListHistory;
