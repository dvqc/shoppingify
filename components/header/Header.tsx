const Header = () => {
  return (
    <header className="flex justify-between my-6">
      <h1 className="w-1/2 text-2xl font-medium">
        <span className="text-yellow-500 font-bold">Shoppingify&nbsp;</span>
        allows you to take your shopping list wherever you go
      </h1>
      <input
        className="w-64 h-12 pl-14 text-base font-medium shadow-sm rounded-xl 
        bg-[url('/images/search.svg')] bg-no-repeat bg-[length:1.4rem] bg-[center_left_1rem]
         placeholder:text-gray-400 outline-none focus:border-slate-200 focus:border-[1px]"
        type="text"
        placeholder="Search item"
      ></input>
    </header>
  );
};
export default Header;
