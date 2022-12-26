import { ListData } from "types/prisma";

const ListInfo = ({ list }: { list: ListData }) => {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  const conditionalStyle = list.status === "COMPLETED" ? "text-blue1 border-blue1" : "text-red1 border-red1";

  return (
    <div className="h-16 flex flex-row items-center p-5 gap-8 bg-white rounded-xl shadow-base">
      <div className="text-black font-medium text-base grow">{list.name}</div>
      <div
        className="flex items-center pl-8 text-sm font-medium text-gray3 
      bg-[url('/images/calendar.svg')] bg-left bg-no-repeat bg-contain"
      >
        <span className="w-28">{dateFormatter.format(new Date(list.createdAt)).replaceAll("/", ".")}</span>
      </div>
      <div className={`px-2 w-24 text-center font-medium text-sm border-[1px]  rounded-lg ${conditionalStyle} `}>
        {list.status}
      </div>
      <a href="#" className="w-4 text-yellow1 font-extrabold text-xl hover:text-blue1">
        {">"}
      </a>
    </div>
  );
};
export default ListInfo;
