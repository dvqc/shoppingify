import { ListData } from "types/prisma";
import ListInfo from "./ListInfo";

const MonthLists = ({ lists }: { lists: ListData[] }) => {
  if (lists.length === 0) return <></>;

  const dateFormatter = Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
  return (
    <div className="mb-14">
      <h2 className="my-4 text-black font-semibold text-sm">{dateFormatter.format(new Date(lists[0].createdAt))}</h2>
      <div className="flex flex-col gap-7">
        {lists.map((list) => (
          <ListInfo key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};
export default MonthLists;
