import MainHeader from "components/header";
import AllItemsContainer from "components/items";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <MainHeader></MainHeader>
      <AllItemsContainer></AllItemsContainer>
    </>
  );
};

export default Home;
