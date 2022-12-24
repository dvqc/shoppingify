import { AuthGuard } from "components/auth";
import MainHeader from "components/header";
import AllItemsContainer from "components/items";
import { HeadLayout, NavBarLayout, SideBarLayout } from "components/layouts";

import { DetailsItemContext } from "contexts";
import type { NextPage } from "next";

import { useState } from "react";

const Home: NextPage = () => {
  

  return (
    <AuthGuard>
        <NavBarLayout>
         
            <SideBarLayout>
              <main className="grow px-20 bg-gray5">
                <MainHeader></MainHeader>
                <AllItemsContainer></AllItemsContainer>
              </main>
            </SideBarLayout>
       
        </NavBarLayout>
    </AuthGuard>
  );
};

export default Home;
