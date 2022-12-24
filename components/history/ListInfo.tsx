const ListInfo = () => {
  return (
    <div className="flex flex-row p-5 gap-8">
      <div className="text-dark2 font-medium text-base grow">Grocery List</div>
      <div>12/1/2022</div>
      <div className="px-2 text-blue1 font-medium text-sm border-[1px] border-blue1 rounded-lg">Completed</div>
      <div>{">"}</div>
    </div>
  );
};
export default ListInfo;
