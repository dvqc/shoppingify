const ListDate = ({ date }: { date: Date }) => {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  return (
    <div
      className="flex items-center pl-8 text-sm font-medium text-gray3 
  bg-[url('/images/calendar.svg')] bg-left bg-no-repeat bg-contain"
    >
      <div className="w-28">{dateFormatter.format(date).replaceAll("/", ".")}</div>
    </div>
  );
};

export default ListDate;
