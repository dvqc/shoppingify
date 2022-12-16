const Header = () => {
  return (
    <header className="flex justify-between my-6">
      <h1 className="w-1/2 text-2xl font-medium text-dark1">
        <span className="text-yellow1 font-bold">Shoppingify&nbsp;</span>
        allows you to take your shopping list wherever you go
      </h1>
      <input
        className="w-64 h-12 pl-14 text-base font-medium shadow-base rounded-xl 
        bg-[url('/images/search.svg')] bg-no-repeat bg-[length:1.4rem] bg-[center_left_1rem] border-white border-2
         placeholder:text-gray-400 outline-none focus:border-yellow1  focus:border-2 focus:duration-300"
        type="text"
        placeholder="Search item"
      ></input>
    </header>
  );
};
export default Header;
