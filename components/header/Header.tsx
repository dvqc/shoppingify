const Header = () => {
  return (
    <header className="flex justify-between mx-20 my-6">
      <h1 className="w-1/2 text-2xl font-medium">
        <span className="text-yellow-500 font-bold">Shoppingify&nbsp;</span>
        allows you to take your shopping list wherever you go
      </h1>
      <input
        className="w-64 h-12 pl-14 text-base font-medium shadow-sm rounded-xl 
        bg-[url('/images/search.svg')] bg-no-repeat bg-left bg-[length:1.4rem]
         placeholder:text-gray-400 outline-none"
        type="text"
        placeholder="Search item"
      ></input>
    </header>
  );
};
export default Header;

//    padding-left: 3.5rem;
//     margin: 0 1rem;
//     background: url("../public/images/search.svg") no-repeat left;
//     background-size: 2rem;
//     background-position: 5%;
