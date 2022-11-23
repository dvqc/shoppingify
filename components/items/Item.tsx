const Item = ({ item }: { item: { name: string } }) => {
  return (
    <div
      className="w-44 h-fit px-4 py-3 flex flex-row justify-between items-center bg-white 
      rounded-xl shadow-base cursor-pointer hover:scale-105 ease-in duration-150"
    >
      <h3 className="m-0 p-0 text-base font-medium">{item.name}</h3>
      <button
        className="block h-7 w-7 outline-none border-none bg-[url('/images/add.svg')] bg-no-repeat 
      bg-center bg-[length:60%_60%] rounded-lg hover:bg-gray-100 ease-in duration-200"
      ></button>
    </div>
  );
};

export default Item;
