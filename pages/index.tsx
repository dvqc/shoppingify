import Header from "components/header";
import AllItemsContainer from "components/items";
import Loader from "components/Loader";
import { NavBar, NavItem } from "components/navbar";
import Signin from "components/Signin";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import HistorySvg from "public/images/history.svg";
import ItemsSvg from "public/images/items.svg";
import StatsSvg from "public/images/stats.svg";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status == "loading") return <Loader />;

  if (user == undefined || status == "unauthenticated") {
    return <Signin></Signin>;
  }

  return (
    <>
      <NavBar>
        <NavItem link="#" text="items" svg={<ItemsSvg />}></NavItem>
        <NavItem link="#" text="history" svg={<HistorySvg />}></NavItem>
        <NavItem link="#" text="statistics" svg={<StatsSvg />}></NavItem>
      </NavBar>
      <main className="grow px-20 bg-gray5">
        <Header></Header>
        <AllItemsContainer></AllItemsContainer>
        <div>
          welcome {user?.name}
          <button className="btn" onClick={() => signOut()}>
            signout
          </button>
        </div>
      </main>
      <div className="w-96 bg-orange1 sticky top-0 right-0"></div>
    </>
  );
};

export default Home;
