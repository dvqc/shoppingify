import { HistoryContainer } from "components/history";
import { SkeletonLoader } from "components/loader";
import { useLists } from "hooks/queries";
import { NextPage } from "next";

const History: NextPage = () => {
  const { data: lists, error } = useLists();

  if (error)
    return (
      <HistoryContainer>
        <div>failed to load</div>;
      </HistoryContainer>
    );

  return (
    <HistoryContainer>
      <SkeletonLoader className="h-8 w-32 mt-10 bg-slate-200" />
      <div className="flex flex-col gap-5 my-6">
        <SkeletonLoader className="h-14 rounded-xl bg-slate-200" />
        <SkeletonLoader className="h-14 rounded-xl bg-slate-200" />
        <SkeletonLoader className="h-14 bg-slate-200" />
      </div>
      <SkeletonLoader className="h-8 w-32 mt-10 bg-slate-200" />
      <div className="flex flex-col gap-5 my-6">
        <SkeletonLoader className="h-14  bg-slate-200" />
        <SkeletonLoader className="h-14  bg-slate-200" />
        <SkeletonLoader className="h-14  bg-slate-200" />
      </div>
    </HistoryContainer>
  );

  // const filteredList = lists.filter((list) => list.status != "ACTIVE");
  // const listsPerMonth: ListData[][] = [];

  // if (filteredList.length > 0) {
  //   listsPerMonth.push([lists[0]]);
  //   for (let i = 1; i < filteredList.length; i++) {
  //     const monthOfPrevious = new Date(filteredList[i - 1].createdAt).getMonth();
  //     const monthOfCurrent = new Date(filteredList[i].createdAt).getMonth();
  //     if (monthOfCurrent !== monthOfPrevious) listsPerMonth.push([filteredList[i]]);
  //     else listsPerMonth[listsPerMonth.length - 1].push(filteredList[i]);
  //   }
  // }
  // return (
  //   <HistoryContainer>
  //     {listsPerMonth.length > 0 ? (
  //       listsPerMonth.map((monthLists, i) => <MonthLists key={i} lists={monthLists}></MonthLists>)
  //     ) : (
  //       <Empty classname="h-3/4">You have no lists in your history</Empty>
  //     )}
  //   </HistoryContainer>
  // );
};

export default History;
