import Header from "components/header";
import AllItemsContainer from "components/items";
import Loader from "components/Loader";
import { NavBar, NavItem } from "components/navbar";

import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import Details from "components/sidebar/itemDetails/Details";
import ShoppingList from "components/sidebar/shoppingList";
import Signin from "components/Signin";
import { DetailsItemContext, SideBarContext } from "contexts";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import HistorySvg from "public/images/history.svg";
import ItemsSvg from "public/images/items.svg";
import LogoutSvg from "public/images/logout.svg";
import StatsSvg from "public/images/stats.svg";
import { useState } from "react";
import { SideBarStates } from "types/app";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [sideBarTab, setSideBarTab] = useState<SideBarStates>("list");
  const [itemId, setItemId] = useState("x");

  if (status == "loading") return <Loader height="h-24" width="w-24" />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <DetailsItemContext.Provider value={{ itemId, setItemId }}>
      <SideBarContext.Provider value={{ sideBarTab, setSideBarTab }}>
        <NavBar>
          <NavItem link="#" text="items" svg={<ItemsSvg />}></NavItem>
          <NavItem link="#" text="history" svg={<HistorySvg />}></NavItem>
          <NavItem link="#" text="statistics" svg={<StatsSvg />}></NavItem>
          <NavItem link="#" text="logout" svg={<LogoutSvg />} onClick={() => signOut()}></NavItem>
        </NavBar>
        <main className="grow px-20 bg-gray5">
          <Header></Header>
          <AllItemsContainer></AllItemsContainer>
        </main>
        <SideBar show={sideBarTab}>
          <AddItemForm key={"add"}></AddItemForm>
          <Details key={"info"}></Details>
          <ShoppingList key={"list"}></ShoppingList>
        </SideBar>
      </SideBarContext.Provider>
    </DetailsItemContext.Provider>
  );
};

export default Home;
