import AllItemsContainer from "components/items";

import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <header className="flex md:justify-between md:flex-row-reverse flex-col my-6">
        <input
          className="lg:w-64 md:w-48 md:mb-0 mb-6 w-full h-12 pl-14 text-base font-medium shadow-base text-black rounded-xl 
        bg-[url('/images/search.svg')] bg-no-repeat bg-[length:1.4rem] bg-[center_left_1rem] border-white border-2
         placeholder:text-gray-400 outline-none focus:border-yellow1  focus:border-2 focus:duration-300"
          type="text"
          placeholder="Search item"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        ></input>
        <h1 className="lg:w-1/2 md:w-1/3 w-full text-2xl font-medium text-dark1">
          <span className="text-yellow1 font-bold">Shoppingify&nbsp;</span>
          allows you to take your shopping list wherever you go
        </h1>
      </header>
      <AllItemsContainer q={searchQuery}></AllItemsContainer>
    </>
  );
};

export default Home;
