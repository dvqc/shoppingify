import Link from "next/link";
import { ListData } from "types/prisma";
import ListDate from "./ListDate";

const ListInfo = ({ list }: { list: ListData }) => {
  const conditionalStyle = list.status === "COMPLETED" ? "text-blue1 border-blue1" : "text-red1 border-red1";

  return (
    <div className="min-h-16 flex flex-wrap items-center p-5 gap-8 bg-white rounded-xl shadow-base">
      <div className="text-black font-medium text-base grow">{list.name}</div>
      <ListDate date={new Date(list.createdAt)} />
      <div className={`px-2 w-24 text-center font-medium text-sm border-[1px]  rounded-lg ${conditionalStyle} `}>
        {list.status}
      </div>
      <Link href={`/history/list/${list.id}`}>
        <a className="w-4 text-yellow1 font-extrabold text-xl hover:text-blue1">{">"}</a>
      </Link>
    </div>
  );
};
export default ListInfo;
