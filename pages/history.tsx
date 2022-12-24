import MonthLists from "components/history/MonthLists";
import { NextPage } from "next";

const History: NextPage = () => {
  return (
    <main className="grow px-20 bg-gray5">
      <h1 className="text-dark2 font-bold text-2xl my-6">Shopping History</h1>
      <MonthLists></MonthLists>
    </main>
  );
};

export default History;
