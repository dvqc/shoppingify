import Header from "components/header";
import AllItemsContainer from "components/items";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";
import Loader from "components/Loader";

import Signin from "components/Signin";
import { DetailsItemContext } from "contexts";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { useState } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [itemId, setItemId] = useState("x");

  if (status == "loading") return <Loader height="h-24" width="w-24" />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <HeadLayout>
      <NavBarLayout>
        <DetailsItemContext.Provider value={{ itemId, setItemId }}>
          <SideBarLayout>
            <main className="grow px-20 bg-gray5">
              <Header></Header>
              <AllItemsContainer></AllItemsContainer>
            </main>
          </SideBarLayout>
        </DetailsItemContext.Provider>
      </NavBarLayout>
    </HeadLayout>
  );
};

export default Home;
