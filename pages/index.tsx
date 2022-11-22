import Loader from "components/Loader";
import NavBar from "components/navbar/Navbar";
import NavItem from "components/navbar/NavItem";
import Signin from "components/Signin";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

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
        <NavItem link="#" text="items" svgPath="/images/items.svg"></NavItem>
        <NavItem link="#" text="history" svgPath="/images/history.svg"></NavItem>
        <NavItem link="#" text="statistics" svgPath="/images/stats.svg"></NavItem>
      </NavBar>
      <main>
        welcome {user?.name}
        <button className="btn" onClick={() => signOut()}>
          signout
        </button>
      </main>
    </>
  );
};

export default Home;
