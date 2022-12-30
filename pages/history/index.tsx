import Empty from "components/Empty";
import { HistoryContainer } from "components/history";
import MonthLists from "components/history/MonthLists";
import Loader from "components/loader/SpinLoader";
import { useLists } from "hooks/queries";
import { NextPage } from "next";
import { ListData } from "types/prisma";

const History: NextPage = () => {
  const { data: lists, error } = useLists();

  if (error)
    return (
      <HistoryContainer>
        <div>failed to load</div>;
      </HistoryContainer>
    );
  if (!lists)
    return (
      <HistoryContainer>
        <Loader height="h-24" width="w-24"></Loader>{" "}
      </HistoryContainer>
    );

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
    <HistoryContainer>
      {listsPerMonth.length > 0 ? (
        listsPerMonth.map((monthLists, i) => <MonthLists key={i} lists={monthLists}></MonthLists>)
      ) : (
        <Empty classname="h-3/4">You have no lists in your history</Empty>
      )}
    </HistoryContainer>
  );
};

export default History;
