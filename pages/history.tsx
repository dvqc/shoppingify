import MonthLists from "components/history/MonthLists";
import Loader from "components/Loader";
import { useLists } from "hooks/queries";
import { NextPage } from "next";
import { ListData } from "types/prisma";

const History: NextPage = () => {
  const { data: lists, error } = useLists();

  if (error) return <div>failed to load</div>;
  if (!lists) return <Loader height="h-24" width="w-24"></Loader>;

  const filteredList = lists.filter((list) => list.status != "ACTIVE");
  const listsPerMonth: ListData[][] = [];

  if (filteredList.length > 0) {
    listsPerMonth.push([lists[0]]);
    for (let i = 1; i < filteredList.length; i++) {
      const monthOfPrevious = new Date(filteredList[i - 1].createdAt).getMonth();
      const monthOfCurrent = new Date(filteredList[i].createdAt).getMonth();
      if (monthOfCurrent !== monthOfPrevious) listsPerMonth.push([filteredList[i]]);
      else listsPerMonth[listsPerMonth.length - 1].push(filteredList[i]);
    }
  }
  return (
    <main className="grow px-20 bg-gray5">
      <h1 className="text-dark2 font-bold text-2xl mt-6 mb-10">Shopping History</h1>
      {listsPerMonth.map((monthList, i) => (
        <MonthLists key={i} lists={monthList}></MonthLists>
      ))}
    </main>
  );
};

export default History;
