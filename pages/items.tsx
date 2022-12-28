import MainHeader from "components/header";
import AllItemsContainer from "components/items";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="grow px-20 bg-gray5">
      <MainHeader></MainHeader>
      <AllItemsContainer></AllItemsContainer>
    </main>
  );
};

export default Home;
