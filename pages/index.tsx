import Header from "components/header";
import AllItemsContainer from "components/items";
import Loader from "components/Loader";
import { NavBar, NavItem } from "components/navbar";

import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import Details from "components/sidebar/itemDetails/Details";
import ShoppingList from "components/sidebar/shoppingList";
import Signin from "components/Signin";
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

  const [sideBar, setSideBar] = useState<SideBarStates>("list");

  if (status == "loading") return <Loader height="h-24" width="w-24" />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <>
      <NavBar>
        <NavItem link="#" text="items" svg={<ItemsSvg />}></NavItem>
        <NavItem link="#" text="history" svg={<HistorySvg />}></NavItem>
        <NavItem link="#" text="statistics" svg={<StatsSvg />}></NavItem>
        <NavItem link="#" text="logout" svg={<LogoutSvg />} onClick={() => signOut()}></NavItem>
      </NavBar>
      <main className="grow px-20 bg-gray5">
        <Header></Header>
        <AllItemsContainer></AllItemsContainer>
        <div>
          <button onClick={() => setSideBar("add")}>add</button>
        </div>
        <div>
          <button onClick={() => setSideBar("info")}>info</button>
        </div>
        <button onClick={() => setSideBar("list")}>list</button>
      </main>
      <SideBar show={sideBar}>
        <ShoppingList data-sidebarid={"list"}></ShoppingList>
        <AddItemForm data-sidebarid={"add"}></AddItemForm>
        <Details data-sidebarid={"info"}></Details>
      </SideBar>
    </>
  );
};

export default Home;
